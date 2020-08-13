import React from "react";
import "./CustomInput.css";

export default class CustomInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // active: props.locked || false,
      active: (props.locked && props.active) || false,
      // active: this.activeFunction(),
    };
  }

  changeValue(event) {
    this.props.inputFunction(event);

    const value = event.target.value;
    this.setState({ value, error: "" });
  }

  render() {
    // const { active, value, error, label } = this.state;
    const { value, error, label } = this.props;
    const { active } = this.props;

    const { locked } = this.props;
    const fieldClassName = `field ${(locked ? active : active || value) && "active"} ${
      locked && !active && "locked"
    }`;

    return (
      <div className={fieldClassName}>
        <input
          id={1}
          type="text"
          value={value}
          placeholder={label}
          onChange={this.changeValue.bind(this)}
          // onFocus={() => !locked && this.setState({ active: true })}
          // onBlur={() => !locked && !error && this.setState({ active: false })}
        />
        <label htmlFor={1} className={error && "error"}>
          {error || label}
        </label>
      </div>
    );
  }
}
