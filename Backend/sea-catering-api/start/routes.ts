/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Version 1 API routes
router
  .group(() => {
    // Auth routes
    router
      .group(() => {
        router.post('/register', '#controllers/auth_controller.register')
        router.post('/login', '#controllers/auth_controller.login')
        router.post('/logout', '#controllers/auth_controller.logout').use(middleware.auth())
      })
      .prefix('/auth')

    // Meal plans routes
    router
      .group(() => {
        router.get('/', '#controllers/meal_plans_controller.index')
        router.get('/:id', '#controllers/meal_plans_controller.show')
      })
      .prefix('/meal-plans')

    // Testimonials Routes
    router
      .group(() => {
        router.post('/', '#controllers/testimonials_controller.store')
        router.get('/', '#controllers/testimonials_controller.index')
      })
      .prefix('/testimonials')
    // User Subscriptions Routes
    router
      .group(() => {
        router.post('/', '#controllers/subscriptions_controller.store')
        router.get(
          '/me/subscriptions',
          '#controllers/subscriptions_controller.getUserSubscriptions'
        )
        router.put('/:id/pause', '#controllers/subscriptions_controller.pause')
        router.delete('/:id', '#controllers/subscriptions_controller.cancel')
      })
      .prefix('/subscriptions')
      .use(middleware.auth())
  })
  .prefix('/api/v1')
