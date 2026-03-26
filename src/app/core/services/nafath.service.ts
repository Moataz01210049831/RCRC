import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface NafathUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationalId: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class NafathService {
  private readonly baseUrl = environment.apiUrl;

  loading = signal(false);
  user    = signal<NafathUser | null>(null);

  constructor(private http: HttpClient) {}

  loginWithNafath() {
    this.loading.set(true);

    return this.http
      .post<NafathUser>(`${this.baseUrl}/auth/nafath/login`, {})
      .pipe(
        tap((res) => {
          this.user.set(res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res));
          console.log('Nafath login success:', res);
        }),
        catchError((err) => {
          console.error('Nafath login error:', err);
          return throwError(() => err);
        }),
      );
  }

  getStoredUser(): NafathUser | null {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
