import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { AccountsModule } from './accounts/accounts.module';
import { Account } from './accounts/entities/account.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OrdersModule,
    AccountsModule,
    SequelizeModule.forRoot({
      dialect: process.env.DB_CONNECTION as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadModels: true,
      models: [Order, Account],
      sync: {
        alter: true,
        // force: true, // don't use in production
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
