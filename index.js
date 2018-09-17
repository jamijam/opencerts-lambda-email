require("dotenv").config();
const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const certificateMailer = require("./src/mailer/mailerWithSESTransporter");

const app = express();

app.use(bodyParser.json());

app.post("/", async (req, res) => {
  try {
    const { to, data } = req.body;
    const certificate = JSON.parse(data);

    console.log(JSON.stringify(certificate, null, 2));
    console.log(to);

    await certificateMailer({ to, certificate });
    res.send("OK");
  } catch (e) {
    res.status(500).send({ error: 'Request failed' })
  }
});

module.exports.handler = serverless(app);
