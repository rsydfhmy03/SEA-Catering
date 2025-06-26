import BaseRepository from '#base/repositories/base_repository'
import Testimonial from '#models/testimonial'

export default class TestimonialRepository extends BaseRepository {
  constructor() {
    super(Testimonial)
  }

  async getApprovedTestimonials(limit?: number, offset?: number) {
    const query = this.model.query().where('status', 'approved').orderBy('created_at', 'desc')

    if (limit) query.limit(limit)
    if (offset) query.offset(offset)

    return await query
  }

  async getPendingTestimonials() {
    return await this.findManyBy('status', 'pending')
  }

  async approveTestimonial(id: string) {
    return await this.update(id, { status: 'approved' })
  }
}
