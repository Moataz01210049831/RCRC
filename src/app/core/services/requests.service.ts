import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { RequestsApiResponse, RequestItem } from '../models/request.model';

@Injectable({ providedIn: 'root' })
export class RequestsService {
  private readonly baseUrl = environment.apiUrl;

  loading = signal(false);
  requests = signal<RequestItem[]>([]);
  totalCount = signal(0);

  constructor(private http: HttpClient) {}

  getRequests(pageIndex = 1, pageCount = 10) {
    const user = this.getStoredUser();
    if (!user?.EntityId) {
      console.warn('No EntityId found in stored user');
      return throwError(() => new Error('No EntityId'));
    }

    this.loading.set(true);

    const params = new HttpParams()
      .set('contactId', user.EntityId)
      .set('pageIndex', pageIndex)
      .set('pageCount', pageCount)
      .set('caseType', 100000005);

    return this.http
      .get<RequestsApiResponse>(`${this.baseUrl}/Complain/listbycontactid`, { params })
      .pipe(
        tap((res) => {
          this.loading.set(false);
          this.requests.set(res.Data ?? []);
          this.totalCount.set(res.TotalCount ?? 0);
          console.log('Requests loaded:', res);
        }),
        catchError((err) => {
          this.loading.set(false);
          console.error('Requests error:', err);
          return throwError(() => err);
        }),
      );
  }

  private getStoredUser(): { EntityId: string } | null {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }
}
