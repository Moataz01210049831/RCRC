import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class Auth {
  private _isLoggedIn = signal(!!localStorage.getItem('token'));

  isLoggedIn = this._isLoggedIn.asReadonly();

  constructor(private router: Router) {}

  login(username: string, token: string): boolean {
    if (username && token) {
      this._isLoggedIn.set(true);
      return true;
    }
    return false;
  }

  logout() {
    this._isLoggedIn.set(false);
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
