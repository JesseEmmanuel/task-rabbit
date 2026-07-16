import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(data: CreateTaskDto, req: any): Promise<{
        id: string;
        title: string;
        description: string | null;
        completed: boolean;
        createdAt: Date;
        assignee_id: string;
        assigned_by_id: string;
        parentId: string | null;
    }>;
    findAll(page: number, order_by: string, req: any): Promise<import("../database/database.service").PaginatedResult<{
        id: string;
        title: string;
        description: string | null;
        completed: boolean;
        createdAt: Date;
        assignee_id: string;
        assigned_by_id: string;
        parentId: string | null;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        completed: boolean;
        createdAt: Date;
        assignee_id: string;
        assigned_by_id: string;
        parentId: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        title: string;
        description: string | null;
        completed: boolean;
        createdAt: Date;
        assignee_id: string;
        assigned_by_id: string;
        parentId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        completed: boolean;
        createdAt: Date;
        assignee_id: string;
        assigned_by_id: string;
        parentId: string | null;
    }>;
}
