import React, { Component, useState } from "react";
import "./BooksDisplayPage.css";
import { navigate, Link } from "@reach/router";
import { saveAs } from "file-saver";

import ReactCardFlip from "react-card-flip";

import SideBar from "./SideBar";

function PdfBookCardView({ title, author, downloadLink, description, grade }) {
  return (
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

      <div
        className="PDF-book-card-container-footer"
        onClick={() => saveAs(downloadLink, { title })}
      >
        Download
      </div>
    </div>
  );
}

function QuestionCardView({
  paperBoard,
  paperYear,
  paperMonth,
  paperNumber,
  subject,
  gradeLevel,
  downloadUrl,
}) {
  return (
    <div className="PDF-book-card-container">
      <div className="PDF-book-card-container-body">
        <div className="PDF-book-card-info-tile">
          <div className="PDF-book-card-info-tile-tag">Exam: </div>
          <div className="PDF-book-card-info-tile-detail">{paperBoard}</div>
        </div>
        <div className="PDF-book-card-info-tile">
          <div className="PDF-book-card-info-tile-tag">Year: </div>
          <div className="PDF-book-card-info-tile-detail">{paperYear}</div>
        </div>
        <div className="PDF-book-card-info-tile">
          <div className="PDF-book-card-info-tile-tag">Month: </div>
          <div className="PDF-book-card-info-tile-detail">{paperMonth}</div>
        </div>

        <div className="PDF-book-card-info-tile">
          <div className="PDF-book-card-info-tile-tag">Number: </div>
          <div className="PDF-book-card-info-tile-detail">{paperNumber}</div>
        </div>

        <div className="PDF-book-card-info-tile">
          <div className="PDF-book-card-info-tile-tag">Subject: </div>
          <div className="PDF-book-card-info-tile-detail">{subject}</div>
        </div>

        <div className="PDF-book-card-info-tile">
          <div className="PDF-book-card-info-tile-tag">Grade: </div>
          <div className="PDF-book-card-info-tile-detail">{gradeLevel}</div>
        </div>
      </div>

      <div
        className="PDF-book-card-container-footer"
        onClick={() => {
          let paperTitle = paperBoard + subject + paperYear + paperMonth;
          console.log("paper title", paperTitle);

          saveAs(downloadUrl, { paperTitle });
        }}
      >
        Download
      </div>
    </div>
  );
}

function YouTubeView(props) {
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
          <div
            // style={{ backgroundImage: `url(${imageUrl})` }}
            className="PDF-book-card-container-body-card-flip"
          >
            <iframe
              id="player"
              type="text/html"
              width="250"
              height="250"
              src={`https://www.youtube.com/embed/${props.videoUrl}`}
              frameborder="2"
            />
          </div>
          <div className={"PDF-book-card-container-footer"}>{props.title}</div>
        </>
        <div className="PDF-book-card-container-body-other-side">
          <div className="PDF-book-card-info-tile-other-side">
            <div className={"PDF-book-card-info-tile-tag"}>Title:</div>
            <div className={"PDF-book-card-info-tile-detail"}>{props.title}</div>
          </div>
          <div className="PDF-book-card-info-tile-other-side">
            <div className={"PDF-book-card-info-tile-tag"}>Subject: </div>
            <div className={"PDF-book-card-info-tile-detail"}>{props.subject}</div>
          </div>
          <div className="PDF-book-card-info-tile-other-side">
            <div className={"PDF-book-card-info-tile-tag"}>Description: </div>
            <div className={"PDF-book-card-info-tile-detail"}>{props.description}</div>
          </div>
          <div className="PDF-book-card-info-tile-other-side">
            <div className={"PDF-book-card-info-tile-tag"}>Grade Level: </div>
            <div className={"PDF-book-card-info-tile-detail"}>{props.gradeLevel}</div>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
}

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
          <div
            style={{ backgroundImage: `url(${imageUrl})` }}
            className="PDF-book-card-container-body-card-flip"
          ></div>
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
}

let Tag = ({ title, onClick }) => (
  <div className={"tag-title"} onClick={onClick}>
    {title}
  </div>
);

export default class BooksDisplayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: " ",
      activeTag: "",
    };
  }

  search = async () => {
    console.log("subject filter called with", this.props.subject);
    let body = JSON.stringify({ subject: this.props.subject, text: this.state.searchText });
    fetch("/api/subjectSearch", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: body,
    })
      .then(async (data) => {
        let aw = await data.json();
        this.props.handleSubjectSearch(aw);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleText = (ev) => {
    this.setState({ searchText: ev.target.value });
  };

  render() {
    // let tags_filter = this.props.tags.map((title, index) => <Tag title={title} key={index} />);
    let hc_book_tag = (
      <Tag
        title="Books"
        onClick={() => {
          this.setState({ activeTag: "hc_book" });
          console.log("setting active tag with", this.state.activeTag);
        }}
      />
    );
    let pdf_book_tag = (
      <Tag title="PDFs" onClick={() => this.setState({ activeTag: "pdf_book" })} />
    );
    let question_paper_tag = (
      <Tag title="Papers" onClick={() => this.setState({ activeTag: "question_paper" })} />
    );
    let youtube_video_tag = (
      <Tag title="Videos" onClick={() => this.setState({ activeTag: "youtube_videos" })} />
    );

    let pdf_books = this.props.pdf_books.map((book, index) => (
      <PdfBookCardView
        title={book.title}
        author={book.author.map((auth) => `${auth}, `)}
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

    let question_papers = this.props.question_papers.map((book, index) => (
      <QuestionCardView
        gradeLevel={book.gradeLevel}
        subject={book.subject}
        downloadUrl={book.downloadUrl}
        paperBoard={book.paperBoard}
        paperMonth={book.paperMonth}
        paperNumber={book.paperNumber}
        paperYear={book.paperYear}
        key={index}
      />
    ));

    let youtube_videos = this.props.youtube_videos.map((video, index) => (
      <YouTubeView
        key={index}
        videoUrl={video.videoUrl}
        title={video.title}
        subject={video.subject}
        description={video.description}
        gradeLevel={video.gradeLevel}
      />
    ));

    let renderItems;
    switch (this.state.activeTag) {
      case "":
        renderItems = hc_books.concat(pdf_books, question_papers, youtube_videos);
        break;
      case "hc_book":
        renderItems = hc_books;
        console.log("in hc _books");
        break;
      case "pdf_book":
        renderItems = pdf_books;
        break;
      case "question_paper":
        renderItems = question_papers;
        break;
      case "youtube_videos":
        renderItems = youtube_videos;
        break;
    }

    return (
      <div className="Books-display-container">
        <SideBar
          filterGroups={this.props.filterGroups}
          filterFunction={this.props.filterFunction}
          searchSubject={this.search}
          handleChange={this.handleText}
        />
        <div className="Books-display-container-view">
          <div className="Books-display-container-view-tags-container">
            {pdf_book_tag} {hc_book_tag} {question_paper_tag} {youtube_video_tag}
          </div>
          <div className="Books-display-container-view-items">
            {/*{pdf_books}*/}
            {/*{hc_books}*/}
            {/*{question_papers}*/}
            {/*{youtube_videos}*/}
            {renderItems}
          </div>
        </div>
      </div>
    );
  }
}
