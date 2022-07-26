import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConfig from '../connection'

export interface UserEntity{
  id: number
  email: string
  password: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface UserAttrInput extends Optional<UserEntity, 'id' | 'isActive' | 'updatedAt' > {}
export interface UserAttrOutput extends Required<UserEntity> {}

export default class UserModel extends Model<UserEntity, UserAttrInput> implements UserEntity {
  public id!: number
  public email!: string
  public password!: string
  public isActive!: boolean
  public createdAt!: string
  public updatedAt!: string
}

UserModel.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize: sequelizeConfig,
  modelName: 'user',
  underscored: true
})
