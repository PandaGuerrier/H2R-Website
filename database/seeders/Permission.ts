import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'

export default class extends BaseSeeder {
  public async run () {
     await Permission.createMany([
      {
        name: 'pub:viewList',
        label: 'View the list of pubs'
      },
      {
        name: 'pub:view',
        label: 'View a pub'
      },
      {
        name: 'pub:create',
        label: 'Create a pub'
      },
      {
        name: 'pub:update',
        label: 'Update a pub'
      },
      {
        name: 'pub:delete',
        label: 'Delete a pub'
      },
      {
        name: 'video:viewList',
        label: 'View the list of videos'
      },
      {
        name: 'video:view',
        label: 'View a video'
      },
      {
        name: 'video:create',
        label: 'Create a video'
      },
      {
        name: 'video:update',
        label: 'Update a video'
      },
      {
        name: 'video:delete',
        label: 'Delete a video'
      },
      {
        name: 'video:deleteComment',
        label: 'Delete a comment'
      },
      {
        name: 'role:viewList',
        label: 'View the list of roles'
      },
      {
        name: 'role:view',
        label: 'View a role'
      },
      {
        name: 'role:create',
        label: 'Create a role'
      },
      {
        name: 'role:update',
        label: 'Update a role'
      },
      {
        name: 'role:delete',
        label: 'Delete a role'
      },
      {
        name: 'user:viewList',
        label: 'View the list of users'
      },
      {
        name: 'user:view',
        label: 'View a user'
      },
      {
        name: 'user:create',
        label: 'Create a user'
      },
      {
        name: 'user:update',
        label: 'Update a user'
      },
      {
        name: 'user:delete',
        label: 'Delete a user'
      },
      {
        name: 'permission:viewList',
        label: 'View the list of permissions'
      },
      {
        name: 'permission:view',
        label: 'View a permission'
      },
      {
        name: 'permission:create',
        label: 'Create a permission'
      },
      {
        name: 'permission:update',
        label: 'Update a permission'
      },
      {
        name: 'permission:delete',
        label: 'Delete a permission'
      },
      {
        name: 'dashboard:admin',
        label: 'Access to admin dashboard'
      }, 
      {
        name: 'dashboard:formateur',
        label: 'Access to formateur dashboard'
      }
    ])
  }
}
