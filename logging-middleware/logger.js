require("dotenv").config();
const axios = require("axios");

async function Log(stack, level, pkg, message) {
  try {
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack: stack,
        level: level,
        package: pkg,
        message: message
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error("Logging failed:", error.response?.data || error.message);
  }
}

module.exports = Log;