// Import packages
const express = require("express");
const gptgo = require("./gptgo");

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use("/ask", gptgo);

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
