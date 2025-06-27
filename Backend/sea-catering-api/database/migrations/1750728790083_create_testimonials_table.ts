import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'testimonials'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('gen_random_uuid()'))
      table.string('customer_name').notNullable()
      table.text('review_message').notNullable()
      table.integer('rating').unsigned().notNullable().checkBetween([1, 5])
      table.enum('status', ['pending', 'approved', 'rejected']).defaultTo('pending')
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
