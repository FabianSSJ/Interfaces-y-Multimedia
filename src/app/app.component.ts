import { Component } from '@angular/core';
import { MediaControlPanelComponent } from './media-control-panel/media-control-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MediaControlPanelComponent],
  template: `
    <div style="padding: 2rem;">
      <h1>Media Control Panel</h1>
      <app-media-control-panel></app-media-control-panel>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'media-control-panel';
}
