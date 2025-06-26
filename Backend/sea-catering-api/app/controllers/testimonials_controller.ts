import type { HttpContext } from '@adonisjs/core/http'
import TestimonialService from '#services/testimonial_service'
import { ApiResponse } from '#base/responses/api_response'
import { testimonialValidator } from '#validators/testimonial_validator'

export default class TestimonialsController {
  private testimonialService: TestimonialService

  constructor() {
    this.testimonialService = new TestimonialService()
  }

  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(testimonialValidator)
      
      const testimonial = await this.testimonialService.submitTestimonial(payload)
      
      const result = {
        id: testimonial.id,
        customer_name: testimonial.customerName,
        review_message: testimonial.reviewMessage,
        rating: testimonial.rating,
        status: testimonial.status
      }

      return response.status(201).json(
        ApiResponse.success(result, 'Testimonial submitted successfully, awaiting approval.', 201)
      )
    } catch (error) {
      return response.status(400).json(
        ApiResponse.validationError([
          { field: 'general', message: 'Failed to submit testimonial.' }
        ])
      )
    }
  }

  async index({ request, response }: HttpContext) {
    try {
      const limit = request.input('limit')
      const offset = request.input('offset')
      
      const testimonials = await this.testimonialService.getApprovedTestimonials(limit, offset)
      
      const formattedTestimonials = testimonials.map(testimonial => ({
        id: testimonial.id,
        customer_name: testimonial.customerName,
        review_message: testimonial.reviewMessage,
        rating: testimonial.rating,
        status: testimonial.status
      }))

      return response.json(
        ApiResponse.success(formattedTestimonials, 'Testimonials retrieved successfully.')
      )
    } catch (error) {
      return response.status(500).json(
        ApiResponse.serverError()
      )
    }
  }
}