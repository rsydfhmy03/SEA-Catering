import vine from '@vinejs/vine'

const mealTypes = ['Breakfast', 'Lunch', 'Dinner']
const deliveryDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const subscriptionValidator = vine.compile(
  vine.object({
    plan_id: vine.string().uuid(),
    meal_types: vine.array(vine.enum(mealTypes)).minLength(1),
    delivery_days: vine.array(vine.enum(deliveryDays)).minLength(1),
    allergies: vine.string().optional(),
    phone_number: vine.string().regex(/^(\+62|62|0)8[1-9][0-9]{6,9}$/),
  })
)

export const pauseSubscriptionValidator = vine.compile(
  vine.object({
    pause_start_date: vine.date({ formats: ['YYYY-MM-DD'] }),
    pause_end_date: vine.date({ formats: ['YYYY-MM-DD'] }),
  })
)
