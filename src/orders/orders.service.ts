import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectModel } from '@nestjs/sequelize';
import { AccountStorageService } from '../accounts/account-storage/account-storage.service';
import { EmptyResultError } from 'sequelize';
import { Producer } from '@nestjs/microservices/external/kafka.interface';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    private storageService: AccountStorageService,
    @Inject('KAFKA_PRODUCER')
    private kafkaProducer: Producer,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.orderModel.create({
      ...createOrderDto,
      account_id: this.storageService.account.id,
    });
    this.kafkaProducer.send({
      topic: 'transactions',
      messages: [
        {
          key: 'transactions',
          value: JSON.stringify({
            id: order.id,
            account_id: order.account_id,
            ...createOrderDto,
          }),
        },
      ],
    });
    return order;
  }

  findAll() {
    return this.orderModel.findAll({
      where: {
        account_id: this.storageService.account.id,
      },
    });
  }

  findOneUsingAccount(id: string) {
    return this.orderModel.findOne({
      where: {
        id,
        account_id: this.storageService.account.id,
      },
      rejectOnEmpty: new EmptyResultError(`Order with ID ${id} not toudn`),
    });
  }

  findOne(id: string) {
    return this.orderModel.findByPk(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const account = this.storageService.account;
    const order = await (account
      ? this.findOneUsingAccount(id)
      : this.findOne(id));
    return order.update(updateOrderDto);
  }

  async remove(id: string) {
    const order = await this.findOneUsingAccount(id);
    return order.destroy();
  }
}
