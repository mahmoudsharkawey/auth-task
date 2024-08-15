# API Documentation

## Overview

This API provides endpoints for user registration, login, and session management. It uses PostgreSQL to store user information and JSON Web Tokens (JWT) for authentication.

## Endpoints

### POST /users/register

Registers a new user with the provided email and password.

**Request Body**

* `email`: The user's email address (required)
* `password`: The user's password (required)

**Response**

* `201 Created`: User created successfully
* `400 Bad Request`: Invalid request data
* `409 Conflict`: Email address already in use

### POST /users/login

Logs in a user with the provided email and password.

**Request Body**

* `email`: The user's email address (required)
* `password`: The user's password (required)

**Response**

* `200 OK`: Login successful, JWT token returned
* `401 Unauthorized`: Invalid email or password
* `400 Bad Request`: Invalid request data

### GET /users/protected

A protected route that requires authentication.

**Request Headers**

* `Authorization`: The JWT token obtained from the login endpoint (required)

**Response**

* `200 OK`: Protected data returned
* `401 Unauthorized`: Invalid or missing JWT token
