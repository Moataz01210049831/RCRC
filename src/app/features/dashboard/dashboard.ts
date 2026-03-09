import { Component } from '@angular/core';
import { StatsHeader } from './components/stats-header/stats-header';
import { RecentUpdates } from './components/recent-updates/recent-updates';

@Component({
  selector: 'app-dashboard',
  imports: [StatsHeader, RecentUpdates],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
