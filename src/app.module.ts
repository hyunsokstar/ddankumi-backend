import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from './users/entities/user.entity';
import { RequestLoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "127.0.0.1",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "ddankumi_db",
      entities: [
        UsersModel
      ],
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'your_jwt_secret',  // 실제 환경에서는 환경 변수 사용 권장
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})

// export class AppModule { }

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes('*');
  }
}
