const accountSid = "ACcb33960fe7e14a1ced8e3293dc903429";
const authToken = "3f719506ec25438b61afbcfc8156422c";
const client = require("twilio")(accountSid, authToken);
const pdfSchema = require("./models/pdfBook.js");
const Fuse = require("fuse.js");
const { searchPdfByTitle } = require("./searchOps.js");
const QuestionPaperSchema = require("./models/QuestionPaper.js");

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
  client.messages
    .create({
      mediaUrl: [mediaUrl],
      from: "whatsapp:+14155238886",
      body: message,
      to: number,
    })
    .then((message) => console.log(message));
}

function sendPlainWhatsAppMessage(number, message) {
  console.log(number);
  console.log(message);
  client.messages
    .create({
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
        console.log(downloadUrl)
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


searchQuestionPaper = async(messages,number,res) =>{

  let questionPapers = await QuestionPaperSchema.find({});
  const options = {
    includeScore: true,
    keys: [],
  };
  const fuse = new Fuse(questionPapers, options);

  messages.map((message)=>{
    const options = {
      includeScore: true,
      keys: [message.tag],
    };
    const fuse = new Fuse(questionPapers, options);
    let q = fuse.search(message.text)
    console.log(q);
    if (q.length!==0){
    questionPapers = q;
    }
  })

 questionPapers = questionPapers.map((doc)=>{
  return doc.item
 });

 var message = "Here are your search results \n\n"
 questionPapers.map((doc,index)=>{
    message += `${index+1}\n`
    message += `ID : ${doc._id} `
    message += `Board : ${doc.paperBoard} \n`
    message += `Year : ${doc.paperYear} \n`
    message += `Month : ${doc.paperMonth} \n`
    message += `Paper : ${doc.paperNumber} \n`
    message += `Subject : ${doc.subject} \n`
    message += `Grade Level : ${doc.gradeLevel} \n\n`
    
 })

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

// sendPlainWhatsAppMessage(number,"Use the following codes to get your \n desired result");
var close = "Use the following codes to get your \n desired result\n\n"
questionPapers.map((doc,index)=>{

  close += `${index}\n`
  close += `choose paper = <id:${doc._id}> \n\n`

})
sendPlainWhatsAppMessage(number, close);

}

searchPDF = async(messages,number,res)=>{


  let questionPapers = await pdfSchema.find({});
  const options = {
    includeScore: true,
    keys: [],
  };
  const fuse = new Fuse(questionPapers, options);

  messages.map((message)=>{
    const options = {
      includeScore: true,
      keys: [message.tag],
    };
    const fuse = new Fuse(questionPapers, options);
    let q = fuse.search(message.text)
    console.log(q);
    if (q.length!==0){
    questionPapers = q;
    }
  })

 questionPapers = questionPapers.map((doc)=>{
  return doc.item
 });

 var message = "Here are your search results \n\n"
 questionPapers.map((doc,index)=>{
    message += `${index+1}\n`
    message += `ID : ${doc._id} `
    message += `Title : ${doc.title} \n`
    message += `Author : ${doc.author} \n`
    message += `Subject : ${doc.subject} \n`
    message += `Format : ${doc.format} \n`
    message += `Edition : ${doc.edition} \n`
    message += `Grade Level : ${doc.gradeLevel} \n\n`
    
 })

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

// sendPlainWhatsAppMessage(number,"Use the following codes to get your \n desired result");
var close = "Use the following codes to get your \n desired result\n\n"
questionPapers.map((doc,index)=>{

  close += `${index}\n`
  close += `choose pdf = <id:${doc._id}> \n\n`

})
sendPlainWhatsAppMessage(number, close);




}



chooseQuestionPaper = async(messages,number,res) =>{

  let doc = await QuestionPaperSchema.findOne({ _id : messages[0].text});
  var message = "Here you go \n\n"
    message += `ID : ${doc._id} `
    message += `Board : ${doc.paperBoard} \n`
    message += `Year : ${doc.paperYear} \n`
    message += `Month : ${doc.paperMonth} \n`
    message += `Paper : ${doc.paperNumber} \n`
    message += `Subject : ${doc.subject} \n`
    message += `Grade Level : ${doc.gradeLevel} \n\n`
  
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

sendWhatsAppMessage(number,"",doc.downloadUrl);

}
choosePDF = async(messages,number,res) =>{

  let doc = await pdfSchema.findOne({ _id : messages[0].text});
  var message = "Here you go \n\n"
    message += `ID : ${doc._id} `
    message += `Title : ${doc.title} \n`
    message += `Author : ${doc.author} \n`
    message += `Subject : ${doc.subject} \n`
    message += `Format : ${doc.format} \n`
    message += `Edition : ${doc.edition} \n`
    message += `Grade Level : ${doc.gradeLevel} \n\n`
  
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

sendWhatsAppMessage(number,"",doc.downloadUrl);

}

class WhatsappBot {
  /**
   * @memberof WhatsappBot
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - object representing response message
   */
  static async Search(req, res, next) {
    //   const twiml = new MessagingResponse();
    // const q = req.body;
    // console.log("This is the question", q);
  
    var message = req.body.CurrentInput;
    var number = req.body.UserIdentifier
    var regex = /\<(.*?)\>/g
    var search_strings = []
    message.match(regex).map(function(val){
      let newval =  val.replace(/\>/g,'');
      let news= newval.replace(/\</g,'') + " ";
      let string_split = news.split(":")
      let string_1 = string_split[0]
      let string_2 = string_split[1]
      string_1 =string_1.split(" ")[0]
      string_2 = string_2.split(" ")[0]
      var string_data = {
        tag : string_1,
        text  : string_2
      }

      search_strings.push(string_data);

   });
   
   console.log(search_strings);
  searchPDF(search_strings,number,res)
  }
  static async optionChoose(req, res, next) {
    //   const twiml = new MessagingResponse();
    const q = req.body;
    console.log("This is the question", q);
    var message = q.CurrentInput;
    var messages = message.split("*");

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
  static async questionPaperSearch(req, res, next) {

    console.log(req.body)
    var message = req.body.CurrentInput;
    var number = req.body.UserIdentifier
    var regex = /\<(.*?)\>/g
    var search_strings = []
    message.match(regex).map(function(val){
      let newval =  val.replace(/\>/g,'');
      let news= newval.replace(/\</g,'') + " ";
      let string_split = news.split(":")
      let string_1 = string_split[0]
      let string_2 = string_split[1]

      var string_data = {
        tag : string_1,
        text  : string_2
      }

      search_strings.push(string_data);

   });
   
  //  console.log(search_strings);
   searchQuestionPaper(search_strings,number,res)
  
  }

  static async choosePaper(req, res, next) {

    var message = req.body.CurrentInput;
    var number = req.body.UserIdentifier
    var regex = /\<(.*?)\>/g
    var search_strings = []
    message.match(regex).map(function(val){
      let newval =  val.replace(/\>/g,'');
      let news= newval.replace(/\</g,'') + " ";
      let string_split = news.split(":")
      let string_1 = string_split[0]
      let string_2 = string_split[1]
      string_1 =string_1.split(" ")[0]
      string_2 = string_2.split(" ")[0]
      var string_data = {
        tag : string_1,
        text  : string_2
      }

      search_strings.push(string_data);

   });
   
   console.log(search_strings);
   chooseQuestionPaper(search_strings,number,res)
  
  }

  static async chooseAPDF(req, res, next) {

    var message = req.body.CurrentInput;
    var number = req.body.UserIdentifier
    var regex = /\<(.*?)\>/g
    var search_strings = []
    message.match(regex).map(function(val){
      let newval =  val.replace(/\>/g,'');
      let news= newval.replace(/\</g,'') + " ";
      let string_split = news.split(":")
      let string_1 = string_split[0]
      let string_2 = string_split[1]
      string_1 =string_1.split(" ")[0]
      string_2 = string_2.split(" ")[0]
      var string_data = {
        tag : string_1,
        text  : string_2
      }

      search_strings.push(string_data);

   });
   
   console.log(search_strings);
   choosePDF(search_strings,number,res)
  
  }

}

module.exports = { WhatsappBot };
