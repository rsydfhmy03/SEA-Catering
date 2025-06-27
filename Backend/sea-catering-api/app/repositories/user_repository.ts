// app/repositories/user_repository.ts
import BaseRepository from '#base/repositories/base_repository'
import User from '#models/user'

export default class UserRepository extends BaseRepository {
  constructor() {
    super(User)
  }

  async findByEmail(email: string) {
    return await this.findBy('email', email)
  }

  async getAllUsers(
    options: {
      limit?: number
      offset?: number
      role?: string
    } = {}
  ) {
    const query = this.model.query()

    if (options.role) {
      query.where('role', options.role)
    }

    if (options.limit) query.limit(options.limit)
    if (options.offset) query.offset(options.offset)

    return await query
  }
}
