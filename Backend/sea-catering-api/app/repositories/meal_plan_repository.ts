import BaseRepository from '#base/repositories/base_repository'
import MealPlan from '#models/meal_plan'

export default class MealPlanRepository extends BaseRepository {
  constructor() {
    super(MealPlan)
  }

  async getActivePlans() {
    return await this.findManyBy('is_active', true)
  }
}
