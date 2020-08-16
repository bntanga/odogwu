/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

const HardCoverBook = require("./models/hardCoverBook");

const PDF = require("./models/pdfBook");

const QuestionPaper = require("./models/QuestionPaper");

const YouTubeVideo = require("./models/YouTubeVideo");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.post("/filter", async (req, res) => {
  console.log("filter called with body", req.body);
  let pdf_books = await PDF.find(req.body);
  let hc_books = await HardCoverBook.find(req.body);
  console.log("this is all books", pdf_books, hc_books);
  res.send(JSON.stringify({ pdf_books: pdf_books, hc_books: hc_books }));
});
router.post("/add_pdf", async (req, res) => {
  //req.body must contain all the following fields
  let newBook = new PDF({
    title: req.body.title,
    author: req.body.author,
    subject: req.body.subject,
    format: req.body.format,
    description: req.body.description,
    edition: 1,
    gradeLevel: req.body.gradeLevel,
    downloadUrl: req.body.downloadUrl,
    publicationDate: "fix me",
  });

  newBook
    .save()
    .then((book) => {
      res.send(JSON.stringify({ book: book }));
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "error" }));
    });
});

router.post("/add_question_paper", async (req, res) => {
  //req.body must contain all the following fields
  let newBook = new QuestionPaper({
    paperBoard: req.body.paperBoard,
    paperYear: req.body.paperYear,
    paperMonth: req.body.paperMonth,
    paperNumber: req.body.paperNumber,
    subject: req.body.subject,
    downloadUrl: req.body.downloadUrl,
    gradeLevel: req.body.gradeLevel,
    format: req.body.format,
  });

  newBook
    .save()
    .then((book) => {
      res.send(JSON.stringify({ book: book }));
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "error" }));
    });
});

router.post("/add_youtube_video", async (req, res) => {
  //req.body must contain all the following fields
  let newVideo = new YouTubeVideo({
    videoUrl: req.body.videoUrl,
    title: req.body.title,
    description: req.body.description,
    subject: req.body.subject,
    gradeLevel: req.body.gradeLevel,
  });

  newVideo
    .save()
    .then((video) => {
      res.send(JSON.stringify({ video: video }));
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "error" }));
    });
});

router.post("/search", async (req, res) => {
  //sample_tags = [pdf_books, mathematics];
  //empty tags means search all
  //req.body.bookType must be one of pdf_books, hc_books, all
  //req.body.pattern is the search query
  let tags = req.body.tags;
  if (tags === []) {
  }
  let all_books;
  console.log("this is book type", req.body.bookType);
  if (req.body.bookType === "pdf_books") {
    console.log("in pdf books");
    all_books = await PDF.find({});
  } else if (req.body.bookType === "hc_books") {
    all_books = await HardCoverBook.find({});
  } else if (req.body.bookType === "all") {
    let new_books;
    all_books = await HardCoverBook.find({});
    new_books = await PDF.find({});
    all_books = all_books.concat(new_books);
    console.log("this is new all books", all_books);
  }

  // let books_json = JSON.stringify(all_books);
  const fuseOptions = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: req.body.tags,
  };
  // console.log("this is all books", all_books);
  console.log("this is type of all books", typeof all_books);
  const fuse = new Fuse(all_books, fuseOptions);
  const results = fuse.search(req.body.pattern);
  res.send(JSON.stringify(results));
});

router.post("/add_hc_book", (req, res) => {
  let newBook = new HardCoverBook({
    title: req.body.title,
    author: req.body.author,
    subject: req.body.subject,
    description: req.body.description,
    edition: 1,
    gradeLevel: req.body.gradeLevel,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    sellerLocation: req.body.sellerLocation,
    sellerPhoneNumber: req.body.sellerPhoneNumber,
    sellerEmail: "fix me",
    sellerId: "fix me",
  });

  newBook
    .save()
    .then((book) => {
      res.send(JSON.stringify({ book: book }));
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "error" }));
    });
});
router.post("/find_hcbook_with_filter", async (req, res) => {
  //Assumes req.body is a valid search query

  let all_books = await HardCoverBook.find(req.body);
  res.send(JSON.stringify({ all_books: all_books }));
});
router.get("/ussd", (req, res) => {
  console.log("ussd");
});
router.post("/ussd", (req, res) => {
  console.log(req.body);
  let { sessionId, serviceCode, phoneNumber, text } = req.body;
  // console.log(req.body)
  if (text == "") {
    // This is the first request. Note how we start the response with CON
    let response = `CON What would you want to check
    1. My Account
    2. My phone number`;
    res.send(response);
  } else if (text == "1") {
    // Business logic for first level response
    let response = `CON Choose account information you want to view
    1. Account number
    2. Account balance`;
    res.send(response);
  } else if (text == "2") {
    // Business logic for first level response
    let response = `END Your phone number is ${phoneNumber}`;
    res.send(response);
  } else if (text == "1*1") {
    // Business logic for first level response
    let accountNumber = "ACC1001";
    // This is a terminal request. Note how we start the response with END
    let response = `END Your account number is ${accountNumber}`;
    res.send(response);
  } else if (text == "1*2") {
    // This is a second level response where the user selected 1 in the first instance
    let balance = "NGN 10,000";
    // This is a terminal request. Note how we start the response with END
    let response = `END Your balance is ${balance}`;
    res.send(response);
  } else {
    res.status(400).send("Bad request!");
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
