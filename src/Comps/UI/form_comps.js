import React, { Component } from "react";

export class DropdownA extends Component {
  render() {
    return (
      <div>
        <select className="browser-default custom-select">
          {this.props.children}
        </select>
      </div>
    );
  }
}
