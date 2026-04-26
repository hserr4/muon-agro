import { Controller, Get, Patch, Delete, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { TenantGuard } from '../tenant/tenant.guard';

@ApiTags('Notifications')
@Controller('notifications')
@ApiBearerAuth()
@UseGuards(TenantGuard)
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Get()
  findAll(@Req() req: any, @Query('unread') unread?: string) {
    return this.service.findAll(req.tenantId, unread === 'true');
  }

  @Get('count')
  getUnreadCount(@Req() req: any) {
    return this.service.getUnreadCount(req.tenantId);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string, @Req() req: any) {
    return this.service.markAsRead(id, req.tenantId);
  }

  @Patch('read-all')
  markAllAsRead(@Req() req: any) {
    return this.service.markAllAsRead(req.tenantId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: any) {
    return this.service.delete(id, req.tenantId);
  }
}