// src/middleware/request-logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as chalk from 'chalk';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(chalk.green('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
        console.log(chalk.yellow(`📨 [${new Date().toISOString()}] ${req.method} ${req.originalUrl}`));
        console.log(chalk.cyan('Headers:'), chalk.cyan(JSON.stringify(req.headers, null, 2)));
        console.log(chalk.magenta('Body:'), chalk.magenta(JSON.stringify(req.body, null, 2)));
        console.log(chalk.green('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
        next();
    }
}