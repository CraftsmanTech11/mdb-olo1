import React, { useState } from "react";
import {
  MDBContainer,
  MDBCollapse,
  MDBCard,
  MDBCardBody,
  MDBCollapseHeader,
  MDBInput,
  MDBBtn
} from "mdbreact";

export default function CustomizedExpansionPanels(props) {
  const [collapseID, setcollapseID] = useState("collapse3");
  const [Mob, setMob] = useState("");
  const [PayMethod, setPayMethod] = useState("");
  const [Add, setAdd] = useState({ home: "", line1: "", pin: "" });
  const [errorObj, setErr] = useState({ home: "", line1: "", pin: "" });
  const [Otp, setOtp] = useState(0);
  const [MobConfirm, setMobConfirm] = useState(true);

  const toggleCollapse = collapseID => () =>
    setcollapseID(prevState =>
      prevState.collapseID !== collapseID ? collapseID : ""
    );

  const getOtp = () => {};
  const ChangePayMethod = e => () => {
    setPayMethod(e);
  };
  const handleChangeAdd = e => {
    let { name, value } = e.target.name;
    name !== "pin"
      ? setAdd({ ...Add, [name]: value })
      : setAdd({ ...Add, pin: value.parseInt() });
  };
  const setAddress = e => {
    e.preventDefault();
  };
  return (
    <div id="bill-section">
      <MDBContainer className="md-accordion mt-5">
        <MDBCard className="mt-3">
          <MDBCollapseHeader
            tagClassName="d-flex justify-content-between"
            onClick={() => toggleCollapse("collapse1")}
          >
            <header>
              <h4>Your Order</h4>
            </header>
            <i
              className={
                collapseID === "collapse1"
                  ? "fa fa-chevron-up"
                  : "fa fa-chevron-down"
              }
            />
          </MDBCollapseHeader>
          <MDBCollapse id="collapse1" isOpen={collapseID}>
            <MDBCardBody>
              <div className="your-order">
                {props.myCart.length &&
                  props.myCart.map((item, i) => {
                    let MenuItem = item.MenuItem;
                    return (
                      <div key={i} className="order-d">
                        <div className="item-dt-left">
                          <span> {MenuItem.PropPubMenuItemDescription} </span>
                        </div>
                        <div className="item-dt-right">
                          <p>{item.ProPubIntQty}</p>
                        </div>
                        <div className="item-dt-right">
                          <p>
                            <span className="rupee" />
                            <span> {item.PropPubRate.toFixed(2)} </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}

                <div className="order-d">
                  <div className="item-dt-left">
                    <span>Item Total</span>
                  </div>
                  <div className="item-dt-right">
                    <p> {props.cartTotal} </p>
                  </div>
                </div>
                <div className="order-d">
                  <div className="item-dt-left">
                    <span>Taxes</span>
                  </div>
                  <div className="item-dt-right">
                    <p> {props.totalObj.PropTotalTax} </p>
                  </div>
                </div>
                <div className="order-d text-success">
                  <div className="item-dt-left">
                    <span className="text-success">Delivery Charges</span>
                  </div>
                  <div className="item-dt-right">
                    {props.totalObj.PropDeliveryChanges === 0 ? (
                      <p className="text-success">Free</p>
                    ) : (
                      <p> {props.totalObj.PropDeliveryChanges} </p>
                    )}
                  </div>
                </div>
                <div className="total-bill">
                  <div className="total-bill-text">
                    <h5>Grand Total</h5>
                  </div>
                  <div className="total-bill-payment">
                    <p> {props.totalObj.PropTotalAmount} </p>
                  </div>
                </div>
              </div>
            </MDBCardBody>
          </MDBCollapse>
        </MDBCard>
        <MDBCard className="mt-3">
          <MDBCollapseHeader
            tagClassName="d-flex justify-content-between"
            onClick={() => toggleCollapse("collapse2")}
          >
            <header>
              <h4>Login / SignUp </h4>
              <h5> Please Login or Create account with us </h5>
            </header>
            <i
              className={
                collapseID === "collapse2"
                  ? "fa fa-chevron-up"
                  : "fa fa-chevron-down"
              }
            />
          </MDBCollapseHeader>
          <MDBCollapse id="collapse2" isOpen={collapseID}>
            <MDBCardBody>
              <div className="right-contact-dt">
                <div className="form-group">
                  <div className="input-field">
                    <input
                      type="tel"
                      className="confirm-form"
                      id="telNumber"
                      placeholder="Phone Number"
                      value={props.mobile}
                      onChange={e => setMob(e.target.value)}
                    />
                    <i className="fas fa-mobile-alt" />
                  </div>
                </div>
                <div>
                  <MDBBtn color="primary" onClick={getOtp}>
                    Continue
                  </MDBBtn>
                </div>
              </div>
            </MDBCardBody>
          </MDBCollapse>
        </MDBCard>
        <MDBCard className="mt-3">
          <MDBCollapseHeader
            tagClassName="d-flex justify-content-between"
            onClick={() => toggleCollapse("collapse3")}
          >
            <header>
              <h4>Delivery Address </h4>
              <h5> Login to choose address </h5>
            </header>
            <i
              className={
                collapseID === "collapse3"
                  ? "fa fa-chevron-up"
                  : "fa fa-chevron-down"
              }
            />
          </MDBCollapseHeader>
          <MDBCollapse id="collapse3" isOpen={collapseID}>
            <MDBCardBody>
              <div className="right-address">
                <form onSubmit={setAddress}>
                  <div className="form-group">
                    <label htmlFor="houseInput"> Flat No. / House No.</label>
                    <input
                      id="houseInput"
                      className="form-control"
                      name="home"
                      value={Add.home}
                      onChange={handleChangeAdd}
                    />
                  </div>
                  <div className="form-group" />
                  <div className="form-group">
                    <label htmlFor="add1">Address Line 1</label>
                    <textarea
                      id="add1"
                      name="line1"
                      className="form-control"
                      value={Add.line1}
                      onChange={handleChangeAdd}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="add1">Address Line 1</label>
                    <input
                      className="form-control"
                      id="Pincode"
                      label="Pincode"
                      variant="outlined"
                      name="pin"
                      value={Add.pin}
                      onChange={handleChangeAdd}
                      type="number"
                      max-length={6}
                      placeholder="Pincode"
                    />
                  </div>
                  <div>
                    <MDBBtn color="primary" onClick={getOtp}>
                      Continue
                    </MDBBtn>
                  </div>
                </form>
              </div>
            </MDBCardBody>
          </MDBCollapse>
        </MDBCard>
        <MDBCard className="mt-3">
          <MDBCollapseHeader
            tagClassName="d-flex justify-content-between"
            onClick={() => toggleCollapse("collapse4")}
          >
            <header>
              <h4>Payment Method </h4>
              <h5> Login and select address for payment </h5>
            </header>
            <i
              className={
                collapseID === "collapse4"
                  ? "fa fa-chevron-up"
                  : "fa fa-chevron-down"
              }
            />
          </MDBCollapseHeader>
          <MDBCollapse id="collapse4" isOpen={collapseID}>
            <MDBCardBody>
              <div className="right-payment-method">
                <MDBContainer className="mt-5">
                  <MDBInput
                    gap
                    onClick={ChangePayMethod("cod")}
                    checked={PayMethod === "cod" ? true : false}
                    label="Cash On Delivery"
                    type="radio"
                    id="radio1"
                  />
                  <MDBInput
                    gap
                    onClick={ChangePayMethod("wallet")}
                    checked={PayMethod === "wallet" ? true : false}
                    label="Wallet"
                    type="radio"
                    id="radio2"
                    disabled
                  />
                  <MDBInput
                    gap
                    onClick={ChangePayMethod("online")}
                    checked={PayMethod === "online" ? true : false}
                    label="Online Payment"
                    type="radio"
                    id="radio3"
                  />
                </MDBContainer>
                <div className="checkout-btn">
                  <button type="submit" className="chkout-btn btn-link">
                    Checkout Now
                  </button>
                </div>
              </div>
            </MDBCardBody>
          </MDBCollapse>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}
