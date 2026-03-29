import { Component, inject, input, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../core/auth';

@Component({
  selector: 'app-sidenav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  private auth = inject(Auth);

  isOpen = input<boolean>(true);
  toggleNav = output<void>();
  contactExpanded = signal(true);
  lang = signal<'EN' | 'AR'>('EN');
  langOpen = signal(false);

  // User from localStorage
  private storedUser = (() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  })();

  userName  = this.storedUser?.name  ?? 'User';
  userPhone = this.storedUser?.phone  ?? '';
  userEmail = this.storedUser?.email  ?? '';

  setLang(l: 'EN' | 'AR') { this.lang.set(l); this.langOpen.set(false); }
  toggleLang() { this.langOpen.update(v => !v); }
  logout() { this.auth.logout(); }

  navItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Requests', icon: 'list_alt', route: '/requests' },
    { label: 'FAQs', icon: 'help_outline', route: '/faqs' },
  ];
}
