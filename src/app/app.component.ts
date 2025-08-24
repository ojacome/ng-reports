import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CommonModule, NgClass, NgIf, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { WsUsageService } from './services/ws-usage.service';
import { Snapshot } from './models/snapshot';
import { BytesPipe } from './pipes/bytes.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf, NgClass, DatePipe, BytesPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form!: FormGroup;

  status$!: Observable<'closed'|'opening'|'open'|'error'>;
  current$!: Observable<Snapshot | null>;

  hasSearched = false;
  currentYear = new Date().getFullYear();

  constructor(private fb: FormBuilder, private ws: WsUsageService) {
    this.form = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });

    this.status$  = this.ws.status$;
    this.current$ = this.ws.current$;
  }

  get phoneCtrl(): FormControl {
    return this.form.get('phone') as FormControl;
  }

  search() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.hasSearched = true;
    this.ws.connect(this.phoneCtrl.value!);
  }

  allowOnlyDigits(evt: KeyboardEvent) {
    if (!/[0-9]/.test(evt.key) && !['Backspace','Tab','ArrowLeft','ArrowRight'].includes(evt.key)) evt.preventDefault();
  }
}
