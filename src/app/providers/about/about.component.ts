import { Component, Inject } from '@angular/core';
import { ConsoleLogger, ILogger, loggerType } from '../ILogger';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [
    // ovveride işlemi gerçekleşti
    {
      provide: loggerType,
      useClass: ConsoleLogger,
    },
  ],
})
export class AboutComponent {
  /**
   *
   */
  constructor(@Inject(loggerType) private logger: ILogger) {
    this.logger.log('about-component-log');
  }
}
