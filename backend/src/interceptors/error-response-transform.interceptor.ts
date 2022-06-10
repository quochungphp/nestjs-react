import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

export interface Response<T> {
    data: T;
}

@Injectable()
export class ErrorResponseTransformInterceptor<T>
    implements NestInterceptor<T, Response<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response<T>> {
        const request: Express.Request = context.switchToHttp().getRequest();
        return next.handle().pipe(
            catchError((error) => {
                request.logger = request.logger.child({
                    errorMessage: error.message,
                    errorStack: error.stack,
                });
                // TODO: optimize
                if (
                    error instanceof QueryFailedError ||
                    error instanceof EntityNotFoundError
                ) {
                    throw new BadRequestException(error.message);
                } else {
                    return throwError(error);
                }
            }),
        );
    }
}
