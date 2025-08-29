import { NextResponse } from "next/server"
import { checkUser } from "@/lib/mongodb"
const jwt = require('jsonwebtoken');

export async function POST(request) {
  try {
    // Parse request body
    const requestBody = await request.json()

    // Check user credentials
    const user = await checkUser(requestBody)

    // Create JWT payload
    const payload = {
      id: user._id,
      userName: user.fullName,
      userFirstName: user.firstName
    }

    // Sign JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET)

    return NextResponse.json({
      message: "Login successful",
      token
    })

  } catch (err) {
    return NextResponse.json({
      message: err.message || "Login failed"
    }, { status: 422 })
  }
}