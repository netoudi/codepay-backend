import { join } from 'path';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { AccountsModule } from './accounts/accounts.module';
import { Account } from './accounts/entities/account.entity';

@Module({
  imports: [
    OrdersModule,
    AccountsModule,
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: join(__dirname, 'database.sqlite'),
      autoLoadModels: true,
      models: [Order, Account],
      sync: {
        alter: true,
        force: true, // don't use in production
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
