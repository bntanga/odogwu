import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import "./UploadBook.css";

import CustomInput from "./CustomInput";
export default class UploadBook extends Component {
  constructor(props) {
    super(props);
    this.bookRef = React.createRef();
    this.videoPreviewRef = React.createRef();
    this.state = {
      bookName: "",
      bookAuthor: "",
      description: "",
      subject: "",

      //Attributes for hard cover books only
      price: "",
      sellerLocation: "",
      sellerPhoneNumber: "",
      gradeLevel: "",
      //attributes for question papers
      paperYears: [
        "2020",
        "2010",
        "2011",
        "2012",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
      ],
      paperBoards: ["Cambridge", "ZIMSEC", "JAMB", "SAT", "TOEFL"],
      paperMonths: ["June", "November"],
      paperNumbers: [1, 2, 3, 4, 5, 6],
      paperYear: "",
      paperMonth: "",
      paperNumber: "",
      paperBoard: "",
      paperPath: "",

      //attributes for videos

      youtubeUrl: "",
      youtubeVideoTitle: " ",
      youtubeVideoDescription: " ",

      //question papers attributes
    };

    //attributes for videos
  }
  //props  => submit function that submits all data to API
  // List of subjects

  bookNameFunc = (event) => this.setState({ bookName: event.target.value });
  bookAuthorFunc = (event) => this.setState({ bookAuthor: event.target.value });
  descriptionFunc = (event) => this.setState({ description: event.target.value });

  //Functions for hardcover book
  priceFunc = (event) => this.setState({ price: event.target.value });
  sellerLocationFunc = (event) => this.setState({ sellerLocation: event.target.value });
  sellerPhoneNumberFunc = (event) => this.setState({ sellerPhoneNumber: event.target.value });

  setVideoUrlFunc = (event) => this.setState({ youtubeUrl: event.target.value });
  setVideoDescriptionFunc = (event) =>
    this.setState({ youtubeVideoDescription: event.target.value });
  setVideoTitleFunc = (event) => this.setState({ youtubeVideoTitle: event.target.value });

  handlePreview = () => {
    var url = this.state.youtubeUrl;
    var url_substrings = url.split("/");
    var songId = url_substrings[url_substrings.length - 1];
    //creates a youtube frame embed song id in the src url
    const youTubeframe = this.videoPreviewRef.current;
    youTubeframe.innerHTML = `<iframe id="player" type="text/html" width="250" height="250"
      src="https://www.youtube.com/embed/${songId}"
      frameborder="2"></iframe>`;
  };

  render() {
    let priceInput = (
      <CustomInput
        id={"Book Price"}
        // predicted="California"
        locked={false}
        active={false}
        value={this.state.price}
        label="Book Price"
        inputFunction={this.priceFunc}
      />
    );
    let sellerLocationInput = (
      <CustomInput
        id={"seller-location-input"}
        // predicted="California"
        locked={false}
        active={false}
        value={this.state.sellerLocation}
        label="Your Location"
        inputFunction={this.sellerLocationFunc}
      />
    );

    let sellerPhoneNumberInput = (
      <CustomInput
        id={"seller-phone-number-input"}
        // predicted="California"
        locked={false}
        active={false}
        value={this.state.sellerPhoneNumber}
        label="Your Phone Number"
        inputFunction={this.sellerPhoneNumberFunc}
      />
    );
    let hardCoverInputs = [priceInput, sellerLocationInput, sellerPhoneNumberInput];
    let subjects = this.props.subjects.map((subject, index) => (
      <Dropdown.Item
        href="#/action-1"
        key={index}
        onClick={() => this.setState({ subject: subject.title })}
      >
        {subject.title}
      </Dropdown.Item>
    ));

    let gradeLevels = this.props.gradeLevels.map((gradeLevel, index) => (
      <Dropdown.Item
        href="#/action-1"
        key={index}
        onClick={() => this.setState({ gradeLevel: gradeLevel })}
      >
        {gradeLevel}
      </Dropdown.Item>
    ));
    let paperYears = this.state.paperYears.map((paperYear, index) => (
      <Dropdown.Item
        href="#/action-1"
        key={index}
        onClick={() => this.setState({ paperYear: paperYear })}
      >
        {paperYear}
      </Dropdown.Item>
    ));
    let paperMonths = this.state.paperMonths.map((paperMonth, index) => (
      <Dropdown.Item
        href="#/action-1"
        key={index}
        onClick={() => this.setState({ paperMonth: paperMonth })}
      >
        {paperMonth}
      </Dropdown.Item>
    ));
    let paperBoards = this.state.paperBoards.map((paperBoard, index) => (
      <Dropdown.Item
        href="#/action-1"
        key={index}
        onClick={() => this.setState({ paperBoard: paperBoard })}
      >
        {paperBoard}
      </Dropdown.Item>
    ));
    let paperNumbers = this.state.paperNumbers.map((paperNumber, index) => (
      <Dropdown.Item
        href="#/action-1"
        key={index}
        onClick={() => this.setState({ paperNumber: paperNumber })}
      >
        {paperNumber}
      </Dropdown.Item>
    ));
    return (
      <>
        {(this.props.topic === "Upload PDF" || this.props.topic === "Upload Book") && (
          <UploadView
            root={this}
            subjects={subjects}
            gradeLevels={gradeLevels}
            bookType={this.props.bookType}
            hardCoverInputs={hardCoverInputs}
            topic={this.props.topic}
            submitBook={this.props.submitBook}
            submitHCBook={this.props.submitHCBook}
          />
        )}

        {this.props.topic === "Upload YouTube" && (
          <UploadYouTubeView
            root={this}
            subjects={subjects}
            gradeLevels={gradeLevels}
            bookType={this.props.bookType}
            hardCoverInputs={hardCoverInputs}
            videoPreviewRef={this.videoPreviewRef}
            handlePreview={this.handlePreview}
            submitVideo={this.props.submitVideo}
            topic={this.props.topic}
          />
        )}
        {this.props.topic === "Upload Paper" && (
          <QuestionPaperView
            root={this}
            subjects={subjects}
            gradeLevels={gradeLevels}
            paperBoards={paperBoards}
            paperNumbers={paperNumbers}
            paperYears={paperYears}
            paperMonths={paperMonths}
            topic={this.props.topic}
            submitQuestionPaper={this.props.submitQuestionPaper}
          />
        )}
      </>
    );
  }
}

function UploadView(props) {
  return (
    <div className="Upload-view-form-container">
      <div className="Upload-view-form">
        <div className="Upload-view-form-title">{props.topic}</div>
        <div className="Upload-view-form-inputs-container">
          <label className="Upload-view-form-inputs-container-label" htmlFor="myfile">
            Select a file:
          </label>
          <input
            type="file"
            id="myfile"
            name="myfile"
            className="Upload-view-form-inputs-container-input"
            // ref={this.bookRef}
            onChange={(event) => {
              console.log("this is event", event.target.files[0]);
              props.root.setState({ bookPath: event.target.files[0] });
            }}
          />
        </div>
        <CustomInput
          id={1}
          // predicted="California"
          locked={false}
          active={false}
          value={props.root.state.bookName}
          label="Name of book"
          inputFunction={props.root.bookNameFunc}
        />
        <CustomInput
          id={2}
          // predicted="California"
          locked={false}
          active={false}
          value={props.root.state.bookAuthor}
          label="Author of book"
          inputFunction={props.root.bookAuthorFunc}
        />
        <CustomInput
          id={3}
          locked={false}
          active={false}
          value={props.root.state.description}
          label="Book description"
          inputFunction={props.root.descriptionFunc}
        />

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {props.root.state.subject ? props.root.state.subject : "Select Subject"}
          </Dropdown.Toggle>

          <Dropdown.Menu>{props.subjects}</Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {props.root.state.gradeLevel ? props.root.state.gradeLevel : "Select Grade Level"}
          </Dropdown.Toggle>

          <Dropdown.Menu>{props.gradeLevels}</Dropdown.Menu>
        </Dropdown>
        {props.topic === "Upload Book" ? props.hardCoverInputs : null}
        {props.bookType === "Upload Book" ? (
          <div className="Submit-button-container">
            <div
              className={"submit-button"}
              onClick={() =>
                props.submitHCBook(
                  props.root.state.bookName,
                  props.root.state.bookAuthor,
                  props.root.state.description,
                  props.root.state.subject,
                  props.root.state.bookPath,
                  props.root.state.gradeLevel,
                  props.root.state.price,
                  props.root.state.sellerLocation,
                  props.root.state.sellerPhoneNumber
                )
              }
            >
              Submit
            </div>
          </div>
        ) : (
          <div className="Submit-button-container">
            <div
              className={"submit-button"}
              onClick={() =>
                props.submitBook(
                  props.root.state.bookName,
                  props.root.state.bookAuthor,
                  props.root.state.description,
                  props.root.state.subject,
                  props.root.state.bookPath,
                  props.root.state.gradeLevel
                )
              }
            >
              Submit
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function UploadYouTubeView(props) {
  return (
    <div className="Upload-view-form-container">
      <div className="Upload-view-form">
        <div className="Upload-view-form-title">{props.topic}</div>
        <CustomInput
          id={1}
          // predicted="California"
          locked={false}
          active={false}
          value={props.root.state.youtubeVideoTitle}
          label="Video Title"
          inputFunction={props.root.setVideoTitleFunc}
        />
        <CustomInput
          id={2}
          // predicted="California"
          locked={false}
          active={false}
          value={props.root.state.youtubeVideoDescription}
          label="Video Description"
          inputFunction={props.root.setVideoDescriptionFunc}
        />
        <CustomInput
          id={3}
          locked={false}
          active={false}
          value={props.root.state.youtubeUrl}
          label="Video url"
          inputFunction={props.root.setVideoUrlFunc}
        />
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {props.root.state.subject ? props.root.state.subject : "Select Subject"}
          </Dropdown.Toggle>

          <Dropdown.Menu>{props.subjects}</Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {props.root.state.gradeLevel ? props.root.state.gradeLevel : "Select Grade Level"}
          </Dropdown.Toggle>

          <Dropdown.Menu>{props.gradeLevels}</Dropdown.Menu>
        </Dropdown>

        <div className="PreviewVideo">
          <div className="PreviewVideoContainer" ref={props.videoPreviewRef}></div>
        </div>
        <div className="Submit-button-container-video">
          <button className={"submit-button"} onClick={() => props.root.handlePreview()}>
            Preview
          </button>

          <button
            className={"submit-button"}
            onClick={() =>
              props.submitVideo(
                props.root.state.youtubeUrl,
                props.root.state.youtubeVideoTitle,
                props.root.state.youtubeVideoDescription,
                props.root.state.subject,
                props.root.state.gradeLevel
              )
            }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

function QuestionPaperView(props) {
  return (
    <div className="Upload-view-form-container">
      <div className="Upload-view-form">
        <div className="Upload-view-form-title">{props.topic}</div>
        <div className="Upload-view-form-inputs-container">
          <label className="Upload-view-form-inputs-container-label" htmlFor="myfile">
            Select a file:
          </label>
          <input
            type="file"
            id="myfile"
            name="myfile"
            className="Upload-view-form-inputs-container-input"
            // ref={this.bookRef}
            onChange={(event) => {
              console.log("this is event", event.target.files[0]);
              props.root.setState({ paperPath: event.target.files[0] });
            }}
          />
        </div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {props.root.state.paperBoard ? props.root.state.paperBoard : "Select Exam Board"}
          </Dropdown.Toggle>

          <Dropdown.Menu>{props.paperBoards}</Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {props.root.state.paperYear ? props.root.state.paperYear : "Select Year"}
          </Dropdown.Toggle>

          <Dropdown.Menu>{props.paperYears}</Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {props.root.state.paperMonth ? props.root.state.paperMonth : "Select Month"}
          </Dropdown.Toggle>

          <Dropdown.Menu>{props.paperMonths}</Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {props.root.state.subject ? props.root.state.subject : "Select Subject"}
          </Dropdown.Toggle>

          <Dropdown.Menu>{props.subjects}</Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {props.root.state.paperNumber ? props.root.state.paperNumber : "Select Paper Number"}
          </Dropdown.Toggle>

          <Dropdown.Menu>{props.paperNumbers}</Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {props.root.state.gradeLevel ? props.root.state.gradeLevel : "Select Grade Level"}
          </Dropdown.Toggle>

          <Dropdown.Menu>{props.gradeLevels}</Dropdown.Menu>
        </Dropdown>

        <div className="Submit-button-container">
          <div
            className={"submit-button"}
            onClick={() =>
              props.submitQuestionPaper(
                props.root.state.paperBoard,
                props.root.state.paperYear,
                props.root.state.paperMonth,
                props.root.state.paperNumber,
                props.root.state.subject,
                props.root.state.paperPath,
                props.root.state.gradeLevel
              )
            }
          >
            Submit
          </div>
        </div>
      </div>
    </div>
  );
}
