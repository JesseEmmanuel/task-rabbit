import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {

    constructor() {
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        })

        const adapter = new PrismaPg(pool);

        super({ adapter })
    }

    async onModuleInit() {
        await this.$connect();
    }
}

export interface PaginatedResult<T> {
    data: T[];
    meta: {
        total: number;
        lastPage: number;
        currentPage: number;
        perPage: number;
        prev: number | null;
        next: number | null;
    };
}

export type PaginateOptions = {
    page?: number | string;
    perPage?: number | string;
    orderBy?: any;
    take?: number;
};

export type PaginateFunction = <T, K>(
    model: any,
    args?: K,
    options?: PaginateOptions,
) => Promise<PaginatedResult<T>>;

export const paginator = (
    defaultOptions: PaginateOptions,
): PaginateFunction => {
    return async (model, args: any = { where: undefined }, options) => {
        const page = Number(options?.page || defaultOptions?.page) || 1;
        const perPage = Number(options?.perPage || defaultOptions?.perPage) || 10;

        const skip = page > 0 ? perPage * (page - 1) : 0;
        const [total, data] = await Promise.all([
            model.count({ where: args.where }),
            model.findMany({
                ...args,
                take: options?.take || perPage,
                skip,
                orderBy: options?.orderBy,
            }),
        ]);
        const lastPage = Math.ceil(total / perPage);
        return {
            data,
            meta: {
                total,
                lastPage,
                currentPage: page,
                perPage,
                prev: page > 1 ? page - 1 : null,
                next: page < lastPage ? page + 1 : null,
            },
        };
    };
};
