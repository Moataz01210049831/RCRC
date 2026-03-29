import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FileUpload, UploadedFile } from '../../shared/file-upload/file-upload';
import { RequestsService } from '../../core/services/requests.service';

export interface Step {
  number: number;
  label: string;
}

@Component({
  selector: 'app-create-request',
  imports: [ReactiveFormsModule, RouterLink, FileUpload],
  templateUrl: './create-request.html',
  styleUrl: './create-request.scss',
})
export class CreateRequest {
  private requestsService = inject(RequestsService);

  currentStep = signal(1);

  steps: Step[] = [
    { number: 1, label: 'Customer details' },
    { number: 2, label: 'Request details' },
    { number: 3, label: 'Documents' },
    { number: 4, label: 'Summary' },
  ];

  useSaved = signal<boolean>(false);

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

  form = new FormGroup({
    // Individual fields
    customerName:    new FormControl('', Validators.required),
    email:           new FormControl('', Validators.required),
    phone:           new FormControl('', Validators.required),
    idType:          new FormControl('', Validators.required),
    idNumber:        new FormControl('', Validators.required),
    // Legal Entity fields
    companyName:     new FormControl('', Validators.required),
    crNumber:        new FormControl('', Validators.required),
    vatNumber:       new FormControl(''),
    authorizedName:  new FormControl('', Validators.required),
    authorizedPhone: new FormControl('', Validators.required),
    // Address fields
    shortAddress:    new FormControl('', Validators.required),
    city:            new FormControl('', Validators.required),
    district:        new FormControl('', Validators.required),
    postalCode:      new FormControl('', Validators.required),
    // Request details
    category:        new FormControl('Suggestions', Validators.required),
    sector:          new FormControl('', Validators.required),
    department:      new FormControl('', Validators.required),
    service:         new FormControl('', Validators.required),
    requestTitle:    new FormControl('', Validators.required),
    description:     new FormControl('', Validators.required),
  });

  addressVerified = false;
  uploadedFiles: UploadedFile[] = [];
  validationError = signal('');

  onUseSavedChange() {
    if (this.useSaved()) {
      this.form.patchValue({
        customerName: this.savedProfile.customerName,
        email:        this.savedProfile.email,
        phone:        this.savedProfile.phone,
        idType:       this.savedProfile.idType,
        idNumber:     this.savedProfile.idNumber,
      });
    } else {
      this.form.patchValue({ customerName: '', email: '', phone: '', idType: '', idNumber: '' });
    }
  }

  verifyAddress() {
    const shortAddress = this.form.get('shortAddress')?.value;
    if (!shortAddress?.trim()) return;
    // TODO: connect to SPL API
    console.log('Verify address:', shortAddress);
    this.form.patchValue({ city: 'Riyadh', district: 'Al-Malaz', postalCode: '12345' });
    this.form.get('city')?.disable();
    this.form.get('district')?.disable();
    this.form.get('postalCode')?.disable();
    this.addressVerified = true;
  }

  private validateStep(): boolean {
    this.validationError.set('');
    const v = this.form.getRawValue();

    if (this.currentStep() === 1) {
      if (this.beneficiaryType === 'individual') {
        if (!v.customerName?.trim())  return this.fail('Full Name is required.');
        if (!v.email?.trim())         return this.fail('Email is required.');
        if (!v.phone?.trim())         return this.fail('Phone is required.');
        if (!v.idType)                return this.fail('ID Type is required.');
        if (!v.idNumber?.trim())      return this.fail('ID Number is required.');
      } else {
        if (!v.companyName?.trim())    return this.fail('Company Name is required.');
        if (!v.crNumber?.trim())       return this.fail('CR Number is required.');
        if (!v.authorizedName?.trim()) return this.fail('Authorized Person Name is required.');
        if (!v.authorizedPhone?.trim()) return this.fail('Authorized Person Phone is required.');
        if (!v.email?.trim())           return this.fail('Email is required.');
      }
      if (!v.shortAddress?.trim()) return this.fail('Short Address is required.');
      if (!v.city?.trim())         return this.fail('City is required.');
      if (!v.district?.trim())     return this.fail('District is required.');
      if (!v.postalCode?.trim())   return this.fail('Postal Code is required.');
    }

    if (this.currentStep() === 2) {
      if (this.beneficiaryType === 'legal') {
        if (!v.category)   return this.fail('Category is required.');
        if (!v.sector)     return this.fail('Sector is required.');
        if (!v.department) return this.fail('Department is required.');
        if (!v.service)    return this.fail('Service is required.');
      }
      if (!v.requestTitle?.trim()) return this.fail('Request Title is required.');
      if (!v.description?.trim())  return this.fail('Description is required.');
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

  submitting = signal(false);

  submit() {
    if (!this.validateStep()) return;

    const v    = this.form.getRawValue();
    const user = JSON.parse(localStorage.getItem('user') ?? '{}');

    const model = {
      Title:                    v.requestTitle ?? '',
      Description:              v.description ?? '',
      ContactId:                user.EntityId ?? '',
      OnBehalfContactId:        '',
      InteractionId:            '',
      CityId:                   '',
      ContactSourceId:          '',
      SectorId:                 v.sector ?? '',
      IsUrgent:                 false,
      DivisionId:               '',
      DivisionTypeId:           '',
      CaseMainClassificationId: '',
      CaseSubClassificationId:  '',
      QuestionId:               '',
      ComplainQuestions:        {},
      IsSecret:                 false,
      IsAttached:               this.uploadedFiles.length > 0,
      DivisionName:             '',
      mediaEmail:               v.email ?? '',
      mediaUserName:            v.customerName ?? v.authorizedName ?? '',
      SubServiceId:             '',
      MedicalFile:              '',
      MobileNumber:             v.phone ?? v.authorizedPhone ?? '',
      service:                  v.service ?? '',
      uomra:                    false,
      authorityId:              '',
      attachmentArr:            this.uploadedFiles.map(f => ({ file: f.file, dis: f.name })),
    };

    this.submitting.set(true);

    this.requestsService.addRequest(model).subscribe({
      next: (res) => {
        this.submitting.set(false);
        console.log('Request submitted:', res);
        this.currentStep.set(4);
      },
      error: (err) => {
        this.submitting.set(false);
        this.validationError.set('Failed to submit request. Please try again.');
        console.error('Submit error:', err);
      },
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
    this.addressVerified = false;
    this.form.get('city')?.enable();
    this.form.get('district')?.enable();
    this.form.get('postalCode')?.enable();
    this.form.reset({ category: 'Suggestions' });
    this.uploadedFiles = [];
  }
}
