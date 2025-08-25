import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { InvoiceDto } from '../models/invoice';

@Injectable({ providedIn: 'root' })
export class BillingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private itemsSubject   = new BehaviorSubject<InvoiceDto[]>([]);

  loading$ = this.loadingSubject.asObservable();
  items$   = this.itemsSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetch(phone: string) {
    this.loadingSubject.next(true);
    this.itemsSubject.next([]);

    this.http
      .get<{ items: InvoiceDto[] }>(
        `${environment.API_BASE}/api/customers/${encodeURIComponent(phone)}/billing`
      )
      .subscribe({
        next: (resp) => {
          const items = resp?.items ?? [];
          items.sort(
            (a, b) =>
              new Date(b.payment_date).getTime() -
              new Date(a.payment_date).getTime()
          );
          this.itemsSubject.next(items);
          this.loadingSubject.next(false);
        },
        error: (err) => {
          console.error('Billing error:', err);
          this.itemsSubject.next([]);
          this.loadingSubject.next(false);
        },
      });
  }

  reset() {
    this.itemsSubject.next([]);
    this.loadingSubject.next(false);
  }
}
