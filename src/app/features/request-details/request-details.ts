import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FileUpload } from '../../shared/file-upload/file-upload';

export type DetailTab = 'Required Info' | 'Consultant Info' | 'Landlord Info' | 'Project Land Info' | 'Attachments';

export interface TabField { label: string; value: string; }
export interface TabAttachment { name: string; size: string; type: string; }

@Component({
  selector: 'app-request-details',
  imports: [RouterLink, FileUpload, FormsModule],
  templateUrl: './request-details.html',
  styleUrl: './request-details.scss',
})
export class RequestDetails implements OnInit {
  private route = inject(ActivatedRoute);

  requestId = '';
  status = 'Resolved';
  sheetOpen    = signal(true);
  updateModalOpen = signal(false);
  updateNotes = '';
  updateFiles: import('../../shared/file-upload/file-upload').UploadedFile[] = [];

  closeSheet()       { this.sheetOpen.set(false); }
  openUpdateModal()  { this.updateModalOpen.set(true); }
  closeUpdateModal() { this.updateModalOpen.set(false); }

  onResolutionAgree()    { console.log('Resolution: Agreed');    this.closeSheet(); }
  onResolutionDisagree() { console.log('Resolution: Disagreed'); this.closeSheet(); }

  submitUpdate() {
    console.log('Update Submission', {
      notes: this.updateNotes,
      files: this.updateFiles,
    });
    this.closeUpdateModal();
  }
  activeTab = signal<DetailTab>('Required Info');

  tabs: DetailTab[] = ['Required Info', 'Consultant Info', 'Landlord Info', 'Project Land Info', 'Attachments'];

  // Tab data
  requiredInfo = {
    sector: 'Sector name',
    department: 'Building Permits',
    service: 'Service name',
    description: 'Please provide structural engineering reports and environmental impact assessment. Please provide structural engineering reports and environmental impact assessment.',
  };

  consultantFields: TabField[] = [
    { label: 'Consultant Name',    value: 'Ahmed Al-Rashidi' },
    { label: 'Company',            value: 'Al-Rashidi Engineering Consultants' },
    { label: 'License Number',     value: 'ENG-2024-00412' },
    { label: 'Phone',              value: '+966 50 234 5678' },
    { label: 'Email',              value: 'a.rashidi@aec.com' },
    { label: 'Specialization',     value: 'Structural Engineering' },
  ];

  landlordFields: TabField[] = [
    { label: 'Landlord Name',      value: 'Abdulaziz Al-Abdullah' },
    { label: 'National ID',        value: '1023456789' },
    { label: 'Phone',              value: '+966 11 234 5678' },
    { label: 'Address',            value: 'Riyadh, Al-Malaz District' },
    { label: 'Ownership Type',     value: 'Freehold' },
  ];

  projectLandFields: TabField[] = [
    { label: 'Plot Number',        value: 'P-20260511566' },
    { label: 'District',           value: 'Al-Malaz' },
    { label: 'Street',             value: 'King Fahd Road' },
    { label: 'Land Area',          value: '850 m²' },
    { label: 'Zoning',             value: 'Residential' },
    { label: 'Coordinates',        value: '24.6877° N, 46.7219° E' },
  ];

  attachments: TabAttachment[] = [
    { name: 'structural_report.pdf',       size: '2.24 KB', type: 'PDF'  },
    { name: 'environmental_assessment.pdf', size: '1.80 KB', type: 'PDF'  },
    { name: 'site_photo.jpg',              size: '512 KB',  type: 'JPEG' },
  ];

  updates = [
    { name: 'A. Eldakheel', date: '06 Feb 2026, 10:00', status: 'Approved' },
    { name: 'M. Elrabeh',   date: '06 Feb 2026, 10:00', status: 'Approved' },
  ];

  timeline = [
    { label: 'Ticket Created',         sub: 'System • 05 Feb 2026, 13:45' },
    { label: 'Assigned to Department', sub: 'Ticket assigned to Building Permits department\nAhmed Al-Mansour • 06 Feb 2026, 10:00' },
  ];

  ngOnInit() {
    this.requestId = this.route.snapshot.paramMap.get('id') ?? '';
    console.log('Request ID:', this.requestId);
  }
}
