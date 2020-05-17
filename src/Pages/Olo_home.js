import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import BannerSection from "./comps/banner_section";
// import { HowtoSection } from "./Home_comps";

class OloHome extends Component {
  state = {};

  render() {
    return (
      <div>
        <BannerSection />
        {/* <HowtoSection /> */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {};
};

export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(OloHome);
