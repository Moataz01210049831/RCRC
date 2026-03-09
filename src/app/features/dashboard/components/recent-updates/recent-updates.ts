import { Component } from '@angular/core';
import { DataTable, TableColumn, TableRow } from '../../../../shared/data-table/data-table';

@Component({
  selector: 'app-recent-updates',
  imports: [DataTable],
  templateUrl: './recent-updates.html',
  styleUrl: './recent-updates.scss',
})
export class RecentUpdates {
  columns: TableColumn[] = [
    { key: 'id',           label: 'Request',      type: 'link'  },
    { key: 'status',       label: 'Status',       type: 'badge' },
    { key: 'type',         label: 'Type',         type: 'tag'   },
    { key: 'createdOn',    label: 'Created On',   type: 'text'  },
    { key: 'satisfaction', label: 'Satisfaction', type: 'star'  },
  ];

  data: TableRow[] = [
    { id: '20260511566', status: 'Awaiting Info', type: 'Complaints',            createdOn: '20 Feb, 2026', satisfaction: '' },
    { id: '20260511566', status: 'In Progress',   type: 'Training & Employment', createdOn: '20 Feb, 2026', satisfaction: '' },
    { id: '20260511566', status: 'In Progress',   type: 'Training & Employment', createdOn: '20 Feb, 2026', satisfaction: '' },
  ];
}