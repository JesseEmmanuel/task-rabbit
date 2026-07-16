import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UserGuard } from 'src/user/user.guard';

@Controller('tasks')
@UseGuards(UserGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
    
  @Post()
  async create(@Body() data: CreateTaskDto, @Request() req) {
    return this.taskService.create(data);
  }

  @Get()
  async findAll(
    @Query('page') page:number,
    @Query('order_by') order_by: string,
    @Req() req
  ) {
    return this.taskService.findAll(page, order_by, req);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.taskService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
