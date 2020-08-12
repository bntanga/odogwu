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

router.post("/add_hardcover_book", async (req, res) => {
  //req.body must contain all the following fields
  let newBook = new HardCoverBook({
    title: req.body.title,
    isbn: req.body.isbn,
    author: req.body.author,
    format: req.body.format,
    publicationStatus: req.body.publicationStatus,
    bisacSubject: req.body.bisacSubject,
    description: req.body.description,
    dateUploaded: req.body.dateUploaded,
    imageUrl: req.body.imageUrl,
    publicationDate: req.body.publicationDate,
    price: req.body.price,
    sellerLocation: req.body.sellerLocation,
    sellerPhoneNumber: req.body.sellerPhoneNumber,
    sellerEmail: req.body.sellerEmail,
    sellerId: req.body.sellerId,
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

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
