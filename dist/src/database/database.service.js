"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginator = exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
let DatabaseService = class DatabaseService extends client_1.PrismaClient {
    constructor() {
        const pool = new pg_1.Pool({
            connectionString: process.env.DATABASE_URL,
        });
        const adapter = new adapter_pg_1.PrismaPg(pool);
        super({ adapter });
    }
    async onModuleInit() {
        await this.$connect();
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DatabaseService);
const paginator = (defaultOptions) => {
    return async (model, args = { where: undefined }, options) => {
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
exports.paginator = paginator;
//# sourceMappingURL=database.service.js.map