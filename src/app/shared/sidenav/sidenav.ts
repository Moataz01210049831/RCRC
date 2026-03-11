import { Component, input, output, signal } from '@angular/core';
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
  contactExpanded = signal(true);
  lang = signal<'EN' | 'AR'>('EN');
  langOpen = signal(false);

  setLang(l: 'EN' | 'AR') { this.lang.set(l); this.langOpen.set(false); }
  toggleLang() { this.langOpen.update(v => !v); }

  navItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Requests', icon: 'list_alt', route: '/requests' },
    { label: 'FAQs', icon: 'help_outline', route: '/faqs' },
  ];
}
