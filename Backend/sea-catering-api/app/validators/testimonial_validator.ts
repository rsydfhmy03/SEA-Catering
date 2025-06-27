import vine from '@vinejs/vine'

export const testimonialValidator = vine.compile(
  vine.object({
    customer_name: vine.string().trim().minLength(2).maxLength(100),
    review_message: vine.string().trim().minLength(10).maxLength(1000),
    rating: vine.number().min(1).max(5),
  })
)
