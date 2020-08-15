/*
|--------------------------------------------------------------------------
| server.js -- The core of your server
|--------------------------------------------------------------------------
|
| This file defines how your server starts up. Think of it as the main() of your server.
| At a high level, this file does the following things:
| - Connect to the database
| - Sets up server middleware (i.e. addons that enable things like json parsing, user login)
| - Hooks up all the backend routes specified in api.js
| - Fowards frontend routes that should be handled by the React router
| - Sets up error handling in case something goes wrong when handling a request
| - Actually starts the webserver
*/

// validator runs some basic checks to make sure you've set everything up correctly
// this is a tool provided by staff, so you don't need to worry about it
const ussd = require("./ussd.js");
const searchOps = require("./searchOps.js");
const appBot = require("./whatsappbot.js");

// const validator = require("./validator");
// validator.checkSetup();

//import libraries needed for the webserver to work!
const http = require("http");
const express = require("express"); // backend framework for our node server.
const session = require("express-session"); // library that stores info about each connected user
const mongoose = require("mongoose"); // library to connect to MongoDB
const path = require("path"); // provide utilities for working with file and directory paths
const bodyParser = require("body-parser");
const api = require("./api");
const auth = require("./auth");
const { createProxyMiddleware } = require("http-proxy-middleware");
// socket stuff
const socket = require("./server-socket");
const { Console } = require("console");

// Server configuration below
// TODO change connection URL after setting up your team database
// const mongoConnectionURL =
//   "mongodb+srv://bntanga:odugwu@cluster0.wkd33.mongodb.net/odogwu?retryWrites=true&w=majority";

const mongoConnectionURL =
  "mongodb+srv://bntanga:odogwu@cluster0.wkd33.mongodb.net/odogwudb?retryWrites=true&w=majority";
// TODO change database name to the name you chose
const databaseName = "odogwudb";

// connect to mongodb
mongoose
  .connect(mongoConnectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: databaseName,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

// create a new express server
const app = express();
// app.use(validator.checkRoutes);

// allow us to process POST requests
app.use(express.json());
// app.use("/ussd",ussd)
// set up a session, which will persist login data across requests
app.use(
  session({
    secret: "session-secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ****************************************************
// USSD INTERFACE
// ****************************************************
// app.use('/api', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
let subjects = ["PHYSICS", "CHEMISTRY", "MATHEMATICS", "BIOLOGY", "ENGLISH", "WOODWORK"];

let subjects_string = `CON SUBJECTS

`;
subjects.map((subject, index) => {
  subjects_string += ` ${index + 1}. ${subject}
  `;
});

app.post("/bot", appBot.WhatsappBot.googleSearch);
app.post("/botchoosepdftitle", appBot.WhatsappBot.optionChoose);

app.post("/ussd", (req, res) => {
  // console.log("ussed");
  // console.log(req.body);
  let { sessionId, serviceCode, phoneNumber, text } = req.body;
  // text = ""
  // console.log(req.body)
  console.log(text);
  if (text == "") {
    // This is the first request. Note how we start the response with CON
    let response = `CON WELCOME TO ODOGWU LIBRARY
    1. Find Books
    2. Find Question Papers
    3. Find Teachers
    `;
    res.send(response);
  } else if (text == "1") {
    // Business logic for first level response
    let response = subjects_string;
    res.send(response);
  } else if (text == "2") {
    // Business logic for first level response
    let response = `END Your phone number is ${phoneNumber}`;
    res.send(response);
  } else if (text.startsWith("1*")) {
    let response = "";
    subjects.map((subject, index) => {
      var choose_subject = `1*${index + 1}`;
      var choose_pdf_format = `1*${index + 1}*1`;
      var choose_physical_format = `1*${index + 1}*2`;

      var choose_pdf_price_tag_free = `1*${index + 1}*1*1`;
      var choose_pdf_price_tag_paid = `1*${index + 1}*1*2`;

      var choose_physical_price_tag_free = `1*${index + 1}*2*1`;
      var choose_physical_price_tag_paid = `1*${index + 1}*2*2`;

      var search_free_pdf_by_title = `1*${index + 1}*1*1*1`;
      var search_free_pdf_by_author = `1*${index + 1}*1*1*2`;
      var search_free_pdf_by_level = `1*${index + 1}*1*1*3`;

      var search_paid_pdf_by_title = `1*${index + 1}*1*2*1`;
      var search_paid_pdf_by_author = `1*${index + 1}*1*2*2`;
      var search_paid_pdf_by_level = `1*${index + 1}*1*2*3`;

      var search_free_physical_by_title = `1*${index + 1}*2*1*1`;
      var search_free_physical_by_author = `1*${index + 1}*2*1*2`;
      var search_free_physical_by_level = `1*${index + 1}*2*1*3`;

      var search_paid_physical_by_title = `1*${index + 1}*2*2*1`;
      var search_paid_physical_by_author = `1*${index + 1}*2*2*2`;
      var search_paid_physical_by_level = `1*${index + 1}*2*2*3`;

      var search_free_pdf_by_title_input = search_free_pdf_by_title + "*";

      var search_free_pdf_by_author_input = search_free_pdf_by_author + "*";

      var search_free_pdf_by_level_input = search_free_pdf_by_level + "*";

      if (choose_subject === text) {
        response = `CON ${subject} Books
      1. PDF
      2. HARD COPY      `;
        res.send(response);
      } else if (choose_pdf_format === text) {
        response = `CON ${subject} PDFs Books
        1. FREE`;
        res.send(response);
      } else if (choose_physical_format === text) {
        response = `CON ${subject} Physical Books
        1. FREE
        2. PAID`;
        res.send(response);
      } else if (choose_pdf_price_tag_free === text) {
        response = `CON ${subject} Free PDFs 
        1. Search by Title
        2. Search by Author
        3. Search by Level`;
        res.send(response);
      } else if (choose_physical_price_tag_free === text) {
        response = `CON ${subject} Free Physical Books 
        1. Search by Title
        2. Search by Author
        3. Search by Level`;
        res.send(response);
      } else if (choose_physical_price_tag_paid === text) {
        response = `CON ${subject}  Free Physical PDFs 
      1. Search by Title
      2. Search by Author
      3. Search by Level`;
        res.send(response);
      } else if (search_free_pdf_by_title === text) {
        console.log(text);
        response = `CON Search ${subject} Free PDFs by Title

        INPUT
          `;
        res.send(response);
      } else if (search_free_pdf_by_author === text) {
        console.log(text);
        response = `CON Search ${subject} Free PDFs Author

    INPUT
      `;
        res.send(response);
      } else if (search_free_pdf_by_level === text) {
        console.log(text);
        response = `CON Search ${subject} Free PDFs by Level

INPUT
  `;
        res.send(response);
      } else if (text.includes(search_free_pdf_by_title_input)) {
        var words_array = text.split("*");
        var search_word = words_array[words_array.length - 1];
        console.log(words_array);

        var supposed_number = Number(search_word);
        // if typeof(){
        if (words_array.length < 7) {
          searchOps.searchPdfByTitle(search_word, res, false, 0, phoneNumber);
        } else {
          search_word = words_array[words_array.length - 2];
          console.log(search_word);
          searchOps.searchPdfByTitle(search_word, res, true, supposed_number, phoneNumber);
        }
      } else if (text.includes(search_free_pdf_by_author_input)) {
        var words_array = text.split("*");
        var search_word = words_array[words_array.length - 1];
        console.log(words_array);
        console.log(search_word);

        var supposed_number = Number(search_word);
        // if typeof(){
        if (words_array.length < 7) {
          searchOps.searchPdfByAuthor(search_word, res, false, 0, phoneNumber);
        } else {
          search_word = words_array[words_array.length - 2];
          searchOps.searchPdfByAuthor(search_word, res, true, supposed_number, phoneNumber);
        }
      } else if (text.includes(search_free_pdf_by_level_input)) {
        var words_array = text.split("*");
        var search_word = words_array[words_array.length - 1];
        var supposed_number = Number(search_word);
        // if typeof(){
        if (words_array.length < 7) {
          searchOps.searchPdfByLevel(search_word, res, false, 0, phoneNumber);
        } else {
          search_word = words_array[words_array.length - 2];
          searchOps.searchPdfByLevel(search_word, res, true, supposed_number, phoneNumber);
        }

        // }
      } else if (search_free_physical_by_title == text) {
      } else if (search_free_physical_by_author == text) {
      } else if (search_free_physical_by_level == text) {
      } else if (search_paid_physical_by_title === text) {
      } else if (search_paid_physical_by_author === text) {
      } else if (search_paid_physical_by_level === text) {
      }
    });

    // res.send(response);
  } else {
    res.status(400).send("Bad request!");
  }
});

// this checks if the user is logged in, and populates "req.user"
app.use(auth.populateCurrentUser);

// connect user-defined routes
app.use("/api", api);

// load the compiled react files, which will serve /index.html and /bundle.js
const reactPath = path.resolve(__dirname, "..", "client", "dist");
app.use(express.static(reactPath));

// for all other routes, render index.html and let react router handle it
app.get("*", (req, res) => {
  res.sendFile(path.join(reactPath, "index.html"));
});

// any server errors cause this function to run
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) {
    // 500 means Internal Server Error
    console.log("The server errored when processing a request!");
    console.log(err);
  }

  res.status(status);
  res.send({
    status: status,
    message: err.message,
  });
});

// const pdfSchema = require("./models/pdfBook.js");
const e = require("express");

// searchOps.searchPdfByAuthor("talber");

// hardcode port to 3000 for now
const port = 3000;
const server = http.Server(app);
socket.init(server);

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
