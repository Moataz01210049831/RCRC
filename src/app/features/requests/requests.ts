import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTable, TableColumn, TableRow } from '../../shared/data-table/data-table';

type Tab = 'Main table' | 'Active Requests' | 'Closed';

@Component({
  selector: 'app-requests',
  imports: [FormsModule, DataTable],
  templateUrl: './requests.html',
  styleUrl: './requests.scss',
})
export class Requests {
  activeTab = signal<Tab>('Main table');
  searchQuery = signal('');
  activeExpanded = signal(true);
  closedExpanded = signal(false);

  tabs: Tab[] = ['Main table', 'Active Requests', 'Closed'];

  columns: TableColumn[] = [
    { key: 'id',           label: 'Request',      type: 'link'  },
    { key: 'status',       label: 'Status',       type: 'badge' },
    { key: 'type',         label: 'Type',         type: 'tag'   },
    { key: 'createdOn',    label: 'Created On',   type: 'text'  },
    { key: 'satisfaction', label: 'Satisfaction', type: 'star'  },
  ];

  allRequests: TableRow[] = [
    { id: '20260511566', status: 'Awaiting Info', type: 'Complaints',            createdOn: '20 Feb, 2026', satisfaction: '' },
    { id: '20260511566', status: 'In Progress',   type: 'Training & Employment', createdOn: '20 Feb, 2026', satisfaction: '' },
    { id: '20260511566', status: 'In Progress',   type: 'Training & Employment', createdOn: '20 Feb, 2026', satisfaction: '' },
    { id: '20260511567', status: 'Closed',         type: 'Complaints',            createdOn: '18 Feb, 2026', satisfaction: '' },
    { id: '20260511568', status: 'Closed',         type: 'Training & Employment', createdOn: '15 Feb, 2026', satisfaction: '' },
  ];

  get filteredRequests(): TableRow[] {
    const q = this.searchQuery().toLowerCase();
    let list = this.allRequests;

    if (this.activeTab() === 'Active Requests') {
      list = list.filter(r => r['status'] !== 'Closed');
    } else if (this.activeTab() === 'Closed') {
      list = list.filter(r => r['status'] === 'Closed');
    }

    if (q) {
      list = list.filter(r =>
        r['id'].includes(q) || r['type'].toLowerCase().includes(q) || r['status'].toLowerCase().includes(q)
      );
    }
    return list;
  }

  get activeRequests(): TableRow[] {
    return this.filteredRequests.filter(r => r['status'] !== 'Closed');
  }

  get closedRequests(): TableRow[] {
    return this.filteredRequests.filter(r => r['status'] === 'Closed');
  }

  setTab(tab: Tab) {
    this.activeTab.set(tab);
  }
}