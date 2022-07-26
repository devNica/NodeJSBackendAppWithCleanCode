import { Sequelize } from 'sequelize/types'
import { UserModel, GroupModel, GroupHasUserModel } from '../models'

export default async function sequelizeLoader (sequelizeInstance: Sequelize): Promise<void> {
  // ASSOCIATIONS

  // GROUP MODEL
  GroupModel.hasMany(GroupHasUserModel, { foreignKey: 'fk_group' })

  // GROUP_HAS_USER MODEL
  GroupHasUserModel.belongsTo(GroupModel, { foreignKey: 'fk_group' })
  GroupHasUserModel.belongsTo(UserModel, { foreignKey: 'fk_user' })

  // USER MODEL
  UserModel.hasMany(GroupHasUserModel, { foreignKey: 'fk_user' })

  await sequelizeInstance.sync({ alter: true })
    .then(_res => {
      console.log('all models has been created')
    }).catch(err => console.error(err))
}
