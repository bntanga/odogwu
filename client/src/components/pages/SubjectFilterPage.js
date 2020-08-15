import React, { Component } from "react";
import "./SubjectFilterPage.css";


export default class SubjectFilterPage extends Component {

  render() {
    let categories = this.props.categories.map((item, index) => (
      <div onClick={() => this.props.subjectFilter(item.title)} key={index}>
        {" "}
        <SubjectCardView image={item.image} title={item.title} />
      </div>
    ));

    return (
      <div className={"subject-page-container"}>
        <div className="Search-bar-accessories-container">
          <div className="Search-bar-accessories">
            <input
              type="text"
              className="Search-bar-input-text"
              placeholder="Search a Subject"
            ></input>
            <input type="button" className="Search-bar-input-button"></input>
          </div>
        </div>
        <div className="Card-holder">{categories}</div>
      </div>
    );
  }
}

function SubjectCardView(props) {
  return (
    <div className="Card-container">
      <div className="Card-container-header">

      </div>
      <div className="Card-container-body">
        {props.title}
      </div>
    </div>
  );
}