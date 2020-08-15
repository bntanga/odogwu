import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./NavBar.css";

var navLinkStyle = {
  fontSize: "4rem",
};

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownClassName: "DropDownViewContainerAlternate",
    };
  }
  handleClick = () => {
    if (this.state.dropdownClassName === "DropDownViewContainer") {
      this.setState({ dropdownClassName: "DropDownViewContainerAlternate" });
    } else {
      this.setState({ dropdownClassName: "DropDownViewContainer" });
    }
  };

  render() {
    return <NavBarView handleClick={this.handleClick} dropClass={this.state.dropdownClassName} />;
  }
}

{
}
function NavBarView(props) {
  return (
    <div className="nav-bar-container">
      <div className={"nav-bar-title"}>ODOGWU</div>
      <div className="NavBar-nav-container">
        <div className="NavBar-nav">
          <Link className="NavBar-nav-link" to="/about">
            About
          </Link>
          <Link className="NavBar-nav-link" to="/docs">
            Docs{" "}
          </Link>
          <div className="NavBar-nav-dropdown" onClick={props.handleClick}>
            <span className="NavBar-nav-span"> Upload Something </span>
            <DropDownView dropClass={props.dropClass} />
          </div>
        </div>
      </div>
    </div>
  );
}

function DropDownView(props) {
  let uploadsList = [
    {
      topic: "Upload YouTube",
      url: "uploadtube",
    },
    {
      topic: "Upload PDF",
      url: "uploadpdf",
    },
    {
      topic: "Book",
      url: "uploadbook",
    },
  ];
  let uploadsListView = uploadsList.map((upload, key) => (
    <Link className="DropdownLink" key={key} to={`/${upload.url}`}>
      {" "}
      {upload.topic}{" "}
    </Link>
  ));

  return <div className={props.dropClass}>{uploadsListView}</div>;
}
