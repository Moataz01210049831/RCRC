import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTable, TableColumn, TableRow } from '../../shared/data-table/data-table';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { RequestsService } from '../../core/services/requests.service';
import { RequestItem } from '../../core/models/request.model';

type Tab = 'Main table' | 'Active Requests' | 'Closed';

@Component({
  selector: 'app-requests',
  imports: [FormsModule, DataTable, EmptyState],
  templateUrl: './requests.html',
  styleUrl: './requests.scss',
})
export class Requests implements OnInit {
  private requestsService = inject(RequestsService);

  activeTab      = signal<Tab>('Main table');
  searchQuery    = signal('');
  activeExpanded = signal(true);
  closedExpanded = signal(false);
  loading        = this.requestsService.loading;

  tabs: Tab[] = ['Main table', 'Active Requests', 'Closed'];

  columns: TableColumn[] = [
    { key: 'id',           label: 'Request',      type: 'link'  },
    { key: 'status',       label: 'Status',       type: 'badge' },
    { key: 'type',         label: 'Type',         type: 'tag'   },
    { key: 'createdOn',    label: 'Created On',   type: 'text'  },
    { key: 'satisfaction', label: 'Satisfaction', type: 'star'  },
  ];

  private mapToRow(item: RequestItem): TableRow {
    const statecodeValue = Number(item.Statecode?.Value ?? item.Statecode?.Code ?? -1);
    const statusGroup = statecodeValue === 1 ? 'Closed' : 'Active';

    return {
      id:           item.TicketNumber || item.SerialNumber || item.Id,
      status:       item.Status?.Name ?? statusGroup,
      statusGroup,
      type:         item.TicketType?.Name ?? '',
      createdOn:    item.CreatedOn
                      ? new Date(item.CreatedOn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                      : '',
      satisfaction: '',
    };
  }

  get allRequests(): TableRow[] {
    return this.requestsService.requests().map(r => this.mapToRow(r));
  }

  get filteredRequests(): TableRow[] {
    const q = this.searchQuery().toLowerCase();
    let list = this.allRequests;

    if (this.activeTab() === 'Active Requests') {
      list = list.filter(r => r['statusGroup'] === 'Active');
    } else if (this.activeTab() === 'Closed') {
      list = list.filter(r => r['statusGroup'] === 'Closed');
    }

    if (q) {
      list = list.filter(r =>
        r['id'].toLowerCase().includes(q) ||
        r['type'].toLowerCase().includes(q) ||
        r['status'].toLowerCase().includes(q)
      );
    }
    return list;
  }

  get activeRequests(): TableRow[] {
    return this.filteredRequests.filter(r => r['statusGroup'] === 'Active');
  }

  get closedRequests(): TableRow[] {
    return this.filteredRequests.filter(r => r['statusGroup'] === 'Closed');
  }

  setTab(tab: Tab) { this.activeTab.set(tab); }

  ngOnInit() {
    this.requestsService.getRequests().subscribe();
  }
}
