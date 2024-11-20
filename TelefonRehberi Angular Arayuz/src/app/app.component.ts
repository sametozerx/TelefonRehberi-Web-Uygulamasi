import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TelefonRehberiApp';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en'); // Varsayılan dili ayarlayın (örneğin İngilizce)
    this.translate.use('tr'); // Kullanılacak dili ayarlayın (örneğin Türkçe)
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
