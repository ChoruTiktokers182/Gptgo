const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');

router.get("/", async (req, res, next) => {
  try {
    const query = req.query.q; // Get query parameter from request
    const response = await ChatGpt(query);
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

async function ChatGpt(query) {
  try {
    const tokenResponse = await fetch(`https://gptgo.ai/action_get_token.php?q=${encodeURIComponent(query)}&hlgpt=default`, {
      method: "GET",
      headers: {
        "Referer": "https://gptgo.ai/?hl=id",
        "origin": "https://gptgo.ai/",
      }
    });
    
    const tokenData = await tokenResponse.json();
    const gpttoken = tokenData.token;

    const response = await fetch(`https://gptgo.ai/action_ai_gpt.php?token=${gpttoken}`, {
      method: "GET",
      headers: {
        "Referer": "https://gptgo.ai/?hl=id",
        "origin": "https://gptgo.ai/",
        "accept": "text/event-stream"
      }
    });

    const { content } = await response.json();
    return content; // Return the content from the response
  } catch (error) {
    throw new Error("Error fetching from GPT: " + error.message);
  }
}

module.exports = router;
