import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginApiResponse } from '../models/login-api.model';
import { NafathUser } from '../models/nafath-user.model';

export type { NafathUser };

// ─────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class NafathService {
  private readonly baseUrl = environment.apiUrl;
  private readonly useMock = !environment.production;

  loading = signal(false);
  user    = signal<NafathUser | null>(null);

  constructor(private http: HttpClient) {}

  loginWithNafath(userName = 'Agent', password = 'Aa@12345') {
    this.loading.set(true);

    const request$ = this.http.post<LoginApiResponse>(
          `${this.baseUrl}/Accounts/Login`,
          { UserName: userName, Password: password },
        );

    return request$.pipe(
      map((res) => this.mapUser(res)),
      tap((user) => {
        this.loading.set(false);
        this.user.set(user);
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Login success:', user);
      }),
      catchError((err) => {
        this.loading.set(false);
        console.error('Login error:', err);
        return throwError(() => err);
      }),
    );
  }

  private mapUser(res: LoginApiResponse): NafathUser {
    const d = res.Data;
    return {
      id:              d.Id,
      userName:        d.UserName,
      name:            d.Contact.FullName || `${d.Contact.FirstName} ${d.Contact.LastName}`,
      email:           d.Contact.Email   || d.Email,
      phone:           d.Contact.MobileNumber,
      nationalId:      d.Contact.IdentityNumber,
      identityTypeId:  d.Contact.IdentityTypeId,
      EntityId:        d.Contact.EntityId,
      roles:           d.Roles,
      token:           d.JWToken,
      beneficiaryType: 'individual', // update when API returns this field
    };
  }

  getStoredUser(): NafathUser | null {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }

  logout() {
    this.user.set(null);
    localStorage.clear();
  }
}
