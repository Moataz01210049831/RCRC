import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

export type DetailTab = 'Required Info' | 'Consultant Info' | 'Landlord Info' | 'Project Land Info' | 'Attachments';

@Component({
  selector: 'app-request-details',
  imports: [RouterLink],
  templateUrl: './request-details.html',
  styleUrl: './request-details.scss',
})
export class RequestDetails implements OnInit {
  private route = inject(ActivatedRoute);

  requestId = '';
  activeTab = signal<DetailTab>('Required Info');

  tabs: DetailTab[] = ['Required Info', 'Consultant Info', 'Landlord Info', 'Project Land Info', 'Attachments'];

  // Mocked detail row
  detailRow = {
    sector: 'Sector name',
    department: 'Description',
    service: 'Service name',
    description: 'Please provide structural engineering reports and environmental impact assessment Please provide structural engineering reports and environmental impact assessment Please provide structural',
  };

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
