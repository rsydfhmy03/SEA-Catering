import type { HttpContext } from '@adonisjs/core/http'
import DashboardService from '#services/admin/dashboard_service'
import { ApiResponse } from '#base/responses/api_response'

export default class DashboardController {
  private dashboardService: DashboardService

  constructor() {
    this.dashboardService = new DashboardService()
  }

  async getMetrics({ request, response }: HttpContext) {
    try {
      const startDate = request.input('start_date')
      const endDate = request.input('end_date')

      const metrics = await this.dashboardService.getMetrics(startDate, endDate)

      return response.json(
        ApiResponse.success(metrics, 'Dashboard metrics retrieved successfully.')
      )
    } catch (error) {
      return response.status(500).json(ApiResponse.serverError())
    }
  }
}
