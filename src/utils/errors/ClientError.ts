export type NblocksErrorData = { statusCode?: number, message: string, error?: string };
export class ClientError extends Error {
    httpStatus?: number;
    errorCode?: string;
    details?: NblocksErrorData;

    constructor(data: NblocksErrorData | string | unknown, httpStatus?: number,) {
        if (typeof data === 'string') {
            super(data);
            this.httpStatus = httpStatus ? httpStatus : 0;
        } else if (typeof data === 'object') {
            const nbError = data as NblocksErrorData;
            super(nbError.message);
            this.errorCode = nbError.error;
            this.details = nbError;
            this.httpStatus = httpStatus ? httpStatus : nbError.statusCode;
        } else {
            super();
        }
    }
}