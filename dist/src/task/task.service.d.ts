import { Task } from '@prisma/client';
import { DatabaseService, PaginatedResult } from "../database/database.service";
import { CreateTaskDto } from './dto/create-task.dto';
export declare class TaskService {
    private readonly databaseService;
    private paginate;
    constructor(databaseService: DatabaseService);
    create(data: CreateTaskDto): Promise<{
        id: string;
        title: string;
        description: string | null;
        completed: boolean;
        createdAt: Date;
        assignee_id: string;
        assigned_by_id: string;
        parentId: string | null;
    }>;
    findAll(page: number, order_by: string, request: any): Promise<PaginatedResult<Task>>;
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
