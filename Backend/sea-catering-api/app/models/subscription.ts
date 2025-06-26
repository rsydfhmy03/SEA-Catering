import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import MealPlan from './meal_plan.js'

export default class Subscription extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @column()
  declare planId: string

  @column()
  declare mealTypes: string[]

  @column()
  declare deliveryDays: string[]

  @column()
  declare allergies: string | null

  @column()
  declare phoneNumber: string

  @column()
  declare totalPrice: number

  @column()
  declare status: 'active' | 'paused' | 'cancelled'

  @column.date()
  declare startDate: DateTime

  @column.date()
  declare endDate: DateTime

  @column.date()
  declare pauseStartDate: DateTime | null

  @column.date()
  declare pauseEndDate: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => MealPlan, {
    foreignKey: 'planId', // ← nama kolom di Subscription
    localKey: 'id', // ← default id milik MealPlan
  })
  declare mealPlan: BelongsTo<typeof MealPlan>
}
