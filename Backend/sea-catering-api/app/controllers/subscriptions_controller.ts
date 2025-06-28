import type { HttpContext } from '@adonisjs/core/http'
import SubscriptionService from '#services/subscription_service'
import { ApiResponse } from '#base/responses/api_response'
import {
  subscriptionValidator,
  pauseSubscriptionValidator,
} from '#validators/subscription_validator'

export default class SubscriptionsController {
  private subscriptionService: SubscriptionService

  constructor() {
    this.subscriptionService = new SubscriptionService()
  }

  async store({ request, response, auth }: HttpContext) {
    console.log('Received request to create subscription', request.body())
    console.log('Authenticated user:', auth.user)
    console.log('Authenticated user new:', request.user)
    try {
      const payload = await request.validateUsing(subscriptionValidator)
      const userId = request.user?.userId
      console.log('Authenticated user ID:', userId)
      if (!userId) {
        return response.status(401).json(ApiResponse.unauthorized('User not authenticated.'))
      }
      console.log('Creating subscription for user:', userId, 'with payload:', payload)
      const subscription = await this.subscriptionService.createSubscription(userId, payload)

      return response
        .status(201)
        .json(ApiResponse.success(subscription, 'Subscription created successfully.', 201))
    } catch (error) {
      if (error.message === 'Meal plan not found') {
        return response
          .status(400)
          .json(
            ApiResponse.validationError([{ field: 'plan_id', message: 'Meal plan not found.' }])
          )
      }
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.status(400).json(ApiResponse.validationError(error.messages))
      }
      console.error('Subscription creation error:', error)
      return response.status(500).json(ApiResponse.error('Subscription creation failed.'))
    }
  }

  async getUserSubscriptions({ response, request }: HttpContext) {
    try {
      const userId = request.user?.userId
      console.log('Fetching subscriptions for user:', userId)
      if (!userId) {
        return response.status(401).json(ApiResponse.unauthorized('User not authenticated.'))
      }
      const subscriptions = await this.subscriptionService.getUserSubscriptions(userId)

      return response.json(
        ApiResponse.success(subscriptions, 'User subscriptions retrieved successfully.')
      )
    } catch (error) {
      return response.status(500).json(ApiResponse.serverError())
    }
  }

  async getUserPausedSubscriptions({ response, request }: HttpContext) {
    try {
      const userId = request.user?.userId
      console.log('Fetching paused subscriptions for user:', userId)
      if (!userId) {
        return response.status(401).json(ApiResponse.unauthorized('User not authenticated.'))
      }
      const subscriptions = await this.subscriptionService.getUserPausedSubscriptions(userId)

      return response.json(
        ApiResponse.success(subscriptions, 'User paused subscriptions retrieved successfully.')
      )
    } catch (error) {
      return response.status(500).json(ApiResponse.serverError())
    }
  }

  async pause({ params, request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(pauseSubscriptionValidator)
      const userId = request.user?.userId

      const subscription = await this.subscriptionService.pauseSubscription(params.id, userId, {
        pause_start_date: payload.pause_start_date.toISOString(),
        pause_end_date: payload.pause_end_date.toISOString(),
      })

      // Convert dates to ISO strings if they exist
      const result = {
        id: subscription.id,
        status: subscription.status,
        pause_start_date: subscription.pauseStartDate
          ? new Date(subscription.pauseStartDate).toISOString().split('T')[0]
          : null,
        pause_end_date: subscription.pauseEndDate
          ? new Date(subscription.pauseEndDate).toISOString().split('T')[0]
          : null,
      }

      return response.json(ApiResponse.success(result, 'Subscription paused successfully.'))
    } catch (error) {
      console.error('Pause subscription error:', error)
      if (error.message === 'Subscription not found or unauthorized') {
        return response
          .status(403)
          .json(ApiResponse.forbidden('Forbidden. You can only pause your own subscriptions.'))
      }

      if (error.message === 'End date must be after start date') {
        return response
          .status(400)
          .json(
            ApiResponse.validationError([
              { field: 'pause_end_date', message: 'End date must be after start date.' },
            ])
          )
      }

      return response
        .status(400)
        .json(ApiResponse.error(error.message || 'Invalid pause date range.'))
    }
  }

  async cancel({ params, response, request }: HttpContext) {
    try {
      const userId = request.user?.userId

      const subscription = await this.subscriptionService.cancelSubscription(params.id, userId)

      const result = {
        id: subscription.id,
        status: subscription.status,
      }

      return response.json(ApiResponse.success(result, 'Subscription cancelled successfully.'))
    } catch (error) {
      if (error.message === 'Subscription not found or unauthorized') {
        return response
          .status(403)
          .json(ApiResponse.forbidden('Forbidden. You can only cancel your own subscriptions.'))
      }

      return response.status(500).json(ApiResponse.serverError())
    }
  }
}
