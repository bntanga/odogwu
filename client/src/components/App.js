import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Skeleton from "./pages/Skeleton.js";
import Navbar from "./pages/NavBar.js";

import SubjectFilterPage from "./pages/SubjectFilterPage";
import BooksDisplayPage from "./pages/BooksDisplayPage";

import "../utilities.css";

import { socket } from "../client-socket.js";

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
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
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
        <NavBar />
        <Router>
          <SubjectFilterPage categories={sampleSubjects} path="/sub" />
          <BooksDisplayPage
            tags={["Books", "Papers", "Curriculum", "Youtube"]}
            path="/"
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
