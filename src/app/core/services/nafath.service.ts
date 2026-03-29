import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// ── API response shape ────────────────────────────────
interface LoginApiResponse {
  Success: boolean;
  Message: string;
  Data: {
    Id:         string;
    UserName:   string;
    Email:      string;
    Roles:      string[];
    JWToken:    string;
    Contact: {
      FirstName:      string;
      LastName:       string;
      FullName:       string;
      MobileNumber:   string;
      IdentityNumber: string;
      IdentityTypeId: number;
      Email:          string;
      EntityId:       string;
    };
  };
}

// ── Normalised user stored in app ─────────────────────
export interface NafathUser {
  id:              string;
  userName:        string;
  name:            string;
  email:           string;
  phone:           string;
  nationalId:      string;
  identityTypeId:  number;
  EntityId:        string;
  roles:           string[];
  token:           string;
  beneficiaryType: 'individual' | 'legal';
}

// ── Mock — mirrors real API shape ─────────────────────
const MOCK_RESPONSE: LoginApiResponse = {
  Success: true,
  Message: 'Login Success',
  Data: {
    Id:       '72e99974-1029-f111-93f7-005056898a24',
    UserName: 'agent',
    Email:    'anas.h@2p.com.sa',
    Roles:    ['agent'],
    JWToken:  'mock-jwt-token-abc123',
    Contact: {
      FirstName:      'Anas',
      LastName:       'Suleiman',
      FullName:       'Anas Suleiman',
      MobileNumber:   '0557334554',
      IdentityNumber: '2044700181',
      IdentityTypeId: 2,
      Email:          'anas.h@2p.com.sa',
      EntityId:       'entity-id-123',
    },
  },
};
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

    const request$ = this.useMock
      ? of(MOCK_RESPONSE).pipe(delay(800))
      : this.http.post<LoginApiResponse>(
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
      name:            d.Contact.FullName  || `${d.Contact.FirstName} ${d.Contact.LastName}`,
      email:           d.Contact.Email     || d.Email,
      phone:           d.Contact.MobileNumber,
      nationalId:      d.Contact.IdentityNumber,
      identityTypeId:  d.Contact.IdentityTypeId,
      roles:           d.Roles,
      token:           d.JWToken,
      EntityId:         d.Contact.EntityId,
      beneficiaryType: 'individual',   // update when API returns this field
    };
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
