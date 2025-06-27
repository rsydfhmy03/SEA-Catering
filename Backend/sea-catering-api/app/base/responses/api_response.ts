import { DateTime } from 'luxon'

export interface ApiResponseData {
  success: boolean
  status_code: number
  message: string
  timestamp: string
  data?: any
  error?: {
    code: string
    details: any[]
  }
}

export class ApiResponse {
  static success(
    data: any = null,
    message: string = 'Operation successful',
    statusCode: number = 200
  ): ApiResponseData {
    return {
      success: true,
      status_code: statusCode,
      message,
      timestamp: DateTime.now().toISO(),
      data,
    }
  }

  static error(
    message: string = 'Bad Request',
    statusCode: number = 400,
    errorCode: string = 'BAD_REQUEST',
    details: any[] = []
  ): ApiResponseData {
    return {
      success: false,
      status_code: statusCode,
      message,
      timestamp: DateTime.now().toISO(),
      error: {
        code: errorCode,
        details,
      },
    }
  }

  static validationError(details: any[]): ApiResponseData {
    return this.error('Validation error', 400, 'VALIDATION_ERROR', details)
  }

  static unauthorized(message: string = 'Unauthorized'): ApiResponseData {
    return this.error(message, 401, 'UNAUTHORIZED')
  }

  static forbidden(message: string = 'Forbidden'): ApiResponseData {
    return this.error(message, 403, 'FORBIDDEN')
  }

  static notFound(message: string = 'Resource not found'): ApiResponseData {
    return this.error(message, 404, 'NOT_FOUND')
  }

  static serverError(message: string = 'Internal server error'): ApiResponseData {
    return this.error(message, 500, 'SERVER_ERROR')
  }
}
