import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type RequestStatus = 'Awaiting Info' | 'In Progress' | 'Closed';

export interface Request {
  id: string;
  status: RequestStatus;
  type: string;
  createdOn: string;
}

type Tab = 'Main table' | 'Active Requests' | 'Closed';

@Component({
  selector: 'app-requests',
  imports: [NgClass, FormsModule],
  templateUrl: './requests.html',
  styleUrl: './requests.scss',
})
export class Requests {
  activeTab = signal<Tab>('Main table');
  searchQuery = signal('');
  activeExpanded = signal(true);
  closedExpanded = signal(false);

  tabs: Tab[] = ['Main table', 'Active Requests', 'Closed'];

  allRequests: Request[] = [
    { id: '20260511566', status: 'Awaiting Info', type: 'Complaints',            createdOn: '20 Feb, 2026' },
    { id: '20260511566', status: 'In Progress',   type: 'Training & Employment', createdOn: '20 Feb, 2026' },
    { id: '20260511566', status: 'In Progress',   type: 'Training & Employment', createdOn: '20 Feb, 2026' },
    { id: '20260511567', status: 'Closed',         type: 'Complaints',            createdOn: '18 Feb, 2026' },
    { id: '20260511568', status: 'Closed',         type: 'Training & Employment', createdOn: '15 Feb, 2026' },
  ];

  get filteredRequests(): Request[] {
    const q = this.searchQuery().toLowerCase();
    let list = this.allRequests;

    if (this.activeTab() === 'Active Requests') {
      list = list.filter(r => r.status !== 'Closed');
    } else if (this.activeTab() === 'Closed') {
      list = list.filter(r => r.status === 'Closed');
    }

    if (q) {
      list = list.filter(r =>
        r.id.includes(q) || r.type.toLowerCase().includes(q) || r.status.toLowerCase().includes(q)
      );
    }
    return list;
  }

  get activeRequests(): Request[] {
    return this.filteredRequests.filter(r => r.status !== 'Closed');
  }

  get closedRequests(): Request[] {
    return this.filteredRequests.filter(r => r.status === 'Closed');
  }

  setTab(tab: Tab) {
    this.activeTab.set(tab);
  }
}
