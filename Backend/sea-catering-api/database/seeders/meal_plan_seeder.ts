import { BaseSeeder } from '@adonisjs/lucid/seeders'
import MealPlan from '#models/meal_plan'

export default class MealPlanSeeder extends BaseSeeder {
  async run() {
    await MealPlan.createMany([
      {
        name: 'Diet Plan',
        price: 30000.0,
        description: 'Low-calorie meals designed for weight loss.',
        imageUrl: 'https://storage.googleapis.com/gansdoctor_skripsi/sea-catering/diet-plans-1.jpg',
        isActive: true,
      },
      {
        name: 'Protein Plan',
        price: 40000.0,
        description: 'High-protein meals for muscle gain and satiety.',
        imageUrl: 'https://storage.googleapis.com/gansdoctor_skripsi/sea-catering/protein-plan.jpg',
        isActive: true,
      },
      {
        name: 'Royal Plan',
        price: 60000.0,
        description: 'Premium gourmet meals with diverse ingredients.',
        imageUrl: 'https://storage.googleapis.com/gansdoctor_skripsi/sea-catering/royal.jpg',
        isActive: true,
      },
    ])
  }
}
