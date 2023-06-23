import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TODOlist';
  isLightThemeActive = false;

  constructor(@Inject(DOCUMENT) private document: Document){}

  changeTheme(newValue: boolean): void {
    if(newValue){
      this.document.body.classList.add('light-mode')
      this.isLightThemeActive = true;
    } else {
      this.document.body.classList.remove('light-mode');
      this.isLightThemeActive = false;
    }
  }
}
