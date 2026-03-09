import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface Step {
  number: number;
  label: string;
}

@Component({
  selector: 'app-create-request',
  imports: [FormsModule, RouterLink],
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

  next() {
    if (this.currentStep() < this.steps.length) {
      this.currentStep.set(this.currentStep() + 1);
    }
  }

  back() {
    if (this.currentStep() > 1) {
      this.currentStep.set(this.currentStep() - 1);
    }
  }
}