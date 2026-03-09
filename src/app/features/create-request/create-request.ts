import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
export interface UploadedFile {
  name: string;
  type: string;
  size: string;
  file: File;
}

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

  // Documents
  uploadModalOpen = signal(false);
  uploadedFiles = signal<UploadedFile[]>([]);
  dragOver = signal(false);

  openUploadModal() { this.uploadModalOpen.set(true); }
  closeUploadModal() { this.uploadModalOpen.set(false); }

  onDragOver(e: DragEvent) { e.preventDefault(); this.dragOver.set(true); }
  onDragLeave() { this.dragOver.set(false); }
  onDrop(e: DragEvent) {
    e.preventDefault();
    this.dragOver.set(false);
    const files = e.dataTransfer?.files;
    if (files) this.addFiles(files);
  }

  onFileSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) this.addFiles(input.files);
    input.value = '';
  }

  private addFiles(files: FileList) {
    const added: UploadedFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      added.push({
        name: f.name,
        type: f.type.split('/')[1]?.toUpperCase() ?? 'FILE',
        size: (f.size / 1024).toFixed(2) + 'KB',
        file: f,
      });
    }
    this.uploadedFiles.update(prev => [...prev, ...added]);
    this.closeUploadModal();
  }

  removeFile(index: number) {
    this.uploadedFiles.update(prev => prev.filter((_, i) => i !== index));
  }

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