import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {

}
