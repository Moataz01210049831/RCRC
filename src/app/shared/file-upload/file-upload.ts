import { Component, input, output, signal } from '@angular/core';

export interface UploadedFile {
  name: string;
  type: string;
  size: string;
  file: File;
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.scss',
})
export class FileUpload {
  accept  = input<string>('.pdf,.jpg,.jpeg,.png');
  hint    = input<string>('PDF, JPEG and PNG up to 5MB');
  label   = input<string>('Upload Document');

  filesChange = output<UploadedFile[]>();

  modalOpen     = signal(false);
  dragOver      = signal(false);
  uploadedFiles = signal<UploadedFile[]>([]);

  openModal()  { this.modalOpen.set(true); }
  closeModal() { this.modalOpen.set(false); }

  onDragOver(e: DragEvent)  { e.preventDefault(); this.dragOver.set(true); }
  onDragLeave()             { this.dragOver.set(false); }
  onDrop(e: DragEvent) {
    e.preventDefault();
    this.dragOver.set(false);
    if (e.dataTransfer?.files) this.addFiles(e.dataTransfer.files);
  }

  onFileSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) this.addFiles(input.files);
    input.value = '';
  }

  removeFile(index: number) {
    this.uploadedFiles.update(prev => prev.filter((_, i) => i !== index));
    this.filesChange.emit(this.uploadedFiles());
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
    this.filesChange.emit(this.uploadedFiles());
    this.closeModal();
  }
}
