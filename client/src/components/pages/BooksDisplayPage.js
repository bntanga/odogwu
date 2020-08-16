import React, { Component, useState } from "react";
import "./BooksDisplayPage.css";
import { navigate, Link } from "@reach/router";
import { saveAs } from "file-saver";

import ReactCardFlip from "react-card-flip";

import SideBar from "./SideBar";



function PdfBookCardView ({ title, author, downloadLink, description, grade }){
  return(
  <div className="PDF-book-card-container">
    <div className="PDF-book-card-container-body">
      <div className="PDF-book-card-info-tile">
        <div className="PDF-book-card-info-tile-tag">Title: </div>
        <div className="PDF-book-card-info-tile-detail">{title}</div>
      </div>
      <div className="PDF-book-card-info-tile">
        <div className="PDF-book-card-info-tile-tag">Author: </div>
        <div className="PDF-book-card-info-tile-detail">{author}</div>
      </div>
      <div className="PDF-book-card-info-tile">

        <div className="PDF-book-card-info-tile-tag">Blurb: </div>
        <div className="PDF-book-card-info-tile-detail">{description}</div>
      </div>

      <div className="PDF-book-card-info-tile">

        <div className="PDF-book-card-info-tile-tag">Grade: </div>
        <div className="PDF-book-card-info-tile-detail">{grade}</div>
      </div>
    </div>

    <div className="PDF-book-card-container-footer" onClick={() => saveAs(downloadLink, { title })}>
      Download
    </div>
  </div>
)};



function PhysicalBookCardView({
  imageUrl,
  title,
  price,
  sellerLocation,
  sellerPhoneNumber,
  author,
  description,
}) {
  const [flipped, flipCard] = useState(false);

  let flipCardClick = (e) => {
    e.preventDefault();
    console.log("prev state", flipped);
    flipped ? flipCard(false) : flipCard(true);
    console.log("card flipped", flipped);
  };
  return (
    <div className="PDF-book-card-container" onClick={flipCardClick}>
      <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
          <>
          <div style={{backgroundImage:`url(${imageUrl})`}} className="PDF-book-card-container-body-card-flip">
          </div>
          <div className={"PDF-book-card-container-footer"}>{title}</div>
          </>
        <div className="PDF-book-card-container-body-other-side">
          <div className="PDF-book-card-info-tile-other-side">
            <div className={"PDF-book-card-info-tile-tag"}>Title:</div>
            <div className={"PDF-book-card-info-tile-detail"}>{title}</div>
          </div>
          <div className="PDF-book-card-info-tile-other-side">
            <div className={"PDF-book-card-info-tile-tag"}>Author: </div>
            <div className={"PDF-book-card-info-tile-detail"}>{author}</div>
          </div>
          <div className="PDF-book-card-info-tile-other-side">
            <div className={"PDF-book-card-info-tile-tag"}>Description: </div>
            <div className={"PDF-book-card-info-tile-detail"}>{description}</div>
          </div>
          <div className="PDF-book-card-info-tile-other-side">

            <div className={"PDF-book-card-info-tile-tag"}>Price: </div>
            <div className={"PDF-book-card-info-tile-detail"}>{price}</div>
          </div>
          <div className="PDF-book-card-info-tile-other-side">
            <div className={"PDF-book-card-info-tile-tag"}>Seller Location: </div>
            <div className={"PDF-book-card-info-tile-detail"}>{sellerLocation}</div>
          </div>
          <div className="PDF-book-card-info-tile-other-side">
            <div className={"PDF-book-card-info-tile-tag"}>Seller Phone Number: </div>
            <div className={"PDF-book-card-info-tile-detail"}>{sellerPhoneNumber}</div>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
};


let Tag = ({ title }) => <div className={"tag-title"}>{title}</div>;


export default class BooksDisplayPage extends Component {

  constructor(props){
    super(props);
    this.state ={
      searchText:" ",
    }

  }

  search= async()=>{
    console.log("subject filter called with", this.props.subject);
    let body = JSON.stringify({ subject: this.props.subject, text:this.state.searchText});
    fetch("/api/subjectSearch", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: body,
    }).then( async(data)=>{  
      let aw = await data.json()
      this.props.handleSubjectSearch(aw);
    }).catch((err)=>{
      console.log(err)

    })
    // let dataJSON = data.json();
    // this.props.handleSubjectSearch(data.json());
    // console.log(dataJSON);



    // let responseJSON = await books.json();
    // console.log("this is response", responseJSON);
    // this.setState({ pdf_books: responseJSON.pdf_books, hc_books: responseJSON.hc_books });
    // await navigate("/books_display");
  }
  handleText=(ev)=>{
    this.setState({searchText:ev.target.value})
  }

  render() {
    let tags_filter = this.props.tags.map((title, index) => <Tag title={title} key={index} />);

    let pdf_books = this.props.pdf_books.map((book, index) => (
      <PdfBookCardView
        title={book.title}
        author={book.author.map((auth)=>`${auth}, `)}
        description={book.description}
        downloadLink={book.downloadUrl}
        grade={book.gradeLevel}
        key={index}
      />
    ));

    let hc_books = this.props.hc_books.map((book, index) => (
      <PhysicalBookCardView
        title={book.title}
        key={index}
        imageUrl={book.imageUrl}
        sellerPhoneNumber={book.sellerPhoneNumber}
        sellerLocation={book.sellerLocation}
        price={book.price}
        author={book.author}
        description={book.description}
      />
    ));

    return (
      <div className="Books-display-container">
        <SideBar
          filterGroups={this.props.filterGroups}
          filterFunction={this.props.filterFunction}
          searchSubject = {this.search}
          handleChange = {this.handleText}
        />
        <div className="Books-display-container-view">
          <div className="Books-display-container-view-tags-container">{tags_filter}</div>
          <div className="Books-display-container-view-items" >
            {pdf_books}
            {hc_books}
          </div>
        </div>
      </div>
    );
  }
}
