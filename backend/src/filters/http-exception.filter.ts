import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const message = exception.getResponse() as {
            key: string;
            args: Record<string, unknown>;
        };

        response.status(status).json({
            status: 'error',
            errors: [
                {
                    code: status,
                    title: message['error'],
                    detail: message['message'],
                    correlationId: request.correlationId || '',
                    timestamp: new Date().toISOString(),
                    path: request.url,
                },
            ],
        });
    }
}
