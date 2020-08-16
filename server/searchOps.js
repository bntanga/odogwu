const pdfSchema = require("./models/pdfBook.js");
const QuestionPaperSchema = require("./models/QuestionPaper.js");


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


searchQuestionsPapers = async() =>{


  let questionPapers = await QuestionPaperSchema.find({});

  






}

module.exports = { searchPdfByTitle, generalSearch, searchPdfByAuthor, searchPdfByLevel };
