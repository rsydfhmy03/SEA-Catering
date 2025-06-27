import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Testimonial extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare customerName: string

  @column()
  declare reviewMessage: string

  @column()
  declare rating: number

  @column()
  declare status: 'pending' | 'approved' | 'rejected'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
