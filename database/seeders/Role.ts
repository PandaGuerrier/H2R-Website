import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class extends BaseSeeder {
  public async run () {
    await Role.createMany([
      {
        name: 'admin',
        force: 500,
        permissions: [
          'pub:viewList',
          'pub:view',
          'pub:create',
          'pub:update',
          'pub:delete',
        ]
      },
      {
        name: 'formateur',
        force: 100,
        permissions: [
          'video:viewList',
          'video:view',
          'video:create',
          'video:update',
          'video:delete',
          'dashboard:formateur'
        ]
      },
      {
        name: 'argent',
        force: 100,
        permissions: [
          'video:viewList',
          'video:view',
          'video:create',
        ]
      }
    ])
  }
}
