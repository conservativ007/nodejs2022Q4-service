import { Injectable, Scope, LoggerService } from '@nestjs/common';
import { createWriteStream, WriteStream, stat } from 'fs';
import { cwd, stdout } from 'process';

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
  }

  log(message: string, ...optionalParams: any[]) {
    this.writeLog(message, optionalParams[0]);
  }

  error(message: any, ...optionalParams: any[]) {
    let addMessage = 'Error: ' + message;
    this.writeLog(addMessage, optionalParams[0], true);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.log(this.service);
    console.log(message);
  }

  writeLog(message: string, service: string, error = false) {
    let date = new Date().toISOString().split('T')[1];
    stdout.write(`${date} ${service} ${message} \n`);

    if (error === false) {
      this.fileToLog.write(`${date} ${message} \n`);
      return;
    }

    this.fileToErrorLog.write(`${date} ${message} \n`);
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
