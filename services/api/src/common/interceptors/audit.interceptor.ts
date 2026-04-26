import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuditInterceptor.name);

  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, user, ip } = request;
    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: async () => {
          try {
            const duration = Date.now() - startTime;
            await this.prisma.auditLog.create({
              data: {
                tenantId: user?.tenantId || 'system',
                userId: user?.id,
                action: `${method} ${url}`,
                entity: request.route?.path || url.split('?')[0],
                entityId: body?.id || 'N/A',
                changes: { body: this.sanitize(body), duration, status: 'success' },
                ipAddress: ip,
                userAgent: request.headers['user-agent'],
              },
            });
          } catch (err) {
            this.logger.error('Audit log failed', err);
          }
        },
        error: async (err) => {
          try {
            await this.prisma.auditLog.create({
              data: {
                tenantId: user?.tenantId || 'system',
                userId: user?.id,
                action: `${method} ${url}`,
                entity: request.route?.path || url.split('?')[0],
                entityId: 'ERROR',
                changes: { error: err.message, status: 'error' },
                ipAddress: ip,
              },
            });
          } catch (e) {
            this.logger.error('Audit log failed', e);
          }
        },
      })
    );
  }

  private sanitize(obj: any): any {
    if (!obj) return obj;
    const sensitive = ['password', 'token', 'secret', 'key', 'creditCard'];
    const sanitized = { ...obj };
    for (const key of Object.keys(sanitized)) {
      if (sensitive.some(s => key.toLowerCase().includes(s))) {
        sanitized[key] = '***REDACTED***';
      }
    }
    return sanitized;
  }
}