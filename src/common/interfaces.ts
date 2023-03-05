export interface MessageLog {
  statusCode?: number;
  message?: string;
  method?: string;
}

export interface ServiceLoggerLog {
  method: string;
  originalUrl: string;
  serializedParams: string;
  serializedBody: string;
  statusCode: string;
}
