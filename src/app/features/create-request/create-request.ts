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

  // Customer form fields
  customerName = '';
  email = '';
  phone = '';
  idType = '';
  idNumber = '';

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

  next() {
    if (this.currentStep() < this.steps.length) {
      this.currentStep.set(this.currentStep() + 1);
    }
  }

  submit() {
    this.currentStep.set(4);
    console.log('Request Submission', {
      customer: {
        useSaved:     this.useSaved(),
        customerName: this.customerName,
        email:        this.email,
        phone:        this.phone,
        idType:       this.idType,
        idNumber:     this.idNumber,
      },
      request: {
        category:     this.category,
        sector:       this.sector,
        department:   this.department,
        service:      this.service,
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
