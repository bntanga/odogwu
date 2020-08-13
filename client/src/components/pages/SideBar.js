import React, { Component } from "react";
import "./SideBar.css";

let FilterGroup = ({ title, fields }) => {
  let fieldsArray = fields.map((name, index) => (
    <div key={index}>
      <input type="checkbox" id={name} name={name} />
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
  render() {
    let FilterGroupArray = this.props.filterGroups.map((item, index) => (
      <FilterGroup title={item.title} fields={item.fields} key={index} />
    ));
    return <div className={"sidebar-container"}>{FilterGroupArray}</div>;
  }
}
