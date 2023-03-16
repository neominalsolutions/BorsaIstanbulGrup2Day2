import { Component, Inject, OnInit } from '@angular/core';
import { ConsoleLogger, ILogger, loggerType } from '../ILogger';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ConsoleLogger],
})
export class HomeComponent implements OnInit {
  constructor(
    private cL: ConsoleLogger,
    @Inject(loggerType) private logger: ILogger // Console logger bağlı kalma Logger provider üzerinden bir loglamaya bağlan.
  ) {}

  ngOnInit(): void {
    this.logger.log('home-component');
  }
}
