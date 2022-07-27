import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConfig from '../connection'

export interface UserInfoEntity{
  id: number
  firstname: string
  lastname: string
  address: string
  age: number
  dni: string
  birthdate: string
  fkUser: number
}

export interface UserAttrInput extends Optional<UserInfoEntity, 'id' | 'age' > {}
export interface UserAttrOutput extends Required<UserInfoEntity> {}

export default class UserInfoModel extends Model<UserInfoEntity, UserAttrInput> implements UserInfoEntity {
  public id!: number
  public firstname!: string
  public lastname!: string
  public address!: string
  public age!: number
  public dni!: string
  public birthdate!: string
  public fkUser!: number
}

UserInfoModel.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  firstname: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT('tiny'),
    defaultValue: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: true
  },
  birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  fkUser: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  }
}, {
  sequelize: sequelizeConfig,
  modelName: 'user_info',
  underscored: true
})
