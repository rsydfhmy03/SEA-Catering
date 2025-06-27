import BaseService from '#base/services/base_service'
import UserRepository from '#app/repositories/user_repository'
import hash from '@adonisjs/core/services/hash'
import jwt from 'jsonwebtoken'
import env from '#start/env'

export default class AuthService extends BaseService {
  constructor() {
    super(new UserRepository())
  }

  async register(data: { full_name: string; email: string; password: string }) {
    // Check if email already exists
    const existingUser = await this.repository.findByEmail(data.email)
    if (existingUser) {
      throw new Error('Email already registered')
    }

    // Hash password
    const hashedPassword = await hash.make(data.password)

    // Create user
    const user = await this.repository.create({
      fullName: data.full_name,
      email: data.email,
      password: hashedPassword,
    })

    return {
      id: user.id,
      email: user.email,
    }
  }

  async login(email: string, password: string) {
    const user = await this.repository.findByEmail(email)
    if (!user) {
      throw new Error('Invalid credentials')
    }

    const isValidPassword = await hash.verify(user.password, password)
    if (!isValidPassword) {
      throw new Error('Invalid credentials')
    }

    // Generate JWT token
    const jwtSecret = env.get('JWT_SECRET')
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables')
    }

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    }

    const expiresIn = env.get('JWT_EXPIRES_IN', '7d')
    const token = jwt.sign(payload, jwtSecret, { expiresIn } as jwt.SignOptions)

    return {
      token,
      user: {
        id: user.id,
        full_name: user.fullName,
        email: user.email,
        role: user.role,
      },
    }
  }

  verifyToken(token: string) {
    const jwtSecret = env.get('JWT_SECRET')
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables')
    }

    try {
      return jwt.verify(token, jwtSecret)
    } catch (error) {
      throw new Error('Invalid token')
    }
  }
}
