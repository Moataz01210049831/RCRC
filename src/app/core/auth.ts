import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private _isLoggedIn = signal(false);

  isLoggedIn = this._isLoggedIn.asReadonly();

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Replace with real API call
    if (username && password) {
      this._isLoggedIn.set(true);
      return true;
    }
    return false;
  }

  logout() {
    this._isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}
