import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

interface Request {
  id: string;
  status: 'Awaiting Info' | 'In Progress' | 'Closed';
  type: string;
  createdOn: string;
}

@Component({
  selector: 'app-recent-updates',
  imports: [NgClass],
  templateUrl: './recent-updates.html',
  styleUrl: './recent-updates.scss',
})
export class RecentUpdates {
  requests: Request[] = [
    { id: '20260511566', status: 'Awaiting Info', type: 'Complaints',            createdOn: '20 Feb, 2026' },
    { id: '20260511566', status: 'In Progress',   type: 'Training & Employment', createdOn: '20 Feb, 2026' },
    { id: '20260511566', status: 'In Progress',   type: 'Training & Employment', createdOn: '20 Feb, 2026' },
  ];
}
