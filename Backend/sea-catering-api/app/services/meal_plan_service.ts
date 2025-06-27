import BaseService from '#base/services/base_service'
import MealPlanRepository from '#repositories/meal_plan_repository'

export default class MealPlanService extends BaseService {
  constructor() {
    super(new MealPlanRepository())
  }

  async getAllActivePlans() {
    return await this.repository.getActivePlans()
  }
}
