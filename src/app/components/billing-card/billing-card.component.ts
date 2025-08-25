import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { BillingService } from '../../services/billing.service';
import { InvoiceDto, PaymentMethod } from '../../models/invoice';

@Component({
  selector: 'app-billing-card',
  standalone: true,
  imports: [CommonModule, NgIf, DatePipe, CurrencyPipe],
  templateUrl: './billing-card.component.html',
})
export class BillingCardComponent {
  constructor(public billing: BillingService) {}

  totalPaid(i: InvoiceDto): number {
    return (i.total ?? 0) + (i.tax ?? 0) - (i.discount ?? 0);
  }

  badgeClass(m: PaymentMethod): string {
    switch (m) {
      case 'TARJETA':              return 'text-bg-primary';
      case 'TRANSFERENCIA':        return 'text-bg-info';
      case 'EFECTIVO':             return 'text-bg-success';
      case 'MONEDEROS DIGITALES':  return 'text-bg-warning';
      default:                     return 'text-bg-secondary';
    }
  }

  badgeLabel(m: PaymentMethod): string {
    switch (m) {
      case 'TARJETA':              return '💳 Tarjeta';
      case 'TRANSFERENCIA':        return '🏦 Transferencia';
      case 'EFECTIVO':             return '💵 Efectivo';
      case 'MONEDEROS DIGITALES':  return '👛 Monedero';
      default:                     return m;
    }
  }
}
