import { NextResponse } from "next/server"
import {registerUser} from "@/lib/mongodb"
// Handle CORS for preflight requests
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function POST(request) {
  try {
    // Parse request body
    console.error("Inside the add Client")
    let requestBody
    try {
      requestBody = await request.json()
    } catch (parseError) {
      return NextResponse.json(
        {
          error: 'Invalid JSON',
          message: 'Request body must be valid JSON'
        },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          }
        }
      )
    }

    // Validate required fields
    if (!requestBody.firstName || !requestBody.lastName || !requestBody.email || !requestBody.password) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          message: 'firstName, lastName, email, and password are required'
        },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          }
        }
      )
    }

    // Check if passwords match
    if (requestBody.password !== requestBody.password2) {
      return NextResponse.json(
        {
          error: 'Passwords must match',
          message: 'Passwords do not match'
        },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          }
        }
      )
    }

    // Prepare user data
    const userData = {
      fullName: `${requestBody.firstName} ${requestBody.lastName}`,
      firstName: requestBody.firstName,
      lastName: requestBody.lastName,
      password: requestBody.password,
      password2: requestBody.password2,
      email: requestBody.email,
    }

    // Register user
    const message = await registerUser(userData)

    return NextResponse.json(
      {
        success: true,
        message: message,
      },
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    )

  } catch (error) {
    console.error('Registration error:', error)
    
    let statusCode = 500
    let errorMessage = error.message || 'Internal server error'
    
    // Set appropriate status codes based on error type
    if (errorMessage.includes('already taken') || errorMessage.includes('duplicate')) {
      statusCode = 409 // Conflict
    } else if (errorMessage.includes('required') || errorMessage.includes('validation')) {
      statusCode = 400 // Bad Request
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Registration failed',
        message: errorMessage
      },
      { 
        status: statusCode,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    )
  }
}