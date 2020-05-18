import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import {
  GetHDMenuHeadListParams,
  GetHDMenuItemListParams,
  GetMenuDetailsSingleApi,
  GetMenuDetailsSingleApiParams
} from "../Constants/OloApi";
import {
  changeLocationAction,
  getDataWithTypeAction,
  getDataWithTypeAllAction,
  getDataWithPageAction
} from "../Store/Actions/restListAction";
import { RestHeader } from "./comps/rest_detail_header";
import MealTab from "./comps/meal_tab";
import { AlertDialog } from "../Comps/UI/Modal";

class RestDetails extends React.Component {
  state = {
    expanded: false,
    index: 0,
    cartTotal: 0,
    restId: 642420,
    pickupTime: "12:06",
    MenuItemListLength: 0,
    GetHDMenuItemListParams: GetHDMenuItemListParams,
    GetHDMenuHeadListParams: GetHDMenuHeadListParams,
    menuDetails: {
      MenuHeadList: [],
      MenuItemList: [],
      MenuItemModifierList: []
    },
    cartList: [],
    currentMod: [],
    checked: [0],
    isOpenDr: false,
    errorObj: { isError: false, errorMsg: "" }
  };
  static getDerivedStateFromProps(props, state) {
    let { restData } = props;
    let {
      MenuHeadList,
      MenuItemList,
      MenuItemModifierList
    } = restData.menuDetails;
    if (MenuHeadList && state.menuDetails.MenuHeadList !== MenuHeadList) {
      return {
        menuDetails: {
          ...state.menuDetails,
          MenuHeadList,
          MenuItemList,
          MenuItemModifierList
        }
      };
    }
    return null;
  }
  componentDidMount = () => {
    const { menuDetails } = this.state;
    if (menuDetails.MenuHeadList.length < 1) this.getMenuHeadList();
  };
  getMenuHeadList = () => {
    const { restId } = this.state;
    let query = {
      ...GetMenuDetailsSingleApiParams,
      IntLocRestaurantId: restId
    };
    let reqParams = { minLoading: true };
    this.props.getDataWithParams(
      query,
      GetMenuDetailsSingleApi,
      "menuDetails",
      { ...reqParams }
    );
  };

  homeDetails = this.props.restData.homeDetails;
  // selectedRest = this.homeDetails.RestaurantList[0].RestaurantDeliveryList.find((rest) => rest.RestaurantId === this.state.restId);
  selectedRest = {
    IsDeliver: 0,
    RestaurantId: 642420,
    AccountId: "524",
    GroupId: "524",
    RestaurantName: "Cafe Sanchit",
    RestaurantLogo: "RL-6166c889-b2be-4788-afe5-b85d70a7b382",
    Cuisines: "",
    Location: "",
    City: "Navi Mumbai",
    MinOrder: "180",
    MinTime: "120",
    IsRecentOrder: 1,
    TotalPledge: 0,
    Distance: "0",
    DeliveryFromTime: "0",
    DeliveryToTime: "0",
    FeedbackFacility: 0,
    MorningDeliveryFromTime: "12:00 AM",
    MorningDeliveryToTime: "12:00 AM",
    EveningDeliveryFromTime: "12:00 AM",
    EveningDeliveryToTime: "12:00 AM",
    OpeningTime: " 2:00 AM",
    ClosingTime: "12:30 PM",
    MinDeliveryTime: 120,
    HomeDeliveryPickTime: "",
    LocationId: 1162
  };

  render() {
    const { restData } = this.props;
    return (
      <section className="all-partners">
        {restData.isError ? (
          <div className="container">
            <div className="row">
              <div className="col-12">{restData.errorObj.message}</div>
            </div>
          </div>
        ) : (
          <>
            <div className="container">
              <div className="row">
                <div className="col-lg-9 col-md-12">
                  {this.selectedRest.RestaurantId && (
                    <RestHeader selectedRest={this.selectedRest} />
                  )}

                  {/* <Tab1 restObj={this.selectedRest}></Tab1> */}
                  {restData.menuDetails.MenuHeadList.length ? (
                    <>
                      {" "}
                      <MealTab />{" "}
                    </>
                  ) : (
                    <div className="content-loader1">
                      <div className="spinner-border text-primary" />
                    </div>
                  )}
                </div>
                <div className="col-lg-3 col-md-4" />
              </div>
            </div>
            <AlertDialog
              txt={this.state.errorObj.errorMsg}
              open={this.state.errorObj.isError}
              handleClose={() =>
                this.setState({
                  errorObj: { ...this.state.errorObj, isError: false }
                })
              }
            />
          </>
        )}
      </section>
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
    getDataWithParams: (queryParams, url, type, others) =>
      dispatch(getDataWithTypeAction(queryParams, url, type, others)),
    getAllDataWithParams: (queryParams, url, type, others) =>
      dispatch(getDataWithTypeAllAction(queryParams, url, type, others)),
    changeLocation: location => dispatch(changeLocationAction(location, ""))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(RestDetails);
