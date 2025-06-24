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

// Auth Routes
router
  .group(() => {
    router.post('/register', '#controllers/auth_controller.register')
    router.post('/login', '#controllers/auth_controller.login')
    router.post('/logout', '#controllers/auth_controller.logout').use(middleware.auth())
  })
  .prefix('/auth')
  .prefix('/api/v1')
