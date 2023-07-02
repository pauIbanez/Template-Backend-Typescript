export enum ErrorSeverety {
  high = "HIGH",
  medium = "MEDIUM",
  low = "LOW",
}

interface ServerError extends Error {
  code?: string;
  messageToSend?: string;
  statusCode?: number;
  extraData?: {
    accountId?: string;
    [x: string]: unknown;
  };
  severety: ErrorSeverety;
}

export default ServerError;
