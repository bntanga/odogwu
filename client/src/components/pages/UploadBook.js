import React, { Component } from "react";

import CustomInput from "./CustomInput";
export default class UploadBook extends Component {
  //props  => submit function that submits all data to API
  state = {
    bookName: "",
    bookAuthor: "",
    description: "",
  };

  bookNameFunc = (event) => this.setState({ bookName: event.target.value });
  bookAuthorFunc = (event) => this.setState({ bookAuthor: event.target.value });
  descriptionFunc = (event) => this.setState({ description: event.target.value });
  render() {
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
        <div
          className={"submit-button"}
          onClick={() =>
            this.props.submitBook(
              this.state.bookName,
              this.state.bookAuthor,
              this.state.description
            )
          }
        >
          Submit
        </div>
      </div>
    );
  }
}
