/*
By -> Taha Dostifam
http://github.com/tahadostifam
*/

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/submit", function (req, res) {
  console.clear();
  console.log(req.body);
  console.log(req.body.comment);

  const secretKey = "<Google Recaptcha Secret Key>";

  const verificationUrl =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    secretKey +
    "&response=" +
    req.body["g-recaptcha-response"] +
    "&remoteip=" +
    req.connection.remoteAddress;

  request(verificationUrl, function (error, response, body) {
    body = JSON.parse(body);
    if (body.success !== undefined && !body.success) {
      return res.send("Verify the Recaptcha");
    }
    res.send("Success");
  });
});

app.listen(3001);
