import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface NafathUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationalId: string;
  token: string;
  beneficiaryType: 'individual' | 'legal';
}

// ── Mock response — remove when real API is ready ────
const MOCK_USER: NafathUser = {
  id:              'USR-001',
  name:            'Abdulaziz Al-Abdullah',
  email:           'a.abdullah@rcrc.gov.sa',
  phone:           '0550000005',
  nationalId:      '1023456789',
  token:           'mock-jwt-token-abc123',
  beneficiaryType: 'legal',   // change to 'legal' to test Legal Entity flow
};
// ─────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class NafathService {
  private readonly baseUrl = environment.apiUrl;
  private readonly useMock = !environment.production;

  loading = signal(false);
  user    = signal<NafathUser | null>(null);

  constructor(private http: HttpClient) {}

  loginWithNafath() {
    this.loading.set(true);

    const request$ = this.useMock
      ? of(MOCK_USER).pipe(delay(800))          // simulate network delay
      : this.http.post<NafathUser>(`${this.baseUrl}/auth/nafath/login`, {});

    return request$.pipe(
        tap((res) => {
          this.loading.set(false);
          this.user.set(res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res));
          console.log('Nafath login success:', res);
        }),
        catchError((err) => {
          this.loading.set(false);
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
