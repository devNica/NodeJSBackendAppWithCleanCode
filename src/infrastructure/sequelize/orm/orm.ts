import { Sequelize } from 'sequelize/types'
import { UserModel, GroupModel } from '../models'

export default async function sequelizeLoader (sequelizeInstance: Sequelize): Promise<void> {
  // ASSOCIATIONS

  // GROUP MODEL
  GroupModel.belongsToMany(UserModel, { through: 'group_has_user', as: 'roles', foreignKey: 'fk_group', onDelete: 'RESTRICT' })

  // USER MODEL
  UserModel.belongsToMany(GroupModel, { through: 'group_has_user', as: 'userRoles', foreignKey: 'fk_user', onDelete: 'RESTRICT' })

  await sequelizeInstance.sync({ alter: false })
    .then(_res => {
      console.log('all models has been created')
    }).catch(err => console.error(err))
}
