import React, { Component } from "react";
// import { BrowserRouter as Router, Link } from "react-router-dom";
import {Link, navigate} from "@reach/router";

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
  handleNavigate=(urldata)=>{
    navigate(`/upload`);
    this.props.handleNavigate(urldata);
  }
  handleClick = () => {
    if (this.state.dropdownClassName === "DropDownViewContainer") {
      this.setState({ dropdownClassName: "DropDownViewContainerAlternate" });
    } else {
      this.setState({ dropdownClassName: "DropDownViewContainer" });
    }
  };

  render() {
    return <NavBarView 
    handleNavigate={this.handleNavigate}
    handleClick={this.handleClick} dropClass={this.state.dropdownClassName} />;
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
          <Link className="NavBar-nav-link" to="/">
            Home
          </Link>
          <Link className="NavBar-nav-link" to="/about">
            About
          </Link>
          <Link className="NavBar-nav-link" to="/docs">
            Docs{" "}
          </Link>
          <div className="NavBar-nav-dropdown" onClick={props.handleClick}>
            <span className="NavBar-nav-span"> Upload Something </span>
            <DropDownView handleNavigate = {props.handleNavigate} dropClass={props.dropClass} />
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
      url: "upload",
    },
    {
      topic: "Upload Book",
      url: "uploadbook",
    },{
      topic: "Upload Paper",
      url: "uploadpaper",
    }
  ];
  let uploadsListView = uploadsList.map((upload, key) => (
    <div className="DropdownLink" key={key}   
    onClick = { () => props.handleNavigate(upload)} 
    >
      {upload.topic}
    </div>
  ));

  return <div className={props.dropClass}>{uploadsListView}</div>;
}
