import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import BannerSection from "./comps/banner_section";
import { MultiSlide } from "../Comps/UI/multi_slide";
import { FooterSection } from "./comps/Home_comps";
import { d_LandingPageBanner } from "../Constants/dummy";

class OloHome extends Component {
  state = {};

  render() {
    const galleryObj = d_LandingPageBanner;
    return (
      <div>
        <BannerSection />
        <div className="gallery-section">
          <MultiSlide srcList={galleryObj.ImageAdvertisement} />
        </div>
        <div className="footer-section">
          <FooterSection />
        </div>
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
