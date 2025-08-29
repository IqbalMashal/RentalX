const userService = require('@/lib/mongodb');
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (req.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (req.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        error: 'Method not allowed',
        message: 'Only POST requests are accepted'
      })
    };
  }

  try {
    const requestBody = typeof req.body === 'string' 
      ? JSON.parse(req.body) 
      : req.body;

    const user = await userService.checkUser(requestBody);
    const payload = {
      _id: user._id,
      userName: user.fullName,
      userFirstName: user.firstName
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "Login successful",
        token
      })
    };

  } catch (err) {
    return {
      statusCode: 422,
      headers,
      body: JSON.stringify({
        message: err.message || "Login failed"
      })
    };
  }
};