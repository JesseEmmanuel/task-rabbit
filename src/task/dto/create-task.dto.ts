import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    completed: boolean;

    @IsOptional()
    parentId?: string
    
    @IsNotEmpty()
    assigned_by_id: string

    @IsNotEmpty()
    assignee_id: string
}