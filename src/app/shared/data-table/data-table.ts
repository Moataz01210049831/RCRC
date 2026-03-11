import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'link' | 'badge' | 'tag' | 'star';
}

export type TableRow = Record<string, string>;

@Component({
  selector: 'app-data-table',
  imports: [NgClass, RouterLink],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
})
export class DataTable {
  columns = input<TableColumn[]>([]);
  data = input<TableRow[]>([]);
  scrollable = input<boolean>(false);

  badgeClass(status: string): Record<string, boolean> {
    return {
      'dt__badge--awaiting': status === 'Awaiting Info',
      'dt__badge--in-progress': status === 'In Progress',
      'dt__badge--closed': status === 'Closed',
    };
  }
}
