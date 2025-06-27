import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { ApiResponse } from '#base/responses/api_response.js'

export default class AdminMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn) {
    const user = request['user']

    if (!user || user.role !== 'admin') {
      return response.status(403).json(ApiResponse.forbidden('Forbidden. Admin access required.'))
    }

    await next()
  }
}
