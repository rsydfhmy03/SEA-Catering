import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'subscriptions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('gen_random_uuid()'))
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.uuid('plan_id').references('id').inTable('meal_plans').onDelete('CASCADE')
      table.json('meal_types').notNullable() // ['Breakfast', 'Lunch', 'Dinner']
      table.json('delivery_days').notNullable() // ['Monday', 'Tuesday', etc.]
      table.text('allergies').nullable()
      table.string('phone_number').notNullable()
      table.decimal('total_price', 12, 2).notNullable()
      table.enum('status', ['active', 'paused', 'cancelled']).defaultTo('active')
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.date('pause_start_date').nullable()
      table.date('pause_end_date').nullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
