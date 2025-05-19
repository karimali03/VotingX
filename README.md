# VotingX
# VotingX

# VotingX API Documentation

## Authentication

All endpoints except authentication endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Authentication Endpoints

### Sign In
```http
POST /api/v1/auth/signin
Content-Type: application/json

Request Body:
{
    "email": "user@example.com",
    "password": "yourpassword"
}

Response 200:
{
    "message": "Sign in successful",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "user": {
            "id": 1,
            "email": "user@example.com",
            "first_name": "John",
            "last_name": "Doe",
            "role": "user",
            ...
        }
    }
}
```

### Sign Up
```http
POST /api/v1/auth/signup
Content-Type: application/json

Request Body:
{
    "first_name": "John",
    "last_name": "Doe",
    "email": "user@example.com",
    "password": "yourpassword",
    "confirm_password": "yourpassword",
    "phone": "+1234567890",
    "gender": "male",
    "birth_date": "1990-01-01"
}

Response 201:
{
    "message": "User registered successfully",
    "data": {
        "id": 1,
        "email": "user@example.com",
        "first_name": "John",
        "last_name": "Doe",
        "role": "user"
    }
}
```

### Forgot Password
```http
POST /api/v1/auth/forgot-password
Content-Type: application/json

Request Body:
{
    "email": "user@example.com"
}

Response 200:
{
    "message": "Password reset email sent successfully",
    "data": null
}
```

### Reset Password
```http
POST /api/v1/auth/reset-password
Content-Type: application/json

Request Body:
{
    "token": "reset_token_received_via_email",
    "new_password": "newpassword",
    "confirm_password": "newpassword"
}

Response 200:
{
    "message": "Password reset successful",
    "data": null
}
```

### Change Password (Authenticated)
```http
POST /api/v1/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
    "current_password": "currentpassword",
    "new_password": "newpassword",
    "confirm_password": "newpassword"
}

Response 200:
{
    "message": "Password changed successfully",
    "data": null
}
```

## User Management Endpoints

### Get All Users (Admin Only)
```http
GET /api/v1/users
Authorization: Bearer <token>

Response 200:
{
    "message": "Users retrieved successfully",
    "data": [
        {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com",
            "role": "user",
            ...
        }
    ]
}
```

### Get User by ID
```http
GET /api/v1/users/:id
Authorization: Bearer <token>

Note: Users can only view their own profile unless they are admin

Response 200:
{
    "message": "User found",
    "data": {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com",
        ...
    }
}
```

### Update User Profile
```http
PATCH /api/v1/users/:id/profile
Authorization: Bearer <token>
Content-Type: application/json

Note: Users can only update their own profile unless they are admin

Request Body:
{
    "first_name": "John",
    "last_name": "Doe",
    "middle_name": "Smith",
    "gender": "male",
    "birth_date": "1990-01-01",
    "phone": "+1234567890",
    "current_address": "123 Main St"
}

Response 200:
{
    "message": "User profile updated successfully",
    "data": {
        "id": 1,
        "first_name": "John",
        ...
    }
}
```

### Upload Profile Photo
```http
POST /api/v1/users/:id/profile/photo
Authorization: Bearer <token>
Content-Type: multipart/form-data

Note: Users can only upload their own photo unless they are admin

Request Body:
- profile_photo: (file) - Image file (JPEG, PNG, or GIF, max 5MB)

Response 200:
{
    "message": "Profile photo uploaded successfully",
    "data": {
        "user": {
            "id": 1,
            "profile_image": "/uploads/profiles/1_timestamp.jpg",
            ...
        },
        "photo_url": "/uploads/profiles/1_timestamp.jpg"
    }
}
```

### Delete User (Admin Only)
```http
DELETE /api/v1/users/:id
Authorization: Bearer <token>

Response 200:
{
    "message": "User deleted successfully",
    "data": {
        "id": 1,
        "first_name": "John",
        ...
    }
}
```

## Location Management Endpoints

### Countries

#### Get All Countries
```http
GET /api/v1/location/countries

Response 200:
{
    "message": "Countries retrieved successfully",
    "data": [
        {
            "code": "EGY",
            "name": "Egypt"
        },
        ...
    ]
}
```

#### Get Country by Code
```http
GET /api/v1/location/countries/:code

Response 200:
{
    "message": "Country found",
    "data": {
        "code": "EGY",
        "name": "Egypt"
    }
}
```

### Governorates

#### Get All Governorates
```http
GET /api/v1/location/governorates

Response 200:
{
    "message": "Governorates retrieved successfully",
    "data": [
        {
            "id": 1,
            "name": "Cairo",
            "country_code": "EGY"
        },
        ...
    ]
}
```

#### Get Governorates by Country
```http
GET /api/v1/location/countries/:countryCode/governorates

Response 200:
{
    "message": "Governorates retrieved successfully",
    "data": [
        {
            "id": 1,
            "name": "Cairo",
            "country_code": "EGY"
        },
        ...
    ]
}
```

### Cities

#### Get All Cities
```http
GET /api/v1/location/cities

Response 200:
{
    "message": "Cities retrieved successfully",
    "data": [
        {
            "id": 1,
            "name": "Nasr City",
            "states_governorates_id": 1
        },
        ...
    ]
}
```

#### Get Cities by Governorate
```http
GET /api/v1/location/governorates/:governorateId/cities

Response 200:
{
    "message": "Cities retrieved successfully",
    "data": [
        {
            "id": 1,
            "name": "Nasr City",
            "states_governorates_id": 1
        },
        ...
    ]
}
```

### Districts

#### Get All Districts
```http
GET /api/v1/location/districts

Response 200:
{
    "message": "Districts retrieved successfully",
    "data": [
        {
            "id": 1,
            "name": "District 1",
            "city_id": 1
        },
        ...
    ]
}
```

#### Get Districts by City
```http
GET /api/v1/location/cities/:cityId/districts

Response 200:
{
    "message": "Districts retrieved successfully",
    "data": [
        {
            "id": 1,
            "name": "District 1",
            "city_id": 1
        },
        ...
    ]
}
```

## User Location Management (Locates)

### Link User with District
```http
POST /api/v1/locates/link
Content-Type: application/json

Request Body:
{
    "userId": 1,
    "districtId": 123,
    "nationalId": "ABC123456"
}

Response 201:
{
    "message": "User linked to district successfully",
    "data": {
        "user_id": 1,
        "district_id": 123,
        "national_id": "ABC123456"
    }
}
```

### Get User-District Link
```http
GET /api/v1/locates/link/:userId/:districtId

Response 200:
{
    "message": "User district link retrieved successfully",
    "data": {
        "user_id": 1,
        "district_id": 123,
        "national_id": "ABC123456",
        "district": {
            "id": 123,
            "name": "District 1",
            ...
        }
    }
}
```

### Update User-District Link
```http
PUT /api/v1/locates/link/:userId/:oldDistrictId
Content-Type: application/json

Request Body:
{
    "newDistrictId": 456,
    "nationalId": "ABC123456"
}

Response 200:
{
    "message": "User district link updated successfully",
    "data": {
        "user_id": 1,
        "district_id": 456,
        "national_id": "ABC123456"
    }
}
```

### Delete User-District Link
```http
DELETE /api/v1/locates/link/:userId/:districtId

Response 200:
{
    "message": "User district link removed successfully",
    "data": {
        "user_id": 1,
        "district_id": 123,
        "national_id": "ABC123456"
    }
}
```

## Error Responses

### Authentication Errors
```http
401 Unauthorized:
{
    "message": "No token provided",
    "data": null
}

401 Unauthorized:
{
    "message": "Invalid token",
    "data": null
}
```

### Authorization Errors
```http
403 Forbidden:
{
    "message": "Access denied - Admin rights required",
    "data": null
}

403 Forbidden:
{
    "message": "Access denied - You can only update your own profile",
    "data": null
}
```

### Not Found Errors
```http
404 Not Found:
{
    "message": "User not found",
    "data": null
}

404 Not Found:
{
    "message": "District not found",
    "data": null
}
```

### Validation Errors
```http
400 Bad Request:
{
    "message": "No file uploaded",
    "data": null
}

400 Bad Request:
{
    "message": "Invalid file type. Only JPEG, PNG and GIF images are allowed.",
    "data": null
}
```
