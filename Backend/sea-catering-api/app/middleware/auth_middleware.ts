import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { ApiResponse } from '#app/base/responses/api_response'
import AuthService from '#app/services/auth_services'

// Extend the Request interface to include 'user'
declare module '@adonisjs/core/http' {
  interface Request {
    user?: any
  }
}

export default class AuthMiddleware {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  async handle({ request, response }: HttpContext, next: NextFn) {
    const authHeader = request.header('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.status(401).json(ApiResponse.unauthorized('Unauthorized. Please login.'))
    }

    try {
      const token = authHeader.substring(7)
      const decoded = this.authService.verifyToken(token) as any

      // Attach user info to request object
      request['user'] = decoded

      await next()
    } catch (error) {
      return response.status(401).json(ApiResponse.unauthorized('Invalid token.'))
    }
  }
}
