import vine from '@vinejs/vine'

export const authValidator = vine.compile(
  vine.object({
    full_name: vine.string().trim().minLength(2).maxLength(100),
    email: vine.string().email().normalizeEmail(),
    password: vine
      .string()
      .minLength(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}/),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(1),
  })
)
