import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../core/auth';
import { NafathService } from '../../core/services/nafath.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  error    = signal('');
  loading  = signal(false);
  lang     = signal('EN');
  langOpen = signal(false);

  toggleLang() { this.langOpen.update(v => !v); }
  setLang(l: string) { this.lang.set(l); this.langOpen.set(false); }

  constructor(
    private auth: Auth,
    private nafath: NafathService,
    private router: Router,
  ) {}

  onNafathLogin() {
    this.error.set('');
    this.loading.set(true);

    this.nafath.loginWithNafath('test', 'Aa@12345').subscribe({
      next: (user) => {
        this.loading.set(false);
        this.auth.login(user.userName, user.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.Message ?? 'Login failed. Please try again.');
      },
    });
  }
}
