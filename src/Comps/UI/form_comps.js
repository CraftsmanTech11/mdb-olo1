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

export const Counter = props => {
  return (
    <table className="" id="counter" style={{}}>
      <tbody>
        <tr>
          <td className="actions" onClick={props.upgrader}>
            <i className="fa fa-minus" />
          </td>
          <td className="val">{props.count}</td>
          <td className="actions" onClick={props.degrader}>
            <i className="fa fa-plus" />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
