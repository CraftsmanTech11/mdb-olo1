import React, { Component } from "react";

export class FooterSection extends Component {
  render() {
    return (
      <div className="d-flex foot">
        <a className="label" href="#!">
          <img src="/icons/bike1.png" alt="about" className="foot-ico" />
          Track Order{" "}
        </a>
        <a className="label" href="#!">
          <img src="/icons/about.png" alt="about" className="foot-ico" />
          About Us{" "}
        </a>
        <a className="label" href="#!">
          <img src="/icons/call.png" alt="about" className="foot-ico" />
          Contact
        </a>
      </div>
    );
  }
}
