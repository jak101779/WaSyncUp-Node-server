const express = require("express");
const app = express();
const venom = require("venom-bot");
// Middleware to handle JSON and URL-encoded data
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads

app.post("/create-session", async (req, res) => {
  try {
    let responce = await startClientSession(req.body);
    res.status(200).send({ status: 1, data: [] });
  } catch (error) {
    res.status(500).send({ data: [], error: "Failed to crawl website" });
  }
});

async function startClientSession(data) {
  try {
    venom
      .create({
        session: data.session.trim(), //name of session
        headless: true, // false = visibility
      })
      .then((client) => start(client))
      .catch((erro) => {
        console.log(erro);
      });
  } catch (e) {
    return { data: [], error: "Failed to start session" };
  }
}

function start(client) {
  client.onMessage((message) => {
    if (message.body === "Hi" && message.isGroupMsg === false) {
      client
        .sendText(message.from, "Welcome Venom 🕷")
        .then((result) => {
          console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
    }
  });
}

app.listen(5050, () => {
  console.log("Server running on http://localhost:5050");
});
