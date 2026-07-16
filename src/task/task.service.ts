import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { DatabaseService, PaginatedResult, paginator } from 'src/database/database.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  private paginate = paginator({ perPage: 10 })
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: CreateTaskDto) {
    return this.databaseService.task.create({
      data: { ...data },
    });
  }

  async findAll(
    page: number,
    order_by: string,
    request: any,
    // user_id: string
  ): Promise<PaginatedResult<Task>> {
    return await this.paginate(
      this.databaseService.task,
      {
        include: {
          assignee: true,
          assigned_by: true
        }
      }
    )
  }

  async findOne(id: string) {
    return this.databaseService.task.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.databaseService.task.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.databaseService.task.delete({ where: { id } });
  }
}
