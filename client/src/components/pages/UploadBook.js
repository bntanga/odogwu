import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";

import CustomInput from "./CustomInput";
export default class UploadBook extends Component {
  //props  => submit function that submits all data to API
  // List of subjects
  state = {
    bookName: "",
    bookAuthor: "",
    description: "",
    subject: "",
  };

  bookNameFunc = (event) => this.setState({ bookName: event.target.value });
  bookAuthorFunc = (event) => this.setState({ bookAuthor: event.target.value });
  descriptionFunc = (event) => this.setState({ description: event.target.value });
  render() {
    let subjects = this.props.subjects.map((subject, index) => (
      <Dropdown.Item
        href="#/action-1"
        key={index}
        onClick={() => this.setState({ subject: subject })}
      >
        {subject}
      </Dropdown.Item>
    ));

    return (
      <div>
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

          <Dropdown.Menu>
            {/*<Dropdown.Item href="#/action-1">Action</Dropdown.Item>*/}
            {/*<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>*/}
            {/*<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>*/}
            {subjects}
          </Dropdown.Menu>
        </Dropdown>
        <div
          className={"submit-button"}
          onClick={() =>
            this.props.submitBook(
              this.state.bookName,
              this.state.bookAuthor,
              this.state.description,
              this.state.subject
            )
          }
        >
          Submit
        </div>
      </div>
    );
  }
}
