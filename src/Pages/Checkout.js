import React from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import {
  changeLocationAction,
  getDataWithPageAction
} from "../Store/Actions/restListAction";
import { MDBBtn } from "mdbreact";
import {
  d_homeDetails,
  d_TotalAmountObj,
  d_CheckTotalAmount
} from "../Constants/dummy";
import { RestHeader } from "./comps/rest_detail_header";
import BillSection from "./comps/bill_section";
import { Cartlist } from "./comps/cart_list";
import { Progress } from "../Comps/UI/loaders";

class CheckoutPage extends React.Component {
  state = {
    isRegistered: false,
    mobile: 0,
    myCart: [],
    cartTotal: null,
    totalObj: {
      PropTotalAmount: null,
      PropTotalTax: null,
      PropTotalDiscount: 0,
      PropDeliveryChanges: 0,
      PropMessageCode: "",
      PropPubMessage: "",
      Status: null
    }
  };
  removeItem = i => {
    return null;
  };
  getOtp = i => {
    return null;
  };

  // static getDerivedStateFromProps(props, state) {
  //   let { restData } = props;
  //   let { storeUpdate } = state;
  //   return null;
  // }

  render() {
    const { restData } = this.props;
    const { myCart } = this.state;
    const restObj = d_homeDetails.RestaurantList[0].RestaurantDeliveryList[0];
    const TotalAmountObj = d_TotalAmountObj;
    return (
      <div>
        {!restData.isLoading ? (
          <section className="all-partners">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <RestHeader selectedRest={restObj} />
                </div>
                <div className="col-lg-8 col-md-8">
                  <Cartlist
                    myCart={this.state.myCart}
                    removeItem={this.removeItem}
                    cartTotal={this.state.cartTotal}
                  />

                  <div className="checkout-details">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="about-checkout">
                          <img src="images/checkout/icon-1.svg" alt="" />
                          <h4>Your Information is Safe</h4>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut iaculis at metus vitae porta.
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="about-checkout">
                          <img src="images/checkout/icon-2.svg" alt="" />
                          <h4>Secure Checkout</h4>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut iaculis at metus vitae porta.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4">
                  <BillSection
                    cartTotal={this.state.cartTotal}
                    totalObj={d_CheckTotalAmount}
                    myCart={myCart}
                  />
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="progress1" style={{ width: "100%" }}>
            <Progress />
            {/* <div className='content-loader1'>
            <div className="spinner-border text-primary" ></div>
            </div>  */}
          </div>
        )}
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
    changeLocation: location => dispatch(changeLocationAction(location, ""))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CheckoutPage);
