import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectModel } from '@nestjs/sequelize';
import { AccountStorageService } from '../accounts/account-storage/account-storage.service';
import { EmptyResultError } from 'sequelize';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    private storageService: AccountStorageService,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return this.orderModel.create({
      ...createOrderDto,
      acccount_id: this.storageService.account.id,
    });
  }

  findAll() {
    return this.orderModel.findAll({
      where: {
        acccount_id: this.storageService.account.id,
      },
    });
  }

  findOne(id: string) {
    return this.orderModel.findOne({
      where: {
        id,
        acccount_id: this.storageService.account.id,
      },
      rejectOnEmpty: new EmptyResultError(`Order with ID ${id} not toudn`),
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    return order.update(updateOrderDto);
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    return order.destroy();
  }
}
