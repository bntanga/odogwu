import React, { Component } from "react";
import "./BooksDisplayPage.css";
import { navigate, Link } from "@reach/router";
import { saveAs } from "file-saver";

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

    <div className={"download-link"} onClick={() => saveAs(downloadLink, { title })}>
      {" "}
      Download
    </div>
  </div>
);

let HCCard = ({ imageUrl, title }) => (
  <div className={"books-card-part2"}>
    <img src={imageUrl} className={"image-container"} />
    <div className={"book-title-2"}>{title}</div>
  </div>
);
let Tag = ({ title }) => <div className={"tag-title"}>{title}</div>;
export default class BooksDisplayPage extends Component {
  render() {
    let tags_filter = this.props.tags.map((title, index) => <Tag title={title} key={index} />);

    let pdf_books = this.props.pdf_books.map((book, index) => (
      <BooksCard
        title={book.title}
        author={book.author}
        description={book.description}
        downloadLink={book.downloadUrl}
        grade={book.gradeLevel}
        key={index}
      />
    ));

    let hc_books = this.props.hc_books.map((book, index) => (
      <HCCard title={book.title} key={index} imageUrl={book.imageUrl} />
    ));

    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideBar filterGroups={this.props.filterGroups} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {" "}
          <div className={"tags-container"}>{tags_filter}</div>
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", padding: "16px" }}>
            {pdf_books}
            {hc_books}
          </div>
        </div>
      </div>
    );
  }
}
