import { DataTypes, Model } from 'sequelize'
import sequelizeConfig from '../connection'

export interface GroupHasUserEntity{
  fkGroup: number
  fkUser: number
}

export interface UserAttrInput extends Required<GroupHasUserEntity> {}
export interface UserAttrOutput extends Required<GroupHasUserEntity> {}

export default class GroupHasUserModel extends Model<GroupHasUserEntity, UserAttrInput> implements GroupHasUserEntity {
  public fkGroup!: number
  public fkUser!: number
}

GroupHasUserModel.init({
  fkGroup: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'group',
      key: 'id'
    }
  },
  fkUser: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  }
}, {
  sequelize: sequelizeConfig,
  modelName: 'group_has_user',
  underscored: true
})
