// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'ACcb33960fe7e14a1ced8e3293dc903429';
const authToken = '6f386c082b6291508355a42c1994f6b7';
const client = require('twilio')(accountSid, authToken);

client.messages
      .create({
        mediaUrl: ['https://odogwubooks.s3.us-east-2.amazonaws.com/9781558607354-Chapter-1-The-Circuit-Abstraction.pdf'],
         from: 'whatsapp:+14155238886',
         body: "Hey Brian, you good. It's  Hillary from the backend",
         to: 'whatsapp:+16177107082'
       })
      .then(message => console.log(message));


