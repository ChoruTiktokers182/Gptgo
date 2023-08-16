const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');

router.get("/", async (req, res, next) => {
  try {
    const query = req.query.q; 
    if (!query) {
      return res.status(400).send("Query parameter 'q' is required");
    }
    const response = await ChatGpt(query);
    res.send(response);
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
});

async function ChatGpt(query) {
  const tokenResponse = await fetch(`https://gptgo.ai/action_get_token.php?q=${encodeURIComponent(query)}&hlgpt=default`, {
    method: "GET",
    headers: {
      "Referer": "https://gptgo.ai/?hl=id",
      "origin": "https://gptgo.ai/",
    }
  });

  if (!tokenResponse.ok) {
    throw new Error(`Failed to fetch token. Status: ${tokenResponse.status}`);
  }

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

  if (!response.ok) {
    throw new Error(`Failed to fetch GPT response. Status: ${response.status}`);
  }

  const { content } = await response.json();
  return content;
}

module.exports = router;
