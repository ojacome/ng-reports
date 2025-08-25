import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { CustomerSummary } from '../models/customer-summary';

@Injectable({ providedIn: 'root' })
export class SummaryService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private summarySubject = new BehaviorSubject<CustomerSummary | null>(null);
  summary$ = this.summarySubject.asObservable();

  constructor(private http: HttpClient) {}

  fetch(phone: string) {
    this.loadingSubject.next(true);
    this.summarySubject.next(null);

    const url = `${environment.API_BASE}/api/customers/${encodeURIComponent(phone)}/summary`;
    this.http.get<CustomerSummary>(url).subscribe({
      next: (s) => {
        this.summarySubject.next(s);
        this.loadingSubject.next(false);
      },
      error: (err) => {
        console.error('[SummaryService] error', {
          status: err?.status,
          message: err?.message,
          body: err?.error,
        });
        this.summarySubject.next(null);
        this.loadingSubject.next(false);
      },
    });
  }
}
