const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend server running successfully"
  });
});

app.get("/notifications", async (req, res) => {
  try {
    const axios = require("axios");

    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});