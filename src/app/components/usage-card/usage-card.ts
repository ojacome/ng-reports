import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Snapshot } from '../../models/snapshot';
import { CommonModule, DatePipe, NgClass, NgIf } from '@angular/common';
import { BytesPipe } from '../../pipes/bytes.pipe';

@Component({
  selector: 'app-usage-card',
  standalone: true,
  imports: [CommonModule, NgIf, NgClass, DatePipe, BytesPipe],
  templateUrl: './usage-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsageCard {
  @Input() snapshot: Snapshot | null = null;
  @Input() hasSearched = false;
}
