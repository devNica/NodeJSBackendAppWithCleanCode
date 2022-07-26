import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConfig from '../connection'

export interface GroupEntity{
  id: number
  group: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface UserAttrInput extends Optional<GroupEntity, 'id' | 'isActive' | 'updatedAt' > {}
export interface UserAttrOutput extends Required<GroupEntity> {}

export default class GroupModel extends Model<GroupEntity, UserAttrInput> implements GroupEntity {
  public id!: number
  public group!: string
  public isActive!: boolean
  public createdAt!: string
  public updatedAt!: string
}

GroupModel.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  group: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
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
  modelName: 'group',
  underscored: true
})
