import BaseService from '#base/services/base_service'
import SubscriptionRepository from '#repositories/subscription_repository'
import MealPlanRepository from '#repositories/meal_plan_repository'
import { DateTime } from 'luxon'

export default class SubscriptionService extends BaseService {
  private mealPlanRepository: MealPlanRepository

  constructor() {
    super(new SubscriptionRepository())
    this.mealPlanRepository = new MealPlanRepository()
  }

  async createSubscription(
    userId: string,
    data: {
      plan_id: string
      meal_types: string[]
      delivery_days: string[]
      allergies?: string
      phone_number: string
    }
  ) {
    // Validate meal plan exists
    const mealPlan = await this.mealPlanRepository.findById(data.plan_id)
    if (!mealPlan) {
      throw new Error('Meal plan not found')
    }

    // Calculate total price
    const totalPrice = this.repository.calculateTotalPrice(
      mealPlan.price,
      data.meal_types,
      data.delivery_days
    )

    // Create subscription
    const subscription = await this.repository.create({
      userId: userId,
      planId: data.plan_id,
      mealTypes: data.meal_types,
      deliveryDays: data.delivery_days,
      allergies: data.allergies || null,
      phoneNumber: data.phone_number,
      totalPrice: totalPrice,
      status: 'active',
      startDate: DateTime.now(),
      endDate: DateTime.now().plus({ months: 1 }),
    })

    // Load meal plan data for response
    await subscription.load('mealPlan')

    return {
      id: subscription.id,
      user_id: subscription.userId,
      plan_id: subscription.planId,
      meal_types: subscription.mealTypes,
      delivery_days: subscription.deliveryDays,
      allergies: subscription.allergies,
      total_price: subscription.totalPrice,
      status: subscription.status,
      start_date: subscription.startDate.toISODate(),
      end_date: subscription.endDate.toISODate(),
    }
  }

  async getUserSubscriptions(userId: string) {
    try {
      console.log('Fetching subscriptions for user:', userId)
      const subscriptions = await this.repository.getUserActiveSubscriptions(userId)
      console.log('Found subscriptions:', subscriptions.length)
      if (subscriptions.length === 0) {
        return []
      }
      return subscriptions.map((sub: any) => ({
        id: sub.id,
        plan_name: sub.mealPlan.name,
        meal_types: sub.mealTypes,
        delivery_days: sub.deliveryDays,
        total_price: sub.totalPrice,
        status: sub.status,
        start_date: DateTime.fromJSDate(new Date(sub.startDate)).toISODate(),
        end_date: DateTime.fromJSDate(new Date(sub.endDate)).toISODate(),
        allergies: sub.allergies,
      }))
    } catch (error) {
      console.error('Error fetching user subscriptions:', error)
      return error
    }
  }

  async pauseSubscription(
    subscriptionId: string,
    userId: string,
    data: {
      pause_start_date: string
      pause_end_date: string
    }
  ) {
    // Verify subscription belongs to user
    const subscription = await this.repository.findById(subscriptionId)
    if (!subscription || subscription.userId !== userId) {
      throw new Error('Subscription not found or unauthorized')
    }

    // Validate dates
    const startDate = DateTime.fromISO(data.pause_start_date)
    const endDate = DateTime.fromISO(data.pause_end_date)

    if (endDate <= startDate) {
      throw new Error('End date must be after start date')
    }

    return await this.repository.pauseSubscription(
      subscriptionId,
      data.pause_start_date,
      data.pause_end_date
    )
  }

  async cancelSubscription(subscriptionId: string, userId: string) {
    // Verify subscription belongs to user
    const subscription = await this.repository.findById(subscriptionId)
    if (!subscription || subscription.userId !== userId) {
      throw new Error('Subscription not found or unauthorized')
    }

    return await this.repository.cancelSubscription(subscriptionId)
  }
}
