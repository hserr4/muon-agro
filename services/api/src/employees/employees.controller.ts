import { Controller, Get, Post, Patch, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { TenantGuard } from '../tenant/tenant.guard';
import { CreateEmployeeDto, UpdateEmployeeDto, CreateTaskDto, UpdateTaskDto } from './dto/employee.dto';

@ApiTags('Employees')
@Controller('employees')
@ApiBearerAuth()
@UseGuards(TenantGuard)
export class EmployeesController {
  constructor(private readonly service: EmployeesService) {}

  @Post()
  create(@Body() dto: CreateEmployeeDto, @Req() req: any) {
    return this.service.create(dto, req.tenantId);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.service.findAll(req.tenantId);
  }

  @Get('metrics')
  getMetrics(@Req() req: any) {
    return this.service.getMetrics(req.tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.service.findOne(id, req.tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto, @Req() req: any) {
    return this.service.update(id, dto, req.tenantId);
  }

  @Post(':id/tasks')
  createTask(@Param('id') id: string, @Body() dto: CreateTaskDto, @Req() req: any) {
    return this.service.createTask({ ...dto, employeeId: id }, req.tenantId);
  }

  @Get(':id/tasks')
  getTasks(@Param('id') id: string, @Req() req: any) {
    return this.service.getTasks(id, req.tenantId);
  }

  @Patch('tasks/:taskId')
  updateTask(@Param('taskId') taskId: string, @Body() dto: UpdateTaskDto) {
    return this.service.updateTask(taskId, dto);
  }
}