const pdfSchema = require("./models/pdfBook.js");
const QuestionPaperSchema = require("./models/QuestionPaper.js");
const accountSid = "ACcb33960fe7e14a1ced8e3293dc903429";
const authToken = "3f719506ec25438b61afbcfc8156422c";
const client = require("twilio")(accountSid, authToken);

const Fuse = require("fuse.js");
const messenger = require("./whatsapp.js");
// const { response } = require("express");

function generalSearch(text) {
  pdfSchema.find({}, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
    }
  });
}

function searchPdfByTitle(text, res, extended, index, number) {
  console.log("This is my text");
  const options = {
    includeScore: true,
    keys: ["title"],
  };

  if (extended) {
    var response = `Sent to your WhatsAPP and Text
        
        `;
    var message = "";
    pdfSchema
      .find({})
      .then((docs) => {
        const fuse = new Fuse(docs, options);
        const result = fuse.search(text);
        items = result.filter((res) => res.score < 1);

        if (items != []) {
          var item_to_send = items[index - 1].item;
          console.log(item_to_send);

          var authors = "";
          item_to_send.author.map((aut) => {
            authors += aut + " ";
          });
          authors += "\n";
          message += `Title : ${item_to_send.title} \n`;
          message += `Authors : ${authors} \n`;
          message += `Grade Level : ${item_to_send.gradeLevel} \n `;
          var download = item_to_send.downloadUrl;
          messenger.sendWhatsAppMessage(number, message, download, res);
          //   res.send(response);
        } else {
          response += "No results \n";
          res.send(response);
        }
      })
      .catch((err) => {
        console.log(err);
        response += "No results : Internal Error \n";
        res.send(response);
      });
  } else {
    var response = `CON Results 
        
    `;
    pdfSchema
      .find({})
      .then((docs) => {
        const fuse = new Fuse(docs, options);
        const result = fuse.search(text);
        items = result.filter((res) => res.score < 1);
        if (items != []) {
          items.map((item, index) => {
            var authors = "";
            item.item.author.map((aut) => {
              authors += aut + " ";
            });
            authors += "\n";
            var sub_response = `${index + 1} \n`;
            sub_response += `Title : ${item.item.title} \n`;
            sub_response += `Authors : ${authors} \n`;
            sub_response += `Grade Level : ${item.item.gradeLevel} \n `;
            sub_response += `Download here : ${item.item.downloadUrl} \n\n`;
            response += sub_response;
          });
        } else {
          response += "No results \n";
        }

        res.send(response);
      })
      .catch((err) => {
        console.log(err);
        response += "No results : Internal Error \n";
        res.send(response);
      });
  }
}

function searchPdfByAuthor(text, res, extended, index, number) {
  console.log("This is my text");

  const options = {
    includeScore: true,
    keys: ["author"],
  };

  if (extended) {
    var response = `Sent to your WhatsAPP and Text
        
        `;
    var message = "";
    pdfSchema
      .find({})
      .then((docs) => {
        const fuse = new Fuse(docs, options);
        const result = fuse.search(text);
        items = result.filter((res) => res.score < 1);
        if (items != []) {
          var item_to_send = items[index - 1].item;
          var authors = "";
          item_to_send.author.map((aut) => {
            authors += aut + " ";
          });
          authors += "\n";
          message += `Title : ${item_to_send.title} \n`;
          message += `Authors : ${authors} \n`;
          message += `Grade Level : ${item_to_send.gradeLevel} \n `;
          var download = item_to_send.downloadUrl;
          messenger.sendWhatsAppMessage(number, message, download, res);
          //   res.send(response);
        } else {
          response += "No results \n";
          res.send(response);
        }
      })
      .catch((err) => {
        console.log(err);
        response += "No results : Internal Error \n";
        res.send(response);
      });
  } else {
    var response = `CON Results 
        
      `;
    pdfSchema.find({}, (err, docs) => {
      if (err) {
        console.log(err);
        response += "No results : Internal Error \n";
        res.send(response);
      } else {
        const fuse = new Fuse(docs, options);
        const result = fuse.search(text);
        items = result.filter((res) => res.score < 1);
        if (items != []) {
          items.map((item, index) => {
            var authors = "";
            item.item.author.map((aut) => {
              authors += aut + " ";
            });
            authors += "\n";
            var sub_response = `${index + 1} \n`;
            sub_response += `Title : ${item.item.title} \n`;
            sub_response += `Authors : ${authors} \n`;
            sub_response += `Grade Level : ${item.item.gradeLevel} \n `;
            sub_response += `Download here : ${item.item.downloadUrl} \n\n`;
            response += sub_response;
            res.send(response);
          });
        } else {
          response += "No results \n";
          res.send(response);
        }
      }
    });
  }
}

function searchPdfByLevel(text, res, extended, index, number) {
  const options = {
    includeScore: true,
    keys: ["gradeLevel"],
  };
  if (extended) {
    var response = `Sent to your WhatsAPP and Text
        
        `;
    var message = "";
    pdfSchema
      .find({})
      .then((docs) => {
        const fuse = new Fuse(docs, options);
        const result = fuse.search(text);
        items = result.filter((res) => res.score < 1);
        if (items != []) {
          var item_to_send = items[index - 1].item;
          var authors = "";
          item_to_send.author.map((aut) => {
            authors += aut + " ";
          });
          authors += "\n";
          message += `Title : ${item_to_send.title} \n`;
          message += `Authors : ${authors} \n`;
          message += `Grade Level : ${item_to_send.gradeLevel} \n `;
          var download = item_to_send.downloadUrl;
          messenger.sendWhatsAppMessage(number, message, download, res);
          //   res.send(response);
        } else {
          response += "No results \n";
          res.send(response);
        }
      })
      .catch((err) => {
        console.log(err);
        response += "No results : Internal Error \n";
        res.send(response);
      });
  } else {
    var response = `CON Results 
        
      `;
    pdfSchema.find({}, (err, docs) => {
      if (err) {
        console.log(err);
        response += "No results : Internal Error \n";
        res.send(response);
      } else {
        const fuse = new Fuse(docs, options);
        const result = fuse.search(text);
        items = result.filter((res) => res.score < 1);
        if (items != []) {
          items.map((item, index) => {
            var authors = "";
            item.item.author.map((aut) => {
              authors += aut + " ";
            });
            authors += "\n";
            var sub_response = `${index + 1} \n`;
            sub_response += `Title : ${item.item.title} \n`;
            sub_response += `Authors : ${authors} \n`;
            sub_response += `Grade Level : ${item.item.gradeLevel} \n `;
            sub_response += `Download here : ${item.item.downloadUrl} \n\n`;
            response += sub_response;
          });
        } else {
          response += "No results \n";
        }

        res.send(response);
      }
    });
  }
}



searchPDF = async(messages,number,res)=>{

  let questionPapers = await pdfSchema.find({});
  const options = {
    includeScore: true,
    keys: [],
  };
  const fuse = new Fuse(questionPapers, options);

  console.log(questionPapers)
  messages.map((message)=>{
    const options = {
      includeScore: true,
      keys: [message.tag],
    };
    const fuse = new Fuse(questionPapers, options);
    let q = fuse.search(message.text)
    console.log("This is q",q);
    if (q.length!==0){
    questionPapers = q;
    }
  })
  console.log(questionPapers)

 questionPapers = questionPapers.map((doc)=>{
  return doc.item
 });
 console.log(questionPapers)

 var message = "CON Here are your search results \n\n"
 questionPapers.map((doc,index)=>{
   console.log(index)
    message += `${index+1}\n`
    message += `ID : ${doc._id} `
    message += `Title : ${doc.title} \n`
    message += `Author : ${doc.author} \n`
    message += `Subject : ${doc.subject} \n`
    message += `Format : ${doc.format} \n`
    message += `Edition : ${doc.edition} \n`
    message += `Grade Level : ${doc.gradeLevel} \n\n`
    
 })

res.send(message);

// sendPlainWhatsAppMessage(number,"Use the following codes to get your \n desired result");
var close = "Use the following codes to get your \n desired result\n\n"
questionPapers.map((doc,index)=>{

  close += `${index}\n`
  close += `choose pdf = <id:${doc._id}> \n\n`

})


sendPlainMessage(number, close);




}

function sendPlainMessage(number,close){

  client.messages
  .create({
     body: close,
     from: '+14155238886',
     to: number
   })
  .then(message => console.log(message.sid));


}
function sendWhatsAppMessage(number, message,mediaUrl) {
  console.log(number);
  console.log(message);
  client.messages
    .create({
      mediaUrl:[mediaUrl],
      from: "whatsapp:+14155238886",
      body: message,
      to: "whatapp:"+number,
    })
    .then((message) => console.log(message));
}
choosePDF = async(messages,number,res) =>{

  let doc = await pdfSchema.findOne({ _id : messages[0].text});
  var message = "CON Here you go \n\n"
    message += `ID : ${doc._id} `
    message += `Title : ${doc.title} \n`
    message += `Author : ${doc.author} \n`
    message += `Subject : ${doc.subject} \n`
    message += `Format : ${doc.format} \n`
    message += `Edition : ${doc.edition} \n`
    message += `Grade Level : ${doc.gradeLevel} \n\n`
  
res.send(message);

sendWhatsAppMessage(number,"",doc.downloadUrl);

}

module.exports = { searchPdfByTitle, generalSearch, searchPdfByAuthor, searchPdfByLevel, searchPDF,choosePDF };
