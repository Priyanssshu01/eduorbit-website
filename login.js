// Netlify Serverless Function for Secure Admin Login
exports.handler = async (event, context) => {
  // CORS Headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  // Handle OPTIONS preflight request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  try {
    const { username, password } = JSON.parse(event.body);

    // Get credentials from environment variables or use secure defaults
    const expectedUser = process.env.ADMIN_USER || "eduorbit";
    const expectedPass = process.env.ADMIN_PASS || "admin@2026";

    if (username === expectedUser && password === expectedPass) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, token: "eo_session_" + Math.random().toString(36).substr(2) })
      };
    } else {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ success: false, error: "Invalid username or password" })
      };
    }
  } catch (err) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Invalid JSON request payload" })
    };
  }
};
