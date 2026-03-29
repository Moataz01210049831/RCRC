import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
})
export class EmptyState {
  title   = input<string>('No data found');
  message = input<string>('There are no items to display at the moment.');
  icon    = input<string>('inbox');
}
