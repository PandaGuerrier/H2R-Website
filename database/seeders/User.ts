import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        username: 'Panda',
        email: 'Panda@gmail.com',
        password: 'xxxxx',
        role: 'admin'
      }])

      // add permissions to the admin user
      const user = await User.findByOrFail('username', 'Panda')
      await user.related('permissions').sync([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25])
  }
}
