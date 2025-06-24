import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AdminUserSeeder extends BaseSeeder {
  async run() {
    await User.create({
      fullName: 'Admin User',
      email: 'admin@seacatering.com',
      password: await hash.make('Admin123!'),
      role: 'admin',
    })
  }
}
