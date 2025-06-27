import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('gen_random_uuid()'))
      table.string('full_name').notNullable()
      table.string('email').unique().notNullable()
      table.string('password').notNullable()
      table.enum('role', ['user', 'admin']).defaultTo('user')
      table.timestamp('email_verified_at').nullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
