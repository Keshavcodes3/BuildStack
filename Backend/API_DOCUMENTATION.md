# BuildStack API Documentation

Complete API reference for the BuildStack backend. All endpoints are prefixed with `/api/users`.

---

## Table of Contents

- [Authentication](#authentication)
- [Base URL](#base-url)
- [Status Codes](#status-codes)
- [User Endpoints](#user-endpoints)
  - [Register](#register)
  - [Login](#login)
  - [Logout](#logout)
  - [Get Profile](#get-profile)
  - [Update Profile](#update-profile)
- [Post/Project Endpoints](#postproject-endpoints)
  - [Create Project](#create-project)
  - [Get Projects Feed](#get-projects-feed)
  - [Get User Projects](#get-user-projects)
  - [Get Single Project](#get-single-project)

---

## Authentication

### Protected Routes
Endpoints marked as **Protected** require a valid JWT token in the `Authorization` header or as a cookie.

**Cookie-based Authentication (Default):**
```
Cookie: token=<jwt_token>
```

**Bearer Token Authentication:**
```
Authorization: Bearer <jwt_token>
```

### JWT Token
- **Expiration:** 7 days
- **Secret:** Stored in `process.env.JWT_SECRET`
- **Payload includes:** `_id`, `email`, `userName`

---

## Base URL

```
http://localhost:<PORT>/api/users
```

---

## Status Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `201` | Created (resource successfully created) |
| `400` | Bad Request (validation error) |
| `401` | Unauthorized (invalid credentials or token) |
| `404` | Not Found (resource doesn't exist) |
| `500` | Internal Server Error |

---

## User Endpoints

---

### Register

Create a new user account.

**Request:**
```
POST /register
```

**Access:** Public

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "userName": "string (required)",
  "password": "string (required)",
  "email": "string (required, unique)",
  "avatar": "string (optional)",
  "gender": "string (optional)",
  "bio": "string (optional)"
}
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "success": true,
  "error": null,
  "user": {
    "_id": "string",
    "userName": "string",
    "email": "string",
    "avatar": "string",
    "gender": "string",
    "bio": "string"
  },
  "token": "string (JWT)"
}
```

**Error Response (401):**
```json
{
  "message": "User already Exist",
  "error": "Email already in use",
  "success": false
}
```

**Error Response (400/500):**
```json
{
  "message": "Internal server error",
  "success": false,
  "error": "string (error details)"
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "johndoe",
    "password": "SecurePass123",
    "email": "john@example.com",
    "avatar": "https://avatar.url",
    "gender": "Male",
    "bio": "Software Developer"
  }'
```

---

### Login

Authenticate a user and receive a JWT token.

**Request:**
```
POST /login
```

**Access:** Public

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "userName": "string (required)",
  "password": "string (required)"
}
```

**Response (200):**
```json
{
  "message": "User logged in successfully",
  "success": true,
  "error": null,
  "user": {
    "_id": "string",
    "userName": "string",
    "email": "string",
    "avatar": "string",
    "gender": "string",
    "bio": "string"
  }
}
```

**Set-Cookie Header:**
```
Set-Cookie: token=<jwt_token>; HttpOnly; Secure; SameSite=Strict; Max-Age=604800000
```

**Error Response (404):**
```json
{
  "message": "User not found",
  "error": "User don't exist with this email",
  "success": false
}
```

**Error Response (401):**
```json
{
  "message": "Unauthorized access",
  "error": "Password mismatched",
  "success": false
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "johndoe",
    "password": "SecurePass123"
  }' \
  -c cookies.txt
```

---

### Logout

Invalidate the current JWT token and clear the session.

**Request:**
```
POST /logout
```

**Access:** Protected ✅ (requires authentication)

**Headers:**
```
Authorization: Bearer <jwt_token>
OR
Cookie: token=<jwt_token>
```

**Request Body:**
```json
{}
```

**Response (200):**
```json
{
  "message": "User logged out successfully",
  "success": true,
  "error": null
}
```

**Error Response (404):**
```json
{
  "message": "User not found",
  "success": false,
  "error": "No user exist"
}
```

**Error Response (500):**
```json
{
  "message": "Internal server error",
  "success": false,
  "error": "string (error details)"
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:5000/api/users/logout \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json"
```

---

### Get Profile

Retrieve the authenticated user's profile and their posts.

**Request:**
```
GET /getProfile
```

**Access:** Protected ✅ (requires authentication)

**Headers:**
```
Authorization: Bearer <jwt_token>
OR
Cookie: token=<jwt_token>
```

**Request Body:**
```json
{}
```

**Response (200):**
```json
{
  "message": "user profile fetched successfully",
  "user": {
    "_id": "string",
    "userName": "string",
    "email": "string",
    "avatar": "string",
    "gender": "string",
    "bio": "string"
  },
  "post": []
}
```

**Error Response (404):**
```json
{
  "message": "No user found",
  "error": "No user exist with the id",
  "success": false
}
```

**Error Response (400):**
```json
{
  "message": "No post found by the user",
  "error": "no posts",
  "success": false
}
```

**Error Response (500):**
```json
{
  "message": "Internal server error",
  "success": false,
  "error": "string (error details)"
}
```

**Example cURL:**
```bash
curl -X GET http://localhost:5000/api/users/getProfile \
  -H "Authorization: Bearer <jwt_token>" \
  -b cookies.txt
```

---

### Update Profile

Update the authenticated user's profile information.

**Request:**
```
PATCH /updateProfile
```

**Access:** Protected ✅ (requires authentication)

**Headers:**
```
Authorization: Bearer <jwt_token>
OR
Cookie: token=<jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "userName": "string (optional)",
  "email": "string (optional)",
  "bio": "string (optional)",
  "newPassword": "string (optional)",
  "oldPassword": "string (required if changing password)"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "success": true,
  "user": {
    "_id": "string",
    "userName": "string",
    "email": "string",
    "avatar": "string",
    "gender": "string",
    "bio": "string"
  }
}
```

**Error Response (404):**
```json
{
  "message": "No user found",
  "error": "No user exist with the id",
  "success": false
}
```

**Error Response (401):**
```json
{
  "message": "Invalid old password",
  "success": false
}
```

**Error Response (500):**
```json
{
  "message": "Internal server error",
  "success": false,
  "error": "string (error details)"
}
```

**Example cURL (Update Email):**
```bash
curl -X PATCH http://localhost:5000/api/users/updateProfile \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newemail@example.com"
  }'
```

**Example cURL (Change Password):**
```bash
curl -X PATCH http://localhost:5000/api/users/updateProfile \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "oldPassword": "CurrentPass123",
    "newPassword": "NewSecurePass123"
  }'
```

---

## Post/Project Endpoints

---

### Create Project

Create a new post/project with optional media files.

**Request:**
```
POST /createProject
```

**Access:** Protected ✅ (requires authentication)

**Headers:**
```
Authorization: Bearer <jwt_token>
OR
Cookie: token=<jwt_token>
Content-Type: multipart/form-data
```

**Request Body (form-data):**
```
caption: string (required if no media)
media: file array (optional - multiple files allowed)
tags: string (optional - comma-separated or JSON array)
visibility: string (optional - "public" or "private", default: "public")
```

**Response (201):**
```json
{
  "message": "Post created successfully",
  "success": true,
  "post": {
    "_id": "string",
    "caption": "string",
    "media": ["array of media URLs"],
    "tags": ["array of tags"],
    "visibility": "string",
    "author": "string (user ID)",
    "createdAt": "ISO date string"
  }
}
```

**Error Response (400):**
```json
{
  "message": "Post must have caption or media",
  "success": false
}
```

**Error Response (500):**
```json
{
  "message": "Internal server error",
  "success": false,
  "error": "string (error details)"
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:5000/api/posts/createProject \
  -H "Authorization: Bearer <jwt_token>" \
  -F "caption=My awesome project" \
  -F "tags=javascript,nodejs" \
  -F "visibility=public" \
  -F "media=@/path/to/image1.jpg" \
  -F "media=@/path/to/image2.jpg"
```

---

### Get Projects Feed

Retrieve all public projects from all users.

**Request:**
```
GET /getProjects
```

**Access:** Protected ✅ (requires authentication)

**Headers:**
```
Authorization: Bearer <jwt_token>
OR
Cookie: token=<jwt_token>
```

**Query Parameters:**
```
None
```

**Response (200):**
```json
{
  "message": "Feed fetched successfully",
  "success": true,
  "posts": [
    {
      "_id": "string",
      "caption": "string",
      "media": ["array of media URLs"],
      "tags": ["array of tags"],
      "visibility": "string",
      "author": {
        "_id": "string",
        "userName": "string",
        "avatar": "string"
      },
      "createdAt": "ISO date string"
    }
  ]
}
```

**Error Response (404):**
```json
{
  "message": "User not found",
  "success": false,
  "error": "User not found"
}
```

**Error Response (500):**
```json
{
  "message": "Internal server error",
  "success": false,
  "error": "string (error details)"
}
```

**Example cURL:**
```bash
curl -X GET http://localhost:5000/api/posts/getProjects \
  -H "Authorization: Bearer <jwt_token>"
```

---

### Get User Projects

Retrieve all projects created by a specific user.

**Request:**
```
GET /projects/:id/projects
```

**Access:** Protected ✅ (requires authentication)

**Headers:**
```
Authorization: Bearer <jwt_token>
OR
Cookie: token=<jwt_token>
```

**Request Parameters:**
```
id: string (user ID)
```

**Response (200):**
```json
{
  "message": "All posts fetched successfully",
  "success": true,
  "posts": [
    {
      "_id": "string",
      "caption": "string",
      "media": ["array of media URLs"],
      "tags": ["array of tags"],
      "visibility": "string",
      "author": "string (user ID)",
      "createdAt": "ISO date string"
    }
  ]
}
```

**Error Response (404):**
```json
{
  "message": "No user found",
  "error": "The requested user do not exist in our platform",
  "success": false
}
```

**Error Response (200 - No posts):**
```json
{
  "message": "No post found of the requested user",
  "error": "Zero post found",
  "success": false
}
```

**Error Response (500):**
```json
{
  "message": "Internal server error",
  "success": false,
  "error": "string (error details)"
}
```

**Example cURL:**
```bash
curl -X GET http://localhost:5000/api/posts/projects/604c3d9e8f9c2b001a2b3c d/projects \
  -H "Authorization: Bearer <jwt_token>"
```

---

### Get Single Project

Retrieve detailed information about a specific project.

**Request:**
```
GET /projects/:postId
```

**Access:** Protected ✅ (requires authentication)

**Headers:**
```
Authorization: Bearer <jwt_token>
OR
Cookie: token=<jwt_token>
```

**Request Parameters:**
```
postId: string (post/project ID)
```

**Response (200):**
```json
{
  "message": "Post details fetched successfully",
  "success": true,
  "post": {
    "_id": "string",
    "caption": "string",
    "media": ["array of media URLs"],
    "tags": ["array of tags"],
    "visibility": "string",
    "author": {
      "_id": "string",
      "userName": "string",
      "avatar": "string"
    },
    "createdAt": "ISO date string",
    "updatedAt": "ISO date string"
  }
}
```

**Error Response (404):**
```json
{
  "message": "User not found",
  "success": false,
  "error": "User not found"
}
```

**Error Response (500):**
```json
{
  "message": "Internal server error",
  "success": false,
  "error": "string (error details)"
}
```

**Example cURL:**
```bash
curl -X GET http://localhost:5000/api/posts/projects/604c3d9e8f9c2b001a2b3c d \
  -H "Authorization: Bearer <jwt_token>"
```

---

## Quick Reference

| Method | Endpoint | Access | Purpose |
|--------|----------|--------|---------|
| `POST` | `/register` | Public | Create new user |
| `POST` | `/login` | Public | Authenticate user |
| `POST` | `/logout` | Protected | End session |
| `GET` | `/getProfile` | Protected | Fetch user profile |
| `PATCH` | `/updateProfile` | Protected | Update user info |
| `POST` | `/createProject` | Protected | Create new post with media |
| `GET` | `/getProjects` | Protected | Get all public projects feed |
| `GET` | `/projects/:id/projects` | Protected | Get user's projects |
| `GET` | `/projects/:postId` | Protected | Get single project details |

---

## Contributing Guidelines

### Adding New Endpoints

1. **Create Controller Function** in `src/Controllers/user.controller.js`
   - Add JSDoc with full documentation
   - Include endpoint, description, request/response, and error details

2. **Add Route** in `src/Routes/user.routes.js`
   - Document with middleware and route details

3. **Update This Documentation**
   - Follow the endpoint format above
   - Include examples and all response codes

### Code Standards

- Use async/await for asynchronous operations
- Always remove password from user objects before sending responses
- Include descriptive error messages
- Validate input using middleware before reaching controller
- Use appropriate HTTP status codes

### Testing

Test your endpoints using:
- **cURL** (see examples above)
- **Postman** - Import and test with provided examples
- **Insomnia** - Alternative REST client

---

## Environment Variables

Create a `.env` file in the Backend directory:

```env
JWT_SECRET=your_secret_key_here
MONGODB_URI=your_mongodb_connection_url
PORT=5000
NODE_ENV=development
```

---

## Need Help?

- Check controller JSDoc for implementation details
- Review middleware files for validation logic
- Refer to model files in `src/Models/` for schema structure
