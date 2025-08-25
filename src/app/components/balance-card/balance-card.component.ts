import { Component } from '@angular/core';
import { CommonModule, NgIf, NgClass, DecimalPipe } from '@angular/common';
import { SummaryService } from '../../services/summary.service';
import { BytesPipe } from '../../pipes/bytes.pipe';

@Component({
  selector: 'app-balance-card',
  standalone: true,
  imports: [CommonModule, NgIf, NgClass, DecimalPipe, BytesPipe],
  templateUrl: './balance-card.component.html',
})
export class BalanceCardComponent {
  constructor(public summary: SummaryService) {}

  dollarsPercent(balance: number, limit: number): number {
    return limit > 0 ? Math.min(100, (balance / limit) * 100) : 0;
  }

  minutesPercent(remaining: number, limit: number): number {
    return limit > 0 ? Math.min(100, (remaining / limit) * 100) : 0;
  }
}
