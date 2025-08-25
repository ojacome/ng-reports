import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CommonModule, NgClass, NgIf, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { WsUsageService } from './services/ws-usage.service';
import { Snapshot } from './models/snapshot';
import { BytesPipe } from './pipes/bytes.pipe';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { SearchCard } from './components/search-card/search-card';
import { UsageCard } from './components/usage-card/usage-card';
import { BalanceCardComponent } from './components/balance-card/balance-card.component';
import { SummaryService } from './services/summary.service';
import { BillingService } from './services/billing.service';
import { BillingCardComponent } from './components/billing-card/billing-card.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, Header, Footer, SearchCard, UsageCard, BalanceCardComponent, BillingCardComponent],
    templateUrl: './app.component.html',
}) export class AppComponent {
    status$!: Observable<'closed' | 'opening' | 'open' | 'error'>; 
    current$!: Observable<Snapshot | null>;                   
    hasSearched = false;

    constructor(
        private ws: WsUsageService,
        private summary: SummaryService,
        private billing: BillingService
    ) {
        this.status$ = this.ws.status$;
        this.current$ = this.ws.current$;
    }

    onSearch(phone: string) {
        this.hasSearched = true;
        this.ws.connect(phone);
        this.summary.fetch(phone);
        this.billing.fetch(phone);
    }
}