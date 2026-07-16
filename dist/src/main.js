"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['warn', 'debug', 'log', 'error'],
    });
    app.enableCors(),
        app.setGlobalPrefix('api', {
            exclude: [{ path: '', method: common_1.RequestMethod.ALL }],
        });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    const port = process.env.PORT || 5000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map