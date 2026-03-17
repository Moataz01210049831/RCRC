import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidenav } from '../sidenav/sidenav';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Sidenav],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  isNavOpen     = signal(true);
  mobileNavOpen = signal(false);

  toggleNav()      { this.isNavOpen.update((v) => !v); }
  openMobileNav()  { this.mobileNavOpen.set(true); this.isNavOpen.set(true); }
  closeMobileNav() { this.mobileNavOpen.set(false); }
}
