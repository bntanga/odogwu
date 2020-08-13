import React, { Component } from "react";
import "./SubjectFilterPage.css";

let SubjectCard = ({ image, title }) => (
  <div className="card card-container">
    <div className={"card-image"}>{image}</div>
    <div className={"subject-title"}>{title}</div>
  </div>
);

export default class SubjectFilterPage extends Component {
  //Props are list of categories
  // categories = {image: "", title: ""}
  render() {
    let categories = this.props.categories.map((item, index) => (
      <SubjectCard image={item.image} title={item.title} key={index} />
    ));

    return (
      <div className={"subject-page-container"}>
        <div className={"search-bar"}>Search</div>
        <div className={"page-container"}>{categories}</div>
      </div>
    );
  }
}
