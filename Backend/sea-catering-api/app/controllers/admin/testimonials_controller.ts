import type { HttpContext } from '@adonisjs/core/http'
import TestimonialRepository from '#repositories/testimonial_repository'
import { ApiResponse } from '#base/responses/api_response'

export default class AdminTestimonialsController {
  private testimonialRepository: TestimonialRepository

  constructor() {
    this.testimonialRepository = new TestimonialRepository()
  }

  async approve({ params, response }: HttpContext) {
    try {
      const testimonial = await this.testimonialRepository.approveTestimonial(params.id)

      if (!testimonial) {
        return response.status(404).json(ApiResponse.notFound('Testimonial not found.'))
      }

      const result = {
        id: testimonial.id,
        customer_name: testimonial.customerName,
        review_message: testimonial.reviewMessage,
        rating: testimonial.rating,
        status: testimonial.status,
      }

      return response.json(ApiResponse.success(result, 'Testimonial approved successfully.'))
    } catch (error) {
      return response.status(500).json(ApiResponse.serverError())
    }
  }
}
