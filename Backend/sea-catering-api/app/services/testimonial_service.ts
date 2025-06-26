import BaseService from '#base/services/base_service'
import TestimonialRepository from '#repositories/testimonial_repository'

export default class TestimonialService extends BaseService {
  constructor() {
    super(new TestimonialRepository())
  }

  async submitTestimonial(data: { customer_name: string; review_message: string; rating: number }) {
    return await this.repository.create({
      customerName: data.customer_name,
      reviewMessage: data.review_message,
      rating: data.rating,
      status: 'pending',
    })
  }

  async getApprovedTestimonials(limit?: number, offset?: number) {
    return await this.repository.getApprovedTestimonials(limit, offset)
  }
}
