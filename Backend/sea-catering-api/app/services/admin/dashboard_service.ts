import SubscriptionRepository from '#repositories/subscription_repository'

export default class DashboardService {
  private subscriptionRepository: SubscriptionRepository

  constructor() {
    this.subscriptionRepository = new SubscriptionRepository()
  }

  async getMetrics(startDate?: string, endDate?: string) {
    return await this.subscriptionRepository.getMetrics(startDate, endDate)
  }
}
