import BaseRepository from '#base/repositories/base_repository'
import Subscription from '#models/subscription'
import { DateTime } from 'luxon'

export default class SubscriptionRepository extends BaseRepository {
  constructor() {
    super(Subscription)
  }

  async getUserActiveSubscriptions(userId: string) {
    console.log('Fetching active subscriptions for user in repository:', userId)
    try {
      const query = this.model
        .query()
        .where('user_id', userId)
        .where('status', 'active')
        .preload('mealPlan')
        .orderBy('created_at', 'desc')
      const result = await query
      console.log('Raw result from query:', result)
      return result
    } catch (error) {
      console.error('Error fetching active subscriptions:', error)
      return error
    }
  }

  async getUserPausedSubscriptions(userId: string) {
    console.log('Fetching paused subscriptions for user in repository:', userId)
    try {
      const query = this.model
        .query()
        .where('user_id', userId)
        .where('status', 'paused')
        .preload('mealPlan')
        .orderBy('created_at', 'desc')
      const result = await query
      console.log('Raw result from query:', result)
      return result
    } catch (error) {
      console.error('Error fetching paused subscriptions:', error)
      return error
    }
  }

  async getAllSubscriptions(
    options: {
      status?: string
      limit?: number
      offset?: number
      startDate?: string
      endDate?: string
    } = {}
  ) {
    const query = this.model.query().preload('user').preload('mealPlan')

    if (options.status) {
      query.where('status', options.status)
    }

    if (options.startDate && options.endDate) {
      query.whereBetween('created_at', [options.startDate, options.endDate])
    }

    if (options.limit) query.limit(options.limit)
    if (options.offset) query.offset(options.offset)

    return await query.orderBy('created_at', 'desc')
  }

  async pauseSubscription(id: string, pauseStartDate: string, pauseEndDate: string) {
    return await this.update(id, {
      status: 'paused',
      pause_start_date: pauseStartDate,
      pause_end_date: pauseEndDate,
    })
  }

  async cancelSubscription(id: string) {
    return await this.update(id, { status: 'cancelled' })
  }

  async getMetrics(startDate?: string, endDate?: string) {
    const baseQuery = this.model.query()

    if (startDate && endDate) {
      baseQuery.whereBetween('created_at', [startDate, endDate])
    }

    // New subscriptions
    const newSubscriptions = await baseQuery.clone().count('* as total')

    // Monthly Recurring Revenue (MRR)
    const activeSubscriptions = await this.model
      .query()
      .where('status', 'active')
      .sum('total_price as mrr')

    // Reactivations (cancelled -> active)
    const reactivations = await this.model
      .query()
      .where('status', 'active')
      .where('updated_at', '>=', DateTime.now().minus({ days: 30 }).toSQL())
      .count('* as total')

    // Total active subscriptions
    const totalActive = await this.model.query().where('status', 'active').count('* as total')

    return {
      newSubscriptions: newSubscriptions[0].$extras.total,
      mrr: activeSubscriptions[0].$extras.mrr || 0,
      reactivations: reactivations[0].$extras.total,
      totalActiveSubscriptions: totalActive[0].$extras.total,
    }
  }

  calculateTotalPrice(planPrice: number, mealTypes: string[], deliveryDays: string[]) {
    // Formula: (Plan Price) x (Number of Meal Types) x (Number of Delivery Days) x 4.3
    return planPrice * mealTypes.length * deliveryDays.length * 4.3
  }
}
