import React, { Component, useState } from "react";
import "./SideBar.css";
import BooksDisplayPage from "./BooksDisplayPage";


function SearchBarView(){

  return(
    <div className="Side-Search-bar-accessories-container">
    <div className="Side-Search-bar-accessories">
      <input
        type="text"
        className="Side-Search-bar-input-text"
        placeholder="Search"
      ></input>
      <input type="button" className="Side-Search-bar-input-button"></input>
    </div>
  </div>

  )

}
class FilterGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { activeFilter: "" };
  }

  handleChange = async (e, value) => {
    console.log("event target checked", e.target.checked);
    if (e.target.checked) {
      // activeFilter.push(value);
      console.log("in true");
      console.log("this is value", value);
      await this.setState({ activeFilter: value });
      console.log("new active filters", this.state.activeFilter);
      // setActiveFilter(value);

      // activeFilter = value;
      // console.log("this is active filter again", activeFilter);
    } else {
      // const index = activeFilter.in
      // dexOf(value);
      // if (index > -1) {
      //   activeFilter.splice(index, 1);
      // setActiveFilter(activeFilter)
      await this.setState({ activeFilter: "" });
    }
    console.log("this is active filters", this.state.activeFilter);
    this.props.manageFilters(this.props.title, this.state.activeFilter);
  };

  render() {
    let fieldsArray = this.props.fields.map((name, index) => (
      <div className="Filter-group-checkbox-view" key={index}>
        <input type="checkbox" id={name} name={name} onChange={(e) => this.handleChange(e, name)} toggle />
        <label htmlFor={name} className={"checkbox-text"}>
          {name}
        </label>
      </div>
    ));

    return (
      <FilterGroupView fieldsArray={fieldsArray} title={this.props.title}/>
    );
  }
}

function FilterGroupView(props) {
  return(
  <div className="Filter-group-container">
    <div className="Filter-group-title">{props.title}</div>
    <div className="Filter-group-checkboxes">{props.fieldsArray}</div>
  </div>)
}

export default class SideBar extends Component {
  // props: filterGroups = [{title: "Price", fields: ["cheap", "expensive"]}, .....]

  state = {};
  filters = {};
  manageFilters = (title, activeFilter) => {
    this.filters[title] = activeFilter;
    // this.setState({});
    console.log("this is current state", this.filters);
    this.props.filterFunction(this.filters);
  };
  render() {

    let FilterGroupArray = this.props.filterGroups.map((item, index) => (
      <FilterGroup
        title={item.title}
        fields={item.fields}
        key={index}
        manageFilters={this.manageFilters}
      />
    ));
    return <div className={"sidebar-container"}>      
      <SearchBarView/>
      {FilterGroupArray}    
      </div>;
  }
}
