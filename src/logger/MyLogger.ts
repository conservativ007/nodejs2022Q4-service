import {
  Injectable,
  Scope,
  ConsoleLogger,
  LoggerService,
} from '@nestjs/common';
import { createWriteStream, WriteStream } from 'fs';
import { stdin, stdout } from 'process';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger implements LoggerService {
  private service: string;
  private fileToLog: WriteStream;
  private fileToErrorLog: WriteStream;

  constructor() {
    this.fileToLog = this.createStream('./logs/simple-log.log');
    this.fileToErrorLog = this.createStream('./logs/error-log.log');
  }

  private createStream(path: string) {
    return createWriteStream(path, {
      encoding: 'utf-8',
      flags: 'a',
    });
  }

  setContext(arg0: string) {
    this.service = arg0;
    // throw new Error('Method not implemented.');
  }
  /**
   * Write a 'log' level log.
   */
  log(message: string, ...optionalParams: any[]) {
    // console.log(optionalParams);
    this.testFunc(message, optionalParams[0]);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    stdout.write('this error log');
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    console.log(this.service);
    console.log(message);
  }

  testFunc(message: string, service: string) {
    let date = new Date().toISOString().split('T')[1];
    stdout.write(`${date} ${service} ${message} \n`);
    this.fileToLog.write(`${date} ${message} \n`);
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {}
}
