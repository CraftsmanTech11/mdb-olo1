import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import BannerSection from "./comps/banner_section";
import { MultiSlide } from "../Comps/UI/multi_slide";
import { FooterSection } from "./comps/Home_comps";
import { d_LandingPageBanner } from "../Constants/dummy";
import * as oloApi from "../Constants/OloApi";
import {
  getDataWithTypeAction,
  getLocationAction,
  getDataWithPageAction
} from "../Store/Actions/restListAction";

class OloHome extends Component {
  state = {
    location: {
      lattitute: null,
      longitude: null
    },
    isLocation: false,
    storeUpdate: { homeDetails: false },
    formatedAdd: {}
  };

  static getDerivedStateFromProps(props, state) {
    let { restData } = props;
    let { storeUpdate } = state;
    return null;
  }

  // https://shawmanolo.page.link/CafeSanchit - AccountID
  // https://shawmanolo.page.link/CafeSanchitGoa - CityID
  // https://shawmanolo.page.link/CafeSanchitAssagaon - location
  // https://shawmanolo.page.link/CafeSanchitOutlet - Restaurant

  componentDidMount = () => {
    let query = { ...oloApi.getHomeDetailsParams };
    switch (this.props.location.pathname) {
      case "/CafeSanchitGoa":
        query = { ...query, IntLocAccountId: 3385, IntLocCityId: 1190 };
        break;
      case "/CafeSanchitAssagaon":
        query = {
          ...query,
          IntLocAccountId: 3385,
          IntLocCityId: 1190,
          IntLocLocationId: 1123
        };
        break;
      case "/CafeSanchit":
        query = { ...query, IntLocAccountId: 3385 };
        this.props
          .getLocation()
          .then(obj => {
            const { Strloclatitude, strLocLongitude } = obj.payload.location;
            const loc = { Strloclatitude, strLocLongitude };
            this.props.getDataWithParams(
              loc,
              GetFormatedAddress,
              "formatedAdd",
              { minLoading: true }
            );
          })
          .catch(err => console.log(err.message));

        break;
      case "/CafeSanchitOutlet":
        query = {
          ...query,
          IntLocAccountId: 3385,
          IntLocCityId: 1190,
          IntLocLocationId: 1123,
          IntLocRestaurantId: 642477
        };
        break;

      default:
        query = { ...query, IntLocAccountId: 3385 };
        break;
    }
    let url = oloApi.getHomeDetails;
    // if(this.props.restData.allCities.length < 1)
    this.props.getData(query, url, "homeDetails");
  };

  render() {
    const galleryObj = d_LandingPageBanner;
    return (
      <div className="home-cont">
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

const mapStateToProps = state => {
  // console.log(ownProps);
  // console.log(state);
  return {
    restData: state.restListReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getData: (queryParams, url, type) =>
      dispatch(getDataWithPageAction(queryParams, url, type)),
    getDataWithParams: (queryParams, url, type, other) =>
      dispatch(getDataWithTypeAction(queryParams, url, type, other)),
    getLocation: () => dispatch(getLocationAction())
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(OloHome);
