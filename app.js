const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/contactForm", function (req, res) {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "exalterofficial@gmail.com",
      pass: "aapncstgtbwygxrk",
    },
  });

  const mailOptions = {
    from: email,
    to: "exalterofficial@gmail.com",
    subject: "Subject",
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Something went wrong. Please try again later.");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Thank you for your message. We will get back to you shortly.");
    }
  });
});

app.listen(3000, function () {
  console.log("Server listening on port 3000...");
});
