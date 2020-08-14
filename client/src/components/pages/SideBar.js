import React, { Component, useState } from "react";
import "./SideBar.css";
import BooksDisplayPage from "./BooksDisplayPage";

let FilterGroup = ({ title, fields, manageFilters }) => {
  let [activeFilters, setActiveFilters] = useState("");

  let handleChange = (e, value) => {
    if (e.target.checked) {
      // activeFilters.push(value);
      setActiveFilters(value);
    } else {
      // const index = activeFilters.indexOf(value);
      // if (index > -1) {
      //   activeFilters.splice(index, 1);
      // setActiveFilters(activeFilters)
      setActiveFilters("");
    }
  };
  manageFilters(title, activeFilters);

  let fieldsArray = fields.map((name, index) => (
    <div key={index}>
      <input type="checkbox" id={name} name={name} onChange={(e) => handleChange(e, name)} />
      <label htmlFor={name} className={"checkbox-text"}>
        {name}
      </label>
    </div>
  ));
  return (
    <div>
      <div className={"filter-group-title"}>{title}</div>
      <div className={"checkboxes"}>{fieldsArray}</div>
    </div>
  );
};

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
    return <div className={"sidebar-container"}>{FilterGroupArray}</div>;
  }
}
