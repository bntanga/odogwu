import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";

import CustomInput from "./CustomInput";
export default class UploadBook extends Component {
  constructor(props) {
    super(props);
    this.bookRef = React.createRef();
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
    };
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

  render() {
    let priceInput = (
      <CustomInput
        id={1}
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

    return (
      <div>
        <label htmlFor="myfile">Select a file:</label>
        <input
          type="file"
          id="myfile"
          name="myfile"
          // ref={this.bookRef}
          onChange={(event) => {
            console.log("this is event", event.target.files[0]);
            this.setState({ bookPath: event.target.files[0] });
          }}
        />
        <CustomInput
          id={1}
          // predicted="California"
          locked={false}
          active={false}
          value={this.state.bookName}
          label="Name of book"
          inputFunction={this.bookNameFunc}
        />
        <CustomInput
          id={1}
          // predicted="California"
          locked={false}
          active={false}
          value={this.state.bookAuthor}
          label="Author of book"
          inputFunction={this.bookAuthorFunc}
        />
        <CustomInput
          id={1}
          locked={false}
          active={false}
          value={this.state.description}
          label="Book description"
          inputFunction={this.descriptionFunc}
        />

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {this.state.subject ? this.state.subject : "Select Subject"}
          </Dropdown.Toggle>

          <Dropdown.Menu>{subjects}</Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {this.state.gradeLevel ? this.state.gradeLevel : "Select Grade Level"}
          </Dropdown.Toggle>

          <Dropdown.Menu>{gradeLevels}</Dropdown.Menu>
        </Dropdown>
        {this.props.bookType === "hardCover" ? hardCoverInputs : null}
        {this.props.bookType === "hardCover" ? (
          <div
            className={"submit-button"}
            onClick={() =>
              this.props.submitHCBook(
                this.state.bookName,
                this.state.bookAuthor,
                this.state.description,
                this.state.subject,
                this.state.bookPath,
                this.state.gradeLevel,
                this.state.price,
                this.state.sellerLocation,
                this.state.sellerPhoneNumber
              )
            }
          >
            Submit
          </div>
        ) : (
          <div
            className={"submit-button"}
            onClick={() =>
              this.props.submitBook(
                this.state.bookName,
                this.state.bookAuthor,
                this.state.description,
                this.state.subject,
                this.state.bookPath,
                this.state.gradeLevel
              )
            }
          >
            Submit
          </div>
        )}
      </div>
    );
  }
}
