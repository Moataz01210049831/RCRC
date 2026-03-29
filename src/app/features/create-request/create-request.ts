import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FileUpload, UploadedFile } from '../../shared/file-upload/file-upload';

export interface Step {
  number: number;
  label: string;
}

@Component({
  selector: 'app-create-request',
  imports: [FormsModule, RouterLink, FileUpload],
  templateUrl: './create-request.html',
  styleUrl: './create-request.scss',
})
export class CreateRequest {
  currentStep = signal(1);

  steps: Step[] = [
    { number: 1, label: 'Customer details' },
    { number: 2, label: 'Request details' },
    { number: 3, label: 'Documents' },
    { number: 4, label: 'Summary' },
  ];

  useSaved = signal<boolean | null>(false);

  private readonly savedProfile = {
    customerName: 'Alanood Abdullah',
    email: 'Email@email.com',
    phone: '50 123 4567',
    idType: 'national',
    idNumber: '1234567890',
  };

  // Beneficiary type — set from login API response stored in localStorage
  beneficiaryType: 'individual' | 'legal' = (() => {
    const user = localStorage.getItem('user');
    if (!user) return 'individual';
    const parsed = JSON.parse(user);
    return parsed.beneficiaryType === 'legal' ? 'legal' : 'individual';
  })();

// Individual fields
  customerName = '';
  email = '';
  phone = '';
  idType = '';
  idNumber = '';

  // Legal Entity fields
  companyName = '';
  crNumber = '';
  vatNumber = '';
  authorizedName = '';
  authorizedPhone = '';

  // Address fields
  shortAddress = '';
  city = '';
  district = '';
  postalCode = '';
  addressVerified = false;

  verifyAddress() {
    if (!this.shortAddress.trim()) return;
    // TODO: connect to SPL API
    console.log('Verify address:', this.shortAddress);
    this.city        = 'Riyadh';
    this.district    = 'Al-Malaz';
    this.postalCode  = '12345';
    this.addressVerified = true;
  }

  onUseSavedChange() {
    if (this.useSaved()) {
      this.customerName = this.savedProfile.customerName;
      this.email        = this.savedProfile.email;
      this.phone        = this.savedProfile.phone;
      this.idType       = this.savedProfile.idType;
      this.idNumber     = this.savedProfile.idNumber;
    } else {
      this.customerName = '';
      this.email        = '';
      this.phone        = '';
      this.idType       = '';
      this.idNumber     = '';
    }
  }

  // Request details fields
  category = 'Suggestions';
  sector = '';
  department = '';
  service = '';
  requestTitle = '';
  description = '';

  // Documents
  uploadedFiles: UploadedFile[] = [];

  validationError = signal('');

  private validateStep(): boolean {
    this.validationError.set('');

    if (this.currentStep() === 1) {
      if (this.beneficiaryType === 'individual') {
        if (!this.customerName.trim()) return this.fail('Full Name is required.');
        if (!this.email.trim())        return this.fail('Email is required.');
        if (!this.phone.trim())        return this.fail('Phone is required.');
        if (!this.idType)              return this.fail('ID Type is required.');
        if (!this.idNumber.trim())     return this.fail('ID Number is required.');
      } else {
        if (!this.companyName.trim())    return this.fail('Company Name is required.');
        if (!this.crNumber.trim())       return this.fail('CR Number is required.');
        if (!this.authorizedName.trim()) return this.fail('Authorized Person Name is required.');
        if (!this.authorizedPhone.trim())return this.fail('Authorized Person Phone is required.');
        if (!this.email.trim())          return this.fail('Email is required.');
      }
      if (!this.shortAddress.trim()) return this.fail('Short Address is required.');
      if (!this.city.trim())         return this.fail('City is required.');
      if (!this.district.trim())     return this.fail('District is required.');
      if (!this.postalCode.trim())   return this.fail('Postal Code is required.');
    }

    if (this.currentStep() === 2) {
      if (this.beneficiaryType === 'legal') {
        if (!this.category)        return this.fail('Category is required.');
        if (!this.sector)          return this.fail('Sector is required.');
        if (!this.department)      return this.fail('Department is required.');
        if (!this.service)         return this.fail('Service is required.');
      }
      if (!this.requestTitle.trim()) return this.fail('Request Title is required.');
      if (!this.description.trim())  return this.fail('Description is required.');
    }

    if (this.currentStep() === 3) {
      if (this.uploadedFiles.length === 0) return this.fail('At least one document is required.');
    }

    return true;
  }

  private fail(msg: string): boolean {
    this.validationError.set(msg);
    return false;
  }

  next() {
    if (!this.validateStep()) return;
    if (this.currentStep() < this.steps.length) {
      this.currentStep.set(this.currentStep() + 1);
    }
  }

  submit() {
    if (!this.validateStep()) return;
    this.currentStep.set(4);
    console.log('Request Submission', {
      customer: {
        useSaved:     this.useSaved(),
        customerName: this.customerName,
        email:        this.email,
        phone:        this.phone,
        idType:       this.idType,
        idNumber:     this.idNumber,
          shortAddress: this.shortAddress,
          city:         this.city,
          district:     this.district,
          postalCode:   this.postalCode,
        requestTitle: this.requestTitle,
        description:  this.description,
      },
      documents: this.uploadedFiles,
    });
  }

  back() {
    if (this.currentStep() > 1) {
      this.currentStep.set(this.currentStep() - 1);
    }
  }

  resetForm() {
    this.currentStep.set(1);
    this.useSaved.set(false);
    this.customerName = ''; this.email = ''; this.phone = ''; this.idType = ''; this.idNumber = '';
    this.category = 'Suggestions'; this.sector = ''; this.department = ''; this.service = '';
    this.requestTitle = ''; this.description = '';
    this.uploadedFiles = [];
  }
}
