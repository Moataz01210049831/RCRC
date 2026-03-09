import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  isOpen = input<boolean>(true);
  toggleNav = output<void>();

  navItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Requests', icon: 'list_alt', route: '/requests' },
    { label: 'FAQs', icon: 'help_outline', route: '/faqs' },
  ];
}
