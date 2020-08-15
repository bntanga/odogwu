// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = "ACcb33960fe7e14a1ced8e3293dc903429";
const authToken = "55128b020e6371e8dc95d73c8f9b084b";
const client = require("twilio")(accountSid, authToken);

function sendWhatsAppMessage(number, message, mediaUrl, res) {
  client.messages
    .create({
      mediaUrl: [mediaUrl],
      from: "whatsapp:+14155238886",
      body: message,
      to: `whatsapp:` + number,
    })
    .then((message) => console.log(message));

  res.send(`CON Done`);
}

// sendWhatsAppMessage("+16177107082","Hey","https://odogwubooks.s3.us-east-2.amazonaws.com/Statistics1.pdf","")

module.exports = { sendWhatsAppMessage };
