import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
