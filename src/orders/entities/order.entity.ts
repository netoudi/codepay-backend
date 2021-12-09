import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export enum OrderStatus {
  Pending = 'pending',
  Approved = 'Approved',
}

@Table({
  tableName: 'orders',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Order extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ allowNull: false, type: DataType.DECIMAL(10, 2) })
  amount: number;

  @Column({ allowNull: false })
  credit_card_number: string;

  @Column({ allowNull: false })
  credit_card_name: string;

  @Column({ allowNull: false, defaultValue: OrderStatus.Pending })
  status: OrderStatus;
}
