"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaConfig = void 0;
const config_1 = require("@prisma/config");
exports.prismaConfig = {
    datasource: {
        url: (0, config_1.env)('DATABASE_URL'),
    },
    migrations: {
        path: 'prisma/migrations',
    },
};
exports.default = (0, config_1.defineConfig)(exports.prismaConfig);
//# sourceMappingURL=prisma.config.js.map