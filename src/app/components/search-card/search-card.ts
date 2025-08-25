import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SearchCard {
  @Input() status: 'closed' | 'opening' | 'open' | 'error' = 'closed';
  @Output() search = new EventEmitter<string>();
  form!: FormGroup;

  constructor(private fb: FormBuilder) { 
     this.form = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  get phoneCtrl(): FormControl {
    return this.form.get('phone') as FormControl;
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.search.emit(this.phoneCtrl.value);
  }

  allowOnlyDigits(evt: KeyboardEvent) {
    if (!/[0-9]/.test(evt.key) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(evt.key)) {
      evt.preventDefault();
    }
  }
}
