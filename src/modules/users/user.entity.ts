import { BeforeCreate, BeforeUpdate, Column, DataType, Model, Table } from "sequelize-typescript";
import * as bcrypt from "bcrypt";

@Table({
  timestamps: true,
  tableName: 'users'
})
export class User extends Model {
  @Column({
    type: DataType.STRING(32)
  })
  name: string;

  @Column({
    unique: true,
    type: DataType.STRING(40)
  })
  email: string;

  @Column({
    type: DataType.STRING(60)
  })
  password: string;

  @BeforeUpdate
  @BeforeCreate
  static async beforeCreatePassword(instance: User) {
    instance.password = await bcrypt.hash(instance.password, 10);
  }
}
