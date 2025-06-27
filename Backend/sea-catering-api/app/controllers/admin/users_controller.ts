import type { HttpContext } from '@adonisjs/core/http'
import UserRepository from '#repositories/user_repository'
import { ApiResponse } from '#base/responses/api_response'

export default class AdminUsersController {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async index({ request, response }: HttpContext) {
    try {
      const limit = request.input('limit')
      const offset = request.input('offset')
      const role = request.input('role')

      const users = await this.userRepository.getAllUsers({ limit, offset, role })

      const formattedUsers = users.map(
        (user: { id: any; fullName: any; email: any; role: any; createdAt: any }) => ({
          id: user.id,
          full_name: user.fullName,
          email: user.email,
          role: user.role,
          created_at: user.createdAt,
        })
      )

      return response.json(ApiResponse.success(formattedUsers, 'Users retrieved successfully.'))
    } catch (error) {
      return response.status(500).json(ApiResponse.serverError())
    }
  }

  async updateRole({ params, request, response }: HttpContext) {
    try {
      const { role } = request.only(['role'])

      if (!['user', 'admin'].includes(role)) {
        return response
          .status(400)
          .json(
            ApiResponse.validationError([
              { field: 'role', message: 'Role must be either user or admin.' },
            ])
          )
      }

      const user = await this.userRepository.update(params.id, { role })

      if (!user) {
        return response.status(404).json(ApiResponse.notFound('User not found.'))
      }

      return response.json(
        ApiResponse.success({ id: user.id, role: user.role }, 'User role updated successfully.')
      )
    } catch (error) {
      return response.status(500).json(ApiResponse.serverError())
    }
  }
}
