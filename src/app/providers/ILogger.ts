import { Injectable, InjectionToken } from '@angular/core';

// provider ismi tanımladım
// InjectionToken uygulama için provider yapılarının çağrılmasını sağlayacak bir tanımlama
export const loggerType = new InjectionToken<ILogger>('logger');

export interface ILogger {
  log(message: string): void;
}

export class ApiLogger implements ILogger {
  log(message: string): void {
    console.log('api-logger', message);
  }
}

@Injectable()
export class ConsoleLogger implements ILogger {
  log(message: string): void {
    console.log('console-logger', message);
  }
}
