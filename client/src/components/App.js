import React, { Component } from "react";
import { navigate, Router } from "@reach/router";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./pages/NotFound.js";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "./pages/firebase";

import Skeleton from "./pages/Skeleton.js";
import Navbar from "./pages/NavBar.js";

import SubjectFilterPage from "./pages/SubjectFilterPage";
import BooksDisplayPage from "./pages/BooksDisplayPage";

import UploadBook from "./pages/UploadBook";

import "../utilities.css";

import { get, post } from "../utilities";
import NavBar from "./pages/NavBar";

/**
 * Define the "App" component as a class.
 */

let sampleSubjects = [
  { image: "", title: "Physics" },
  { image: "", title: "Chemistry" },
  { image: "", title: "Biology" },
  { image: "", title: "Geography" },
];
let gradeLevels = ["Advanced Level", "Senior Secondary", "Junior Secondary", "Primary"];
let sampleFilterGroups = [
  { title: "Price", fields: ["High", "Low"] },
  {
    title: "Grade",
    fields: gradeLevels,
  },
];

let sampleBooks = [
  {
    title: "IGCSE Math",
    author: "Mr Author",
    description: "Very Nice Book",
    downloadLink: "www.fakeurl.com",
    grade: "Grade College",
  },
  {
    title: "IGCSE Chemistry",
    author: "Mr Brian",
    description: "Very Nice Book to use for you",
    downloadLink: "www.fakeurl.com",
    grade: "Only For Smart People",
  },
  {
    title: "IGCSE Biology",
    author: "Mr Hillz",
    description: "Very Nice Book to use for you and your girlfriend",
    downloadLink: "www.fakeurl.com.com",
    grade: "MIT",
  },
];

class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      pdf_books: [],
      hc_books: [],
      uploadTopic: "Upload PDF",
    };
  }

  //Endpoints being expected to be provided
  // /filter should return an array of book objects
  // /add_book should add book

  handleNavigate = (urldata) => {
    this.setState({ uploadTopic: urldata.topic });
  };

  getDownloadurl = async (fileName, bucket) => {
    console.log("get download URL called");
    let storageRef = firebase.storage().ref();
    // let spaceRef = storageRef.child("books/" + fileName);
    let url = await storageRef.child(bucket + "/" + fileName).getDownloadURL();
    console.log("this is URL", url);
    return url;
  };

  submitBook = async (bookName, bookAuthor, description, subject, file, grade) => {
    console.log("submit book called");

    let bucket = "books";
    let storageRef = firebase.storage().ref(`${bucket}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, async (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      if (progress === 100) {
        let downloadUrl = await this.getDownloadurl(file.name, bucket);
        let splitArr = file.type.split("/");

        let body = JSON.stringify({
          title: bookName,
          author: bookAuthor,
          description: description,
          subject: subject,
          downloadUrl: downloadUrl,
          format: splitArr[splitArr.length - 1],
          gradeLevel: grade,
        });

        console.log("this is body", body);

        let upload = await fetch("/api/add_pdf", {
          method: "post",
          headers: { "Content-type": "application/json" },
          body: body,
        });
        let responseJSON = await upload.json();
        console.log("this is response", responseJSON);
      }

      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
        // case firebase.storage.TaskState.SUCCESS:
        //   console.log("Upload success");
      }
    });
  };

  submitVideo = async (videoUrl, title, description, subject, gradeLevel) => {
    let body = JSON.stringify({
      videoUrl: videoUrl,
      title: title,
      description: description,
      subject: subject,
      gradeLevel: gradeLevel,
    });

    console.log("this is body", body);

    let upload = await fetch("/api/add_youtube_video", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: body,
    });
    let responseJSON = await upload.json();
    console.log("this is response", responseJSON);
  };

  submitQuestionPaper = async (
    paperBoard,
    paperYear,
    paperMonth,
    paperNumber,
    subject,
    file,
    gradeLevel
  ) => {
    console.log("submit Question paper called");

    let bucket = "questionPapers";
    let storageRef = firebase.storage().ref(`${bucket}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, async (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      if (progress === 100) {
        let downloadUrl = await this.getDownloadurl(file.name, bucket);
        let splitArr = file.type.split("/");

        let body = JSON.stringify({
          paperBoard: paperBoard,
          paperYear: paperYear,
          paperMonth: paperMonth,
          paperNumber: paperNumber,
          subject: subject,
          downloadUrl: downloadUrl,
          format: splitArr[splitArr.length - 1],
          gradeLevel: gradeLevel,
        });

        console.log("this is body", body);

        let upload = await fetch("/api/add_question_paper", {
          method: "post",
          headers: { "Content-type": "application/json" },
          body: body,
        });
        let responseJSON = await upload.json();
        console.log("this is response", responseJSON);
      }

      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
        // case firebase.storage.TaskState.SUCCESS:
        //   console.log("Upload success");
      }
    });
  };

  submitHardCoverBook = async (
    bookName,
    bookAuthor,
    description,
    subject,
    file,
    grade,
    price,
    location,
    phoneNumber
  ) => {
    console.log("submit Hard Cover book called");

    let bucket = "images";
    let storageRef = firebase.storage().ref(`${bucket}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, async (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      if (progress === 100) {
        let imageUrl = await this.getDownloadurl(file.name, bucket);

        let body = JSON.stringify({
          title: bookName,
          author: bookAuthor,
          description: description,
          subject: subject,
          imageUrl: imageUrl,
          price: price,
          gradeLevel: grade,
          sellerLocation: location,
          sellerPhoneNumber: phoneNumber,
        });

        console.log("this is body", body);

        let upload = await fetch("/api/add_hc_book", {
          method: "post",
          headers: { "Content-type": "application/json" },
          body: body,
        });
        let responseJSON = await upload.json();
        console.log("this is response", responseJSON);
      }

      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
        // case firebase.storage.TaskState.SUCCESS:
        //   console.log("Upload success");
      }
    });
  };

  anyFilter = async (filters) => {
    console.log("anyFilter called with stuff", filters);
    let body = {};
    for (const [key, value] of Object.entries(filters)) {
      switch (key) {
        case "Grade":
          if (value !== "") {
            body["gradeLevel"] = value;
          }

          break;
        case "Price":
          if (value !== "") {
            body["price"] = value;
          }
          break;
      }
    }
    let bodySent = JSON.stringify(body);
    let books = await fetch("/api/filter", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: bodySent,
    });
    let responseJSON = await books.json();
    console.log("this is response", responseJSON);
    this.setState({ pdf_books: responseJSON.pdf_books, hc_books: responseJSON.hc_books });
  };
  subjectFilter = async (subject) => {
    console.log("subject filter called with", subject);
    let body = JSON.stringify({ subject: subject });
    let books = await fetch("/api/filter", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: body,
    });
    let responseJSON = await books.json();
    console.log("this is response", responseJSON);
    this.setState({ pdf_books: responseJSON.pdf_books, hc_books: responseJSON.hc_books });
    await navigate("/books_display");
  };

  componentDidMount() {
    // get("/api/whoami").then((user) => {
    //   if (user._id) {
    //     // they are registed in the database, and currently logged in.
    //     this.setState({ userId: user._id });
    //   }
    // });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  render() {
    return (
      <>
        <NavBar handleNavigate={this.handleNavigate} topic={this.state.uploadTopic}></NavBar>
        {/* <div className="rootAppRenderContainer"> */}
        <Router>
          <UploadBook
            path="/upload"
            submitBook={this.submitBook}
            submitHCBook={this.submitHardCoverBook}
            submitQuestionPaper={this.submitQuestionPaper}
            submitVideo={this.submitVideo}
            subjects={sampleSubjects}
            bookType="hardCover"
            topic={this.state.uploadTopic}
            gradeLevels={gradeLevels}
          />
          <SubjectFilterPage
            path="/"
            categories={sampleSubjects}
            subjectFilter={this.subjectFilter}
          />
          <BooksDisplayPage
            path="/books_display"
            tags={["Books", "Papers", "Curriculum", "Youtube"]}
            filterGroups={sampleFilterGroups}
            pdf_books={this.state.pdf_books}
            hc_books={this.state.hc_books}
            filterFunction={this.anyFilter}
          />
          <NotFound default />
        </Router>
        {/* </div> */}
      </>
    );
  }
}

export default App;
