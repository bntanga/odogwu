const accountSid = "ACcb33960fe7e14a1ced8e3293dc903429";
const authToken = "55128b020e6371e8dc95d73c8f9b084b";
const client = require("twilio")(accountSid, authToken);
const pdfSchema = require("./models/pdfBook.js");
const Fuse = require("fuse.js");
const { searchPdfByTitle } = require("./searchOps.js");

// const MessagingResponse = require('twilio').twiml.MessagingResponse;

/**
 * @class WhatsappBot
 * @description class will implement bot functionality
 */

function searchPDFByTitleBot(subject, title, res) {
  var message = "";
  const options = {
    includeScore: true,
    keys: ["title"],
  };

  pdfSchema
    .find({})
    .then((docs) => {
      const fuse = new Fuse(docs, options);
      const items = fuse.search(subject + " " + title);

      if (items != []) {
        message = "Choose book options \n";
        items.map((doc, index) => {
          var authors = "";
          var item_number = `${index + 1} \n`;
          var item_to_send = doc.item;
          item_to_send.author.map((aut) => {
            authors += aut + " ";
          });
          authors += "\n";

          message += item_number;
          message += `Title : ${item_to_send.title} \n`;
          message += `Authors : ${authors}`;
          message += `Subject : ${item_to_send.subject} \n`;
          message += `Grade Level : ${item_to_send.gradeLevel} \n\n`;
        });
        var action = {
          actions: [
            {
              say: message,
            },
            {
              listen: true,
            },
          ],
        };
        console.log(action);
        res.send(JSON.stringify(action));
      } else {
        message += "No results \n";
        var action = {
          actions: [
            {
              say: message,
            },
            {
              listen: true,
            },
          ],
        };
        res.send(JSON.stringify(action));
      }
    })
    .catch((err) => {
      console.log(err);
      message += "No results : Internal Error \n";
      var action = {
        actions: [
          {
            say: message,
          },
          {
            listen: true,
          },
        ],
      };
      res.send(JSON.stringify(action));
    });
}

function sendWhatsAppMessage(number, message, mediaUrl) {
  console.log(number);
  console.log(message);
  // console.log(mediaUrl)
  client.messages
    .create({
      mediaUrl: [mediaUrl],
      from: "whatsapp:+14155238886",
      body: message,
      to: number,
    })
    .then((message) => console.log(message));
}

async function choosePDFOption(subject, title, res, index, phoneNumber) {
  var message = "";
  const options = {
    includeScore: true,
    keys: ["title"],
  };

  pdfSchema
    .find({})
    .then((docs) => {
      const fuse = new Fuse(docs, options);
      const items = fuse.search(subject + " " + title);
      if (items != []) {
        const doc = items[index];
        message = "Your result \n";
        var authors = "";
        var item_number = `${index + 1} \n`;
        var item_to_send = doc.item;
        item_to_send.author.map((aut) => {
          authors += aut + " ";
        });
        authors += "\n";
        message += item_number;
        message += `Title : ${item_to_send.title} \n`;
        message += `Authors : ${authors}`;
        message += `Subject : ${item_to_send.subject} \n`;
        message += `Grade Level : ${item_to_send.gradeLevel} \n\n`;
        var downloadUrl = item_to_send.downloadUrl;
        var action = {
          actions: [
            {
              say: message,
            },
            {
              listen: true,
            },
          ],
        };
        // console.log(action)

        res.send(JSON.stringify(action));

        sendWhatsAppMessage(phoneNumber, message, downloadUrl);
      } else {
        message += "No results \n";
        var action = {
          actions: [
            {
              say: message,
            },
            {
              listen: true,
            },
          ],
        };
        res.send(JSON.stringify(action));
      }
    })
    .catch((err) => {
      console.log(err);
      message += "No results : Internal Error \n";
      var action = {
        actions: [
          {
            say: message,
          },
          {
            listen: true,
          },
        ],
      };
      res.send(JSON.stringify(action));
    });
}

// sendWhatsAppMessage(,"Here you go",)

class WhatsappBot {
  /**
   * @memberof WhatsappBot
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - object representing response message
   */
  static async googleSearch(req, res, next) {
    //   const twiml = new MessagingResponse();
    const q = req.body;
    console.log("This is the question", q);
    var message = q.CurrentInput;
    var messages = message.split("/");
    console.log(messages);
    var title = messages[messages.length - 2];
    var subject = messages[messages.length - 4];
    console.log(title);
    console.log(subject);
    var number = q.UserIdentifier;
    searchPDFByTitleBot(subject, title, res);
  }
  static async optionChoose(req, res, next) {
    //   const twiml = new MessagingResponse();
    const q = req.body;
    console.log("This is the question", q);
    var message = q.CurrentInput;
    var messages = message.split("*");

    //   console.log(messages)

    var phoneNumber = q.UserIdentifier;
    var index_string = messages[messages.length - 1].split("");
    var index_string_number = index_string[index_string.length - 1];
    var index = Number(index_string_number);

    //   console.log(typeof index)
    if (isNaN(index)) {
      // console.log(0);
      var words = messages[0].split("/");
      var title = words[words.length - 2];
      var subject = words[words.length - 4];
      choosePDFOption(subject, title, res, 0, phoneNumber);
    } else {
      var words = messages[0].split("/");
      var title = words[words.length - 2];
      var subject = words[words.length - 4];
      choosePDFOption(subject, title, res, index - 1, phoneNumber);
    }
  }
}

module.exports = { WhatsappBot };
