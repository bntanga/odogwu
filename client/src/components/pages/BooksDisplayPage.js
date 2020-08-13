import React, { Component } from "react";
import "./BooksDisplayPage.css";

import SideBar from "./SideBar";

let BooksCard = ({ title, author, downloadLink, description, grade }) => (
  <div className="book-card">
    <div className={"fields-container"}>
      <div className="single-field">
        {" "}
        <div className={"card-book-intro"}>Book Name: </div>{" "}
        <div className={"card-book-detail"}>{title}</div>
      </div>
      <div className="single-field">
        {" "}
        <div className={"card-book-intro"}>Author: </div>
        <div className={"card-book-detail"}>{author}</div>
      </div>
      <div className="single-field">
        {" "}
        <div className={"card-book-intro"}>Description: </div>
        <div className={"card-book-detail"}>{description}</div>
      </div>

      <div className="single-field">
        {" "}
        <div className={"card-book-intro"}>Grade: </div>
        <div className={"card-book-detail"}>{grade}</div>
      </div>
    </div>

    <div className={"download-link"}> Download</div>
  </div>
);
let Tag = ({ title }) => <div className={"tag-title"}>{title}</div>;
export default class BooksDisplayPage extends Component {
  render() {
    let tags_filter = this.props.tags.map((title, index) => <Tag title={title} key={index} />);

    let all_books = this.props.books.map((book, index) => (
      <BooksCard
        title={book.title}
        author={book.author}
        description={book.description}
        downloadLink={book.downloadLink}
        grade={book.grade}
        key={index}
      />
    ));

    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideBar filterGroups={this.props.filterGroups} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {" "}
          <div className={"tags-container"}>{tags_filter}</div>
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", padding: "16px" }}>
            {all_books}
          </div>
        </div>
      </div>
    );
  }
}
