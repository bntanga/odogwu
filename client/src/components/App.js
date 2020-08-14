import React, { Component } from "react";
import { Router } from "@reach/router";
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
];

let sampleFilterGroups = [
  { title: "Price", fields: ["high", "low"] },
  { title: "Grade", fields: ["Advanced Level", "Ordinary Level"] },
];

let sampleFilterSubjects = ["Physics", "Chemistry", "Biology", "Geography"];
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
      all_books: [],
    };
  }

  //Endpoints being expected to be provided
  // /filter should return an array of book objects
  // /add_book should add book

  getDownloadurl = async (fileName) => {
    console.log("get download URL called");
    let storageRef = firebase.storage().ref();
    // let spaceRef = storageRef.child("books/" + fileName);
    let url = await storageRef.child("books/" + fileName).getDownloadURL();
    console.log("this is URL", url);
    return url;
  };

  submitBook = async (bookName, bookAuthor, description, subject, file) => {
    console.log("submit book called");

    let bucket = "books";
    let storageRef = firebase.storage().ref(`${bucket}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, async (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      if (progress === 100) {
        let downloadUrl = await this.getDownloadurl(file.name);
        let body = JSON.stringify({
          title: bookName,
          author: bookAuthor,
          description: description,
          subject: subject,
          downloadUrl: downloadUrl,
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
  subjectFilter = async (subject) => {
    let body = { subject: subject };
    let books = await fetch("/api/filter", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: body,
    });
    let responseJSON = await books.json();
    this.setState({ all_books: responseJSON });
  };

  componentDidMount() {
    // get("/api/whoami").then((user) => {
    //   if (user._id) {
    //     // they are registed in the database, and currently logged in.
    //     this.setState({ userId: user._id });
    //   }
    // });
  }

  uploadToFirebase = (file) => {
    let bucket = "books";
    let storageRef = firebase.storage().ref(`${bucket}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
      let downloadUrl = uploadTask.snapshot.downloadURL;
      console.log("this is download URL", downloadUrl);
    });
  };

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
        <NavBar />
        <Router>
          <UploadBook path="/" submitBook={this.submitBook} subjects={sampleFilterSubjects} />
          <SubjectFilterPage
            categories={sampleSubjects}
            path="/sub"
            subjectFilter={this.subjectFilter}
          />
          <BooksDisplayPage
            tags={["Books", "Papers", "Curriculum", "Youtube"]}
            path="/disp"
            filterGroups={sampleFilterGroups}
            books={sampleBooks}
          />

          {/*<Skeleton*/}
          {/*  path="/"*/}
          {/*  handleLogin={this.handleLogin}*/}
          {/*  handleLogout={this.handleLogout}*/}
          {/*  userId={this.state.userId}*/}
          {/*/>*/}

          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;
