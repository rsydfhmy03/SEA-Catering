# API Contract - SEA Catering

API ini menyediakan akses terprogram ke fungsionalitas aplikasi SEA Catering, meliputi manajemen pengguna, rencana makan, testimonial, dan langganan.

**Base URL:** `https://api.seacatering.com/v1` (Contoh)

---

## Standard Response Format

Semua respons API akan mengikuti format standar berikut:

### Success Response Example

```json
{
    "success": true,
    "status_code": 200,
    "message": "Operation successful",
    "timestamp": "2025-06-18T08:30:00.000Z",
    "data": {
        // Resource-specific data
    }
}
```

### Error Response Example

```json
{
    "success": false,
    "status_code": 400,
    "message": "Bad Request",
    "timestamp": "2025-06-18T08:30:00.000Z",
    "error": {
        "code": "VALIDATION_ERROR",
        "details": [
            {
                "field": "email",
                "message": "Email is invalid"
            },
            {
                "field": "password",
                "message": "Password must be at least 8 characters long"
            }
        ]
    }
}
```

**Status Codes:**

* `2xx`: Success (e.g., 200 OK, 201 Created, 204 No Content)
* `4xx`: Client Error (e.g., 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found)
* `5xx`: Server Error (e.g., 500 Internal Server Error)

---

## Authentication

Authentication is handled via JWT (JSON Web Tokens). After successful login, a token will be returned. This token must be included in the `Authorization` header of subsequent requests as a Bearer token.

**Header Example:** `Authorization: Bearer <your_jwt_token>`

---

## 1. User Management (Level 4: Securing SEA)

### 1.1. Register User

* **Method:** `POST`
* **Endpoint:** `/auth/register`
* **Description:** Allows a new user to register an account.
* **Request Body:**
    ```json
    {
        "full_name": "John Doe",
        "email": "john.doe@example.com",
        "password": "StrongPassword123!" // Min. 8 chars, uppercase, lowercase, number, special char
    }
    ```
* **Response (Success - 201 Created):**
    ```json
    {
        "success": true,
        "status_code": 201,
        "message": "User registered successfully.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "data": {
            "id": "uuid-of-new-user",
            "email": "john.doe@example.com"
        }
    }
    ```
* **Response (Error - 400 Bad Request):**
    ```json
    {
        "success": false,
        "status_code": 400,
        "message": "Registration failed.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "error": {
            "code": "VALIDATION_ERROR",
            "details": [
                {"field": "email", "message": "Email already registered."},
                {"field": "password", "message": "Password does not meet requirements."}
            ]
        }
    }
    ```

### 1.2. Login User

* **Method:** `POST`
* **Endpoint:** `/auth/login`
* **Description:** Authenticates a user and returns a JWT.
* **Request Body:**
    ```json
    {
        "email": "john.doe@example.com",
        "password": "StrongPassword123!"
    }
    ```
* **Response (Success - 200 OK):**
    ```json
    {
        "success": true,
        "status_code": 200,
        "message": "Login successful.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "data": {
            "token": "your.jwt.token.here",
            "user": {
                "id": "uuid-of-user",
                "full_name": "John Doe",
                "email": "john.doe@example.com",
                "role": "user" // or 'admin'
            }
        }
    }
    ```
* **Response (Error - 401 Unauthorized):**
    ```json
    {
        "success": false,
        "status_code": 401,
        "message": "Invalid credentials.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "error": {
            "code": "UNAUTHORIZED",
            "details": []
        }
    }
    ```

### 1.3. Logout User

* **Method:** `POST`
* **Endpoint:** `/auth/logout`
* **Description:** Invalidates the current user session/token.
* **Authorization:** Required (Bearer Token)
* **Request Body:** None
* **Response (Success - 200 OK):**
    ```json
    {
        "success": true,
        "status_code": 200,
        "message": "Logout successful.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "data": null
    }
    ```
* **Response (Error - 401 Unauthorized):**
    ```json
    {
        "success": false,
        "status_code": 401,
        "message": "Unauthorized. Please login.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "error": {
            "code": "UNAUTHORIZED",
            "details": []
        }
    }
    ```

---

## 2. Meal Plans (Level 2: Making It Interactive)

### 2.1. Get All Meal Plans

* **Method:** `GET`
* **Endpoint:** `/meal-plans`
* **Description:** Retrieves a list of all available meal plans.
* **Authorization:** Optional (Public access)
* **Request Body:** None
* **Response (Success - 200 OK):**
    ```json
    {
        "success": true,
        "status_code": 200,
        "message": "Meal plans retrieved successfully.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "data": [
            {
                "id": "uuid-plan-1",
                "name": "Diet Plan",
                "price": 30000.00,
                "description": "Low-calorie meals designed for weight loss.",
                "image_url": "https://example.com/diet-plan.jpg"
            },
            {
                "id": "uuid-plan-2",
                "name": "Protein Plan",
                "price": 40000.00,
                "description": "High-protein meals for muscle gain and satiety.",
                "image_url": "https://example.com/protein-plan.jpg"
            },
            {
                "id": "uuid-plan-3",
                "name": "Royal Plan",
                "price": 60000.00,
                "description": "Premium gourmet meals with diverse ingredients.",
                "image_url": "https://example.com/royal-plan.jpg"
            }
        ]
    }
    ```
* **Response (Error - 500 Internal Server Error):**
    ```json
    {
        "success": false,
        "status_code": 500,
        "message": "Internal server error.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "error": {
            "code": "SERVER_ERROR",
            "details": []
        }
    }
    ```

### 2.2. Get Meal Plan by ID

* **Method:** `GET`
* **Endpoint:** `/meal-plans/{id}`
* **Description:** Retrieves details of a specific meal plan.
* **Authorization:** Optional (Public access)
* **Path Parameters:**
    * `id` (string, UUID): The ID of the meal plan.
* **Request Body:** None
* **Response (Success - 200 OK):**
    ```json
    {
        "success": true,
        "status_code": 200,
        "message": "Meal plan retrieved successfully.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "data": {
            "id": "uuid-plan-1",
            "name": "Diet Plan",
            "price": 30000.00,
            "description": "Low-calorie meals designed for weight loss.",
            "image_url": "https://example.com/diet-plan.jpg"
        }
    }
    ```
* **Response (Error - 404 Not Found):**
    ```json
    {
        "success": false,
        "status_code": 404,
        "message": "Meal plan not found.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "error": {
            "code": "NOT_FOUND",
            "details": []
        }
    }
    ```

---

## 3. Testimonials (Level 2: Making It Interactive)

### 3.1. Submit New Testimonial

* **Method:** `POST`
* **Endpoint:** `/testimonials`
* **Description:** Allows a user to submit a new testimonial. Testimonials will be in 'pending' status by default.
* **Authorization:** Optional (Can be submitted by anyone, or optionally restricted to logged-in users if decided later)
* **Request Body:**
    ```json
    {
        "customer_name": "Jane Smith",
        "review_message": "SEA Catering has transformed my eating habits!",
        "rating": 5 // Integer between 1 and 5
    }
    ```
* **Response (Success - 201 Created):**
    ```json
    {
        "success": true,
        "status_code": 201,
        "message": "Testimonial submitted successfully, awaiting approval.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "data": {
            "id": "uuid-testimonial-1",
            "customer_name": "Jane Smith",
            "review_message": "SEA Catering has transformed my eating habits!",
            "rating": 5,
            "status": "pending"
        }
    }
    ```
* **Response (Error - 400 Bad Request):**
    ```json
    {
        "success": false,
        "status_code": 400,
        "message": "Validation error.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "error": {
            "code": "VALIDATION_ERROR",
            "details": [
                {"field": "rating", "message": "Rating must be between 1 and 5."}
            ]
        }
    }
    ```

### 3.2. Get Approved Testimonials

* **Method:** `GET`
* **Endpoint:** `/testimonials`
* **Description:** Retrieves a list of approved testimonials for public display.
* **Authorization:** Optional (Public access)
* **Query Parameters:**
    * `limit` (integer, optional): Maximum number of testimonials to return.
    * `offset` (integer, optional): Number of testimonials to skip.
* **Request Body:** None
* **Response (Success - 200 OK):**
    ```json
    {
        "success": true,
        "status_code": 200,
        "message": "Testimonials retrieved successfully.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "data": [
            {
                "id": "uuid-testimonial-approved-1",
                "customer_name": "Sarah Lee",
                "review_message": "Absolutely love the customizable options!",
                "rating": 5,
                "status": "approved"
            },
            {
                "id": "uuid-testimonial-approved-2",
                "customer_name": "Michael B.",
                "review_message": "Convenient and delicious meals.",
                "rating": 4,
                "status": "approved"
            }
        ]
    }
    ```

---

## 4. Subscriptions (Level 3: Building a Subscription System & Level 5: User Dashboard)

### 4.1. Create New Subscription

* **Method:** `POST`
* **Endpoint:** `/subscriptions`
* **Description:** Allows an authenticated user to subscribe to a meal plan.
* **Authorization:** Required (Bearer Token)
* **Request Body:**
    ```json
    {
        "plan_id": "uuid-plan-1", // ID of the selected meal plan
        "meal_types": ["Breakfast", "Lunch", "Dinner"], // Array of selected meal types
        "delivery_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], // Array of selected delivery days
        "allergies": "Peanuts, Shellfish", // Optional, comma-separated string
        "phone_number": "081234567890" // User's active phone number
    }
    ```
    [cite_start]**Note:** The backend calculates `total_price` based on the formula: `(Plan Price) x (Number of Meal Types Selected) x (Number of Delivery Days Selected) x 4.3`. [cite: 47]
* **Response (Success - 201 Created):**
    ```json
    {
        "success": true,
        "status_code": 201,
        "message": "Subscription created successfully.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "data": {
            "id": "uuid-subscription-1",
            "user_id": "uuid-of-user",
            "plan_id": "uuid-plan-1",
            "meal_types": ["Breakfast", "Lunch", "Dinner"],
            "delivery_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "allergies": "Peanuts, Shellfish",
            [cite_start]"total_price": 1720000.00, // Calculated by backend [cite: 47]
            "status": "active",
            "start_date": "2025-06-18",
            "end_date": "2025-07-18" // Example, typically for a month
        }
    }
    ```
* **Response (Error - 400 Bad Request):**
    ```json
    {
        "success": false,
        "status_code": 400,
        "message": "Subscription creation failed.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "error": {
            "code": "VALIDATION_ERROR",
            "details": [
                [cite_start]{"field": "meal_types", "message": "At least one meal type must be selected."}, [cite: 43]
                {"field": "phone_number", "message": "Invalid phone number format."}
            ]
        }
    }
    ```
* **Response (Error - 401 Unauthorized):**
    ```json
    {
        "success": false,
        "status_code": 401,
        "message": "Unauthorized. Please login to subscribe.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "error": {
            "code": "UNAUTHORIZED",
            "details": []
        }
    }
    ```

### 4.2. Get User's Active Subscriptions

* **Method:** `GET`
* **Endpoint:** `/users/me/subscriptions`
* **Description:** Retrieves all active subscriptions for the authenticated user.
* **Authorization:** Required (Bearer Token)
* **Request Body:** None
* **Response (Success - 200 OK):**
    ```json
    {
        "success": true,
        "status_code": 200,
        "message": "User subscriptions retrieved successfully.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "data": [
            {
                "id": "uuid-subscription-1",
                "plan_name": "Protein Plan",
                "meal_types": ["Breakfast", "Dinner"],
                "delivery_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "total_price": 1720000.00,
                "status": "active",
                "start_date": "2025-06-18",
                "end_date": "2025-07-18",
                "allergies": "Peanuts, Shellfish"
            }
            // ... more subscriptions
        ]
    }
    ```
* **Response (Error - 401 Unauthorized):**
    ```json
    {
        "success": false,
        "status_code": 401,
        "message": "Unauthorized. Please login.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "error": {
            "code": "UNAUTHORIZED",
            "details": []
        }
    }
    ```

### 4.3. Pause Subscription

* **Method:** `PUT`
* **Endpoint:** `/subscriptions/{id}/pause`
* [cite_start]**Description:** Allows an authenticated user to temporarily pause their subscription for a specified date range. [cite: 71, 72]
* **Authorization:** Required (Bearer Token)
* **Path Parameters:**
    * `id` (string, UUID): The ID of the subscription to pause.
* **Request Body:**
    ```json
    {
        "pause_start_date": "2025-07-01",
        "pause_end_date": "2025-07-15"
    }
    ```
* **Response (Success - 200 OK):**
    ```json
    {
        "success": true,
        "status_code": 200,
        "message": "Subscription paused successfully.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "data": {
            "id": "uuid-subscription-1",
            "status": "paused",
            "pause_start_date": "2025-07-01",
            "pause_end_date": "2025-07-15"
        }
    }
    ```
* **Response (Error - 400 Bad Request):**
    ```json
    {
        "success": false,
        "status_code": 400,
        "message": "Invalid pause date range.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "error": {
            "code": "VALIDATION_ERROR",
            "details": [
                {"field": "pause_end_date", "message": "End date must be after start date."}
            ]
        }
    }
    ```
* **Response (Error - 401 Unauthorized / 403 Forbidden):**
    ```json
    {
        "success": false,
        "status_code": 403,
        "message": "Forbidden. You can only pause your own subscriptions.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "error": {
            "code": "FORBIDDEN",
            "details": []
        }
    }
    ```

### 4.4. Cancel Subscription

* **Method:** `DELETE`
* **Endpoint:** `/subscriptions/{id}`
* [cite_start]**Description:** Allows an authenticated user to permanently cancel their subscription. [cite: 73]
* **Authorization:** Required (Bearer Token)
* **Path Parameters:**
    * `id` (string, UUID): The ID of the subscription to cancel.
* **Request Body:** None
* **Response (Success - 200 OK / 204 No Content):**
    ```json
    {
        "success": true,
        "status_code": 200,
        "message": "Subscription cancelled successfully.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "data": {
            "id": "uuid-subscription-1",
            "status": "cancelled"
        }
    }
    ```
* **Response (Error - 401 Unauthorized / 403 Forbidden):**
    ```json
    {
        "success": false,
        "status_code": 403,
        "message": "Forbidden. You can only cancel your own subscriptions.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "error": {
            "code": "FORBIDDEN",
            "details": []
        }
    }
    ```

---

## 5. Admin Dashboard (Level 5: User & Admin Dashboard)

### 5.1. Get Dashboard Metrics

* **Method:** `GET`
* **Endpoint:** `/admin/dashboard/metrics`
* [cite_start]**Description:** Retrieves key subscription metrics for the admin dashboard. [cite: 74]
* **Authorization:** Required (Bearer Token, Role: 'admin')
* **Query Parameters:**
    * [cite_start]`start_date` (string, Date 'YYYY-MM-DD', optional): Start date for data filtering. [cite: 75]
    * [cite_start]`end_date` (string, Date 'YYYY-MM-DD', optional): End date for data filtering. [cite: 75]
* **Request Body:** None
* **Response (Success - 200 OK):**
    ```json
    {
        "success": true,
        "status_code": 200,
        "message": "Dashboard metrics retrieved successfully.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "data": {
            [cite_start]"new_subscriptions": 150, // Total new subscriptions during selected period [cite: 76]
            [cite_start]"mrr": 55000000.00,       // Monthly Recurring Revenue from active subscriptions [cite: 77]
            [cite_start]"reactivations": 15,      // Number of subscriptions reactivated [cite: 78]
            [cite_start]"total_active_subscriptions": 1200 // Overall number of active subscriptions [cite: 78]
        }
    }
    ```
* **Response (Error - 401 Unauthorized / 403 Forbidden):**
    ```json
    {
        "success": false,
        "status_code": 403,
        "message": "Forbidden. Admin access required.",
        "timestamp": "2025-06-18T08:30:00.000Z",
        "error": {
            "code": "FORBIDDEN",
            "details": []
        }
    }
    ```

---

## Admin-specific Endpoints (Implicit from "Manage users and subscriptions" in Level 4 & 5)

[cite_start]Although not explicitly detailed, the requirement for admins to "manage users and subscriptions" [cite: 57] implies additional CRUD endpoints.

### 6.1. Get All Users (Admin Only)

* **Method:** `GET`
* **Endpoint:** `/admin/users`
* **Description:** Retrieves a list of all registered users.
* **Authorization:** Required (Bearer Token, Role: 'admin')
* **Response (Success - 200 OK):** (Array of user objects, similar to login response `user` data)

### 6.2. Get All Subscriptions (Admin Only)

* **Method:** `GET`
* **Endpoint:** `/admin/subscriptions`
* **Description:** Retrieves a list of all subscriptions (active, paused, cancelled).
* **Authorization:** Required (Bearer Token, Role: 'admin')
* **Response (Success - 200 OK):** (Array of subscription objects, similar to user's active subscriptions response)

### 6.3. Update User Role (Admin Only)

* **Method:** `PUT`
* **Endpoint:** `/admin/users/{id}/role`
* **Description:** Updates a user's role (e.g., from 'user' to 'admin').
* **Authorization:** Required (Bearer Token, Role: 'admin')
* **Request Body:** `{"role": "admin"}` or `{"role": "user"}`

### 6.4. Approve Testimonial (Admin Only)

* **Method:** `PUT`
* **Endpoint:** `/admin/testimonials/{id}/approve`
* **Description:** Changes the status of a pending testimonial to 'approved'.
* **Authorization:** Required (Bearer Token, Role: 'admin')
* **Response (Success - 200 OK):** (Updated testimonial object with status 'approved')

---