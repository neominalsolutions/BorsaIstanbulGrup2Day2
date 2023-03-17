import { Component, Inject, OnInit } from '@angular/core';
import { ConsoleLogger, ILogger, loggerType } from '../ILogger';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ConsoleLogger],
})
export class HomeComponent implements OnInit {
  today!: Date;
  amount: number = 36788;
  name: string = 'ali'; // capitalize

  constructor(
    private cL: ConsoleLogger,
    @Inject(loggerType) private logger: ILogger // Console logger bağlı kalma Logger provider üzerinden bir loglamaya bağlan.
  ) {
    this.today = new Date();
  }

  ngOnInit(): void {
    this.logger.log('home-component');
  }
}
