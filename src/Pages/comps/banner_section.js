import React, { Component } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { imgBase } from "../../Constants/OloApi";
import * as oloApi from "../../Constants/OloApi";
import { getDataWithTypeAction } from "../../Store/Actions/restListAction";
import { d_homeDetails } from "../../Constants/dummy";
import HomeForm from "./home_form";

class BannerSection extends Component {
  state = {
    location: {
      Strloclatitude: "",
      strLocLongitude: ""
    },
    formatedAdd: {},
    pickupTime: null,
    openPicker: false,
    selectedCity: "",
    selectedArea: "",
    selectedRest: "",
    allCities: [],
    AllLocations: [],
    restList: { RestaurantDeliveryList: [], StatusCode: 0 },
    pickStatus: "pickup",
    isLocation: false,
    query: { ...oloApi.GetRestuarantListParams },
    url: oloApi.GetRestuarantList,
    errorObj: { errorMsg: "", isError: false }
  };
  static getDerivedStateFromProps() {
    return null;
  }
  render() {
    // const homeDetails = restData.homeDetails;
    const homeDetails = d_homeDetails;
    // let backImg = ``;

    return (
      <section className="block-preview">
        <div
          className="cover-banner"
          style={{
            backgroundImage: `url(${imgBase}${
              homeDetails.StrRestaurantBackImage
            }.jpg)`
          }}
        />
        <div className="container banner-contiainer">
          <div className="row">
            <div className="col-lg-8 col-md-6 col-sm-12">
              <div className="logo-container">
                <img
                  className="pc-logo img-fluid "
                  src={imgBase + homeDetails.StrRestaurantLogo + ".jpg"}
                  // src={six_degree}
                  alt="logo"
                />
              </div>
              <div className="left-text-b">
                <h1 className="title">{homeDetails.StrAccountDisplayMsg}</h1>
                <p className="safety-txt"> {homeDetails.StrDisplayText} </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <HomeForm />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = state => {
  return {
    restData: state.restListReducer,
    userData: state.userReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getData: (queryParams, url, type) =>
      dispatch(getDataWithTypeAction(queryParams, url, type))
    // getLocation: () => dispatch(getLocationAction()),
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(BannerSection);
