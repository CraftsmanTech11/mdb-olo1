import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getDataWithTypeAction } from "../../Store/Actions/restListAction";
import { parse, isAfter, addMinutes, format } from "date-fns";
import {
  MDBTimePicker,
  MDBBtn,
  MDBInput,
  MDBFormInline,
  MDBModal
} from "mdbreact";
import { DropdownA } from "../../Comps/UI/form_comps";
import { d_homeDetails } from "../../Constants/dummy";
import TimeInput from "material-ui-time-picker";

class HomeForm extends React.Component {
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
    errorObj: { errorMsg: "", isError: false }
  };

  alertError = errorObj => {
    this.setState({ errorObj: { ...errorObj } });
  };
  handleDateChange = date => {
    const { selectedRest, pickStatus } = this.state;
    let { homeDetails } = this.props.restData;
    let { StrRestaurantDeliveryMsg } = homeDetails;
    let rest = homeDetails.RestaurantList[0].RestaurantDeliveryList.find(
      obj => obj.RestaurantId === selectedRest
    );
    let {
      HomeDeliveryPickTime,
      MinDeliveryTime,
      OpeningTime,
      ClosingTime
    } = rest;

    let now = new Date();
    let startDt = parse(OpeningTime.trim(), "h:mm a", now);
    let endDt = parse(ClosingTime.trim(), "h:mm a", now);
    let errorMsg = "";
    let isLate = isAfter(date, endDt);
    let isEarly = isAfter(startDt, date);

    if (isLate || isEarly) {
      errorMsg = homeDetails.StrRestaurantClosedMsg.replace(
        "{{MorningTime}}",
        OpeningTime
      ).replace("{{EveningTime}}", ClosingTime);
      this.alertError({ isError: true, errorMsg });
    } else if (pickStatus === "pickup") {
      // sometimes fmtest brings empty string here
      let HomeDeliveryPickTime2 = HomeDeliveryPickTime.length
        ? parseInt(HomeDeliveryPickTime)
        : 0;
      let availablePick = addMinutes(date, HomeDeliveryPickTime2);
      if (date <= availablePick) {
        errorMsg =
          "pickup" +
          StrRestaurantDeliveryMsg.replace(
            "{{minute}}",
            HomeDeliveryPickTime
          ).replace("{{time}}", format(availablePick, "hh:mm"));
        this.alertError({ isError: true, errorMsg });
      }
    } else if (pickStatus === "delivery") {
      let availableDel = addMinutes(date, MinDeliveryTime);
      if (date <= availableDel) {
        errorMsg = StrRestaurantDeliveryMsg.replace(
          "{{minute}}",
          MinDeliveryTime
        ).replace("{{time}}", format(availableDel, "hh:mm"));
        this.alertError({ isError: true, errorMsg });
      }
    } else {
      this.setState({
        ...this.state,
        pickupTime: date
      });
    }
  };
  handlePickupDelivery = e => {
    let pickStatus = e;
    this.setState({
      ...this.state,
      pickStatus
    });
  };
  handleChangeRest = event => {
    let { value, name } = event.target,
      { selectedArea, pickStatus } = this.state,
      nVal = parseInt(value),
      HomeDetails = this.props.restData.homeDetails,
      restObj = HomeDetails.RestaurantList[0].RestaurantDeliveryList.find(
        obj =>
          obj.RestaurantId === nVal && obj.LocationId === Number(selectedArea)
      );
    this.setState({ [name]: nVal, restObj });
    let {
      HomeDeliveryPickTime,
      MinDeliveryTime,
      OpeningTime,
      ClosingTime
    } = restObj;

    let now = new Date();
    let startDt = parse(OpeningTime.trim(), "h:mm a", now);
    let endDt = parse(ClosingTime.trim(), "h:mm a", now);
    if (pickStatus === "pickup") {
      let HomeDeliveryPickTime2 = HomeDeliveryPickTime.length
        ? parseInt(HomeDeliveryPickTime)
        : 0;
      let availablePick = addMinutes(now, HomeDeliveryPickTime2);
      let isLate = isAfter(availablePick, endDt);
      let isEarly = isAfter(startDt, availablePick);
      if (isLate || isEarly || !availablePick) {
        return;
      } else {
        this.setState({ pickupTime: availablePick });
      }
    } else if (pickStatus === "delivery") {
      let availableDel = addMinutes(now, MinDeliveryTime);
      let isLate = isAfter(availableDel, endDt);
      let isEarly = isAfter(startDt, availableDel);
      if (isLate || isEarly || !availableDel) {
        return;
      } else {
        this.setState({ pickupTime: availableDel });
      }
    }
  };
  handleChangeCity = e => {
    let { value, name } = e.target,
      nVal = parseInt(value),
      HomeDetails = this.props.restData.homeDetails,
      area = HomeDetails.LocationList.find(obj => obj.CityId === nVal);
    this.setState({ [name]: nVal, selectedArea: area.LocationId });
  };
  handleChangeLocation = event => {
    let { name, value } = event.target,
      nVal = Number(value);
    this.setState({ [name]: nVal });
  };
  getMenuList = e => {
    e.preventDefault();

    const { selectedCity, selectedArea, selectedRest, pickupTime } = this.state;
    if (selectedCity === "") {
      let errorObj = { errorMsg: "Please Select the City", isError: true };
      this.alertError(errorObj);
      return;
    } else if (selectedArea === "") {
      let errorObj = { errorMsg: "Please Select the Area", isError: true };
      this.alertError(errorObj);
      return;
    } else if (selectedRest === "") {
      let errorObj = {
        errorMsg: "Please Select the Restaurant",
        isError: true
      };
      this.alertError(errorObj);
      return;
    } else if (pickupTime === null) {
      let errorObj = {
        errorMsg: "Please Select the Pickup Time",
        isError: true
      };
      this.alertError(errorObj);
      return;
    } else {
      this.props.history.push({
        pathname: "/restdetail/" + this.state.selectedRest,
        state: {
          restId: this.state.selectedRest,
          pickStatus: this.state.pickStatus,
          pickupTime: this.state.pickupTime
        }
      });
    }
  };
  render() {
    const homeDetails = d_homeDetails;
    return (
      <div>
        <div className="form-box">
          <DropdownA
            value={this.state.selectedCity}
            handleChange={this.handleChangeCity}
            name="selectedCity"
            label="City"
          >
            {homeDetails.CityList.map((obj, i) => (
              <option key={i} value={obj.CityId}>
                {obj.CityName}
              </option>
            ))}
          </DropdownA>
          <DropdownA
            value={this.state.selectedArea}
            handleChange={this.handleChangeLocation}
            name="selectedArea"
            label="Area"
            disabled={false}
          >
            {homeDetails.LocationList.map((obj, i) => {
              return Number(this.state.selectedCity) === obj.CityId ? (
                <option key={i} value={obj.LocationId}>
                  {obj.LocationName}
                </option>
              ) : null;
            })}
          </DropdownA>
          <DropdownA
            value={this.state.selectedRest}
            handleChange={this.handleChangeRest}
            name="selectedRest"
            label="Restaurant"
            disabled={false}
          >
            {homeDetails.RestaurantList[0].RestaurantDeliveryList.map(
              (obj, i) => {
                return obj.LocationId === Number(this.state.selectedArea) ? (
                  <option key={i} value={obj.RestaurantId}>
                    {" "}
                    {obj.RestaurantName}{" "}
                  </option>
                ) : null;
              }
            )}
          </DropdownA>
          <div className="time-pick">
            <TimeInput
              mode="12h"
              value={this.state.pickupTime}
              onChange={time => this.handleDateChange(time)}
              open={this.state.openPicker}
              placeholder="pickup time"
            />
          </div>

          <div className="radios2">
            <MDBFormInline>
              <MDBInput
                gap
                onClick={() => this.handlePickupDelivery("pickup")}
                checked={this.state.pickStatus === "pickup" ? true : false}
                label="Pickup"
                type="radio"
                id="pickup"
                containerClass="mr-5"
              />
              <MDBInput
                gap
                onClick={() => this.handlePickupDelivery("delivery")}
                checked={this.state.pickStatus === "delivery" ? true : false}
                label="Delivery"
                type="radio"
                id="delivery"
                containerClass="mr-5"
              />
            </MDBFormInline>
          </div>
          <button className="search-btn" onClick={this.getMenuList}>
            Place Order
          </button>
        </div>
      </div>
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
)(HomeForm);
