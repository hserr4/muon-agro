import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto, UpdateEmployeeDto, CreateTaskDto, UpdateTaskDto } from './dto/employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEmployeeDto, tenantId: string) {
    return this.prisma.employee.create({ data: { ...dto, tenantId } });
  }

  async findAll(tenantId: string) {
    return this.prisma.employee.findMany({ where: { tenantId } });
  }

  async findOne(id: string, tenantId: string) {
    const emp = await this.prisma.employee.findFirst({ where: { id, tenantId } });
    if (!emp) throw new NotFoundException('Employee not found');
    return emp;
  }

  async update(id: string, dto: UpdateEmployeeDto, tenantId: string) {
    await this.findOne(id, tenantId);
    return this.prisma.employee.update({ where: { id }, data: dto });
  }

  async createTask(dto: CreateTaskDto, tenantId: string) {
    return this.prisma.task.create({ data: { ...dto, tenantId } });
  }

  async getTasks(employeeId: string, tenantId: string) {
    return this.prisma.task.findMany({ where: { employeeId } });
  }

  async updateTask(id: string, dto: UpdateTaskDto) {
    return this.prisma.task.update({ where: { id }, data: dto });
  }

  async getMetrics(tenantId: string) {
    const employees = await this.prisma.employee.findMany({ where: { tenantId, isActive: true } });
    const totalSalary = employees.reduce((sum, e) => sum + (e.salary || 0), 0);
    return { employeeCount: employees.length, totalSalary };
  }
}