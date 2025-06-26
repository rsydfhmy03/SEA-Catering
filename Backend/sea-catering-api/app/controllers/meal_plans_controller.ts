import type { HttpContext } from '@adonisjs/core/http'
import MealPlanService from '#services/meal_plan_service'
import { ApiResponse } from '#base/responses/api_response'

export default class MealPlansController {
  private mealPlanService: MealPlanService

  constructor() {
    this.mealPlanService = new MealPlanService()
  }

  async index({ response }: HttpContext) {
    try {
      const mealPlans = await this.mealPlanService.getAllActivePlans()

      const formattedPlans = mealPlans.map(
        (plan: {
          id: string
          name: string
          price: number
          description: string
          imageUrl: string
        }) => ({
          id: plan.id,
          name: plan.name,
          price: plan.price,
          description: plan.description,
          image_url: plan.imageUrl,
        })
      )

      return response.json(
        ApiResponse.success(formattedPlans, 'Meal plans retrieved successfully.')
      )
    } catch (error) {
      return response.status(500).json(ApiResponse.serverError())
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const mealPlan = await this.mealPlanService.findById(params.id)

      if (!mealPlan) {
        return response.status(404).json(ApiResponse.notFound('Meal plan not found.'))
      }

      const formattedPlan = {
        id: mealPlan.id,
        name: mealPlan.name,
        price: mealPlan.price,
        description: mealPlan.description,
        image_url: mealPlan.imageUrl,
      }

      return response.json(ApiResponse.success(formattedPlan, 'Meal plan retrieved successfully.'))
    } catch (error) {
      return response.status(500).json(ApiResponse.serverError())
    }
  }
}
