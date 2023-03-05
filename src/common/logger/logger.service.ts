import { Injectable } from '@nestjs/common';
import { createWriteStream, WriteStream } from 'node:fs';
import * as fs from 'node:fs';
import { cwd } from 'process';

@Injectable()
export class LoggerService {
  private fileToLog: WriteStream;
  private fileToErrorLog: WriteStream;

  constructor() {
    this.initFolderLog();
  }

  private createStream(path: string) {
    return createWriteStream(path, {
      encoding: 'utf-8',
      flags: 'a',
    });
  }

  customLog(
    method: string,
    originalUrl: string,
    statusCode: number,
    serializedParams: string[],
    serializedBody: string,
  ) {
    return `method: ${method}, url: ${originalUrl}, code: ${statusCode}, params: ${serializedParams}, body: ${serializedBody}`;
  }

  writeLog(message: string, error = false, service?: string) {
    let date = new Date().toISOString().split('T')[1];

    if (error === false) {
      this.fileToLog.write(`${date} ${message} \n`);
      return;
    }

    this.fileToErrorLog.write(`${date} ${message} \n`);
  }

  initFolderLog() {
    const folderForLogs = cwd() + '/logs';
    const srcFileForLog = cwd() + '/logs/simple-log.log';
    const srcFileForLogError = cwd() + '/logs/error-log.log';

    fs.access(folderForLogs, fs.constants.F_OK, (err) => {
      if (err) {
        fs.mkdir(folderForLogs, () => {});
      }
    });
    fs.access(srcFileForLog, fs.constants.F_OK, (err) => {
      if (err) {
        fs.writeFile(srcFileForLog, '', () => {});
      }
      this.fileToLog = this.createStream(srcFileForLog);
    });
    fs.access(srcFileForLogError, fs.constants.F_OK, (err) => {
      if (err) {
        fs.writeFile(srcFileForLogError, '', () => {});
      }
      this.fileToErrorLog = this.createStream(srcFileForLogError);
    });
  }
}
