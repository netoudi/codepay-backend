import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  imports: [SequelizeModule.forFeature([Order]), AccountsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
