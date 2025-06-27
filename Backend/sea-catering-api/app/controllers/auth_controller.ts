import type { HttpContext } from '@adonisjs/core/http'
import AuthService from '#services/auth_services'
import { ApiResponse } from '#base/responses/api_response'
import { authValidator, loginValidator } from '#validators/auth_validator'

export default class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  async register({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(authValidator)

      const result = await this.authService.register(payload)

      return response
        .status(201)
        .json(ApiResponse.success(result, 'User registered successfully.', 201))
    } catch (error) {
      if (error.message === 'Email already registered') {
        return response
          .status(400)
          .json(
            ApiResponse.validationError([{ field: 'email', message: 'Email already registered.' }])
          )
      }
      if ('messages' in error && Array.isArray(error.messages)) {
        const formattedErrors = error.messages.map((msg: any) => ({
          field: msg.field,
          message: msg.message,
        }))

        return response.status(400).json(ApiResponse.validationError(formattedErrors))
      }

      return response.status(500).json(ApiResponse.serverError('Registration failed.'))
    }
  }

  async login({ request, response }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginValidator)

      const result = await this.authService.login(email, password)

      return response.json(ApiResponse.success(result, 'Login successful.'))
    } catch (error) {
      return response.status(401).json(ApiResponse.unauthorized('Invalid credentials.'))
    }
  }

  async logout({ response }: HttpContext) {
    // In JWT implementation, logout is typically handled client-side
    // by removing the token. Server-side blacklisting can be implemented if needed.
    return response.json(ApiResponse.success(null, 'Logout successful.'))
  }
}
