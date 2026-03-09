import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

interface StatCard {
  label: string;
  count: number;
  unit: string;
  iconClass: string;
}

@Component({
  selector: 'app-stats-header',
  imports: [NgClass, RouterLink],
  templateUrl: './stats-header.html',
  styleUrl: './stats-header.scss',
})
export class StatsHeader {
  userName = 'Abdulaziz';

  stats: StatCard[] = [
    { label: 'Active Requests', count: 2, unit: 'Request',  iconClass: 'stats-header__icon--active'  },
    { label: 'Awaiting Info',   count: 1, unit: 'Request',  iconClass: 'stats-header__icon--awaiting' },
    { label: 'Closed',          count: 2, unit: 'Requests', iconClass: 'stats-header__icon--closed'   },
  ];
}
