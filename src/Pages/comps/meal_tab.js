import React from "react";
import { MDBBtn,MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import {
  HDCheckTotalAmountParams,
  HDCheckTotalAmount
} from "../../Constants/OloApi";
import { d_TotalAmountObj } from "../../Constants/dummy";
import {
  getDataWithTypeAction,
  getDataWithPageAction
} from "../../Store/Actions/restListAction";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Counter } from "../../Comps/UI/form_comps";

const ModsDrawer = props => {
  let menu = props.currentMod.menu,
    Modifier = props.currentMod.Modifier;

  return (
    <div
      open={props.isOpenDr}
      onClose={() => props.toggleDrawer(false)}
    >
      <header className="border-bottom p-2 px-3">
        <div className="float-right">
          <MDBBtn
            outline
            onClick={() =>
              props.addMenuToCart(props.currentMod.hid, props.currentMod.mid)
            }
            color="primary"
          >
            {`Add - `}
            <span className="rupee" />$
            {menu.PropPubRate && menu.PropPubRate.toFixed(2)}
          </MDBBtn>{" "}
          <MDBBtn
            outline
            onClick={() => props.toggleDrawer(false)}
            color="primary"
          >
            cancel
          </MDBBtn>
        </div>
        <h3>{menu.PropPubMenuItemDescription}</h3>

        <h4 className="text-muted">{menu.PropPubMenuItemlineDescription}</h4>
      </header>
      <div
        style={{
          width: "100%",
          height: "60vh",
          overflowY: "auto"
        }}
      >
        {Modifier.map((value, i) => {
          return (
            <div class="custom-control custom-checkbox" key={i}>
              <input
                type="checkbox"
                checked={props.checked.indexOf(i) !== -1}
                onChange={() => props.handleToggleMod(i)}
                class="custom-control-input"
                id="defaultUnchecked"
              />
              <label class="custom-control-label" for="defaultUnchecked">
                {" "}
                {value.ModifierName}{" "}
              </label>
              <div>
                {" "}
                <span className="rupee" /> {value.Price}{" "}
              </div>
            </div>
          );
        })}
      </div>
      )})}
    </div>
  );
};
class MealTab extends React.Component {
  state = {
    menuTabValue: 'head0',
    searchKey: "",
    isDialogeOpen: false,
    filter: { isVeg: false },
    cartTotal: 0,
    myCart: [],
    itemAmt: 0,
    itemQty: 1,
    value: 0,
    MenuItemList: this.props.restData.menuDetails.MenuItemList,
    MenuItemModifier: [],
    checked: [],
    isOpenDr: false,
    modsData: [],
    currentMod: { menu: { Modifier: [] }, hid: "", mid: "", Modifier: [] }
  };

  toggleCounter = (headId, menuId) => {
    const { actMenu } = this.getActive(headId, menuId);

    let itemIndex = this.state.myCart.findIndex(
      obj => obj.MenuItem === actMenu
    );
    return itemIndex;
  };
  //checklist
  handleToggleMod = value => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({ checked: newChecked });
  };

  addMenuToCart = (hid, mid) => {
    const { actMenu, actHead } = this.getActive(hid, mid);
    if (actHead.PropPubModifierLinked === "0") {
      //cart Item
      let cartItem = {
        ProPubStrMenuItemCode: actMenu.PropMenuItemCode,
        ProPubIntQty: 1,
        ProPubIntMenuComboModifier: 0,
        ProPubStrCurrentIncomeHeadCode: actMenu.PropPubIncomeHeadCode,
        ProPubIntSelectedRowIndex: this.state.myCart.length,
        ProPubSessionId: "e198fa90-92d5-11ea-d69c-450d36e5fca4",
        ProPubStrPreModifierCode: "",
        PropPubRate: actMenu.PropPubRate
      };
      let cartItemExt = {
        ...cartItem,
        PropPubPrice: actMenu.PropPubRate,
        MenuItem: actMenu
      };
      let cartTotal = this.state.cartTotal + actMenu.PropPubRate;
      this.setState({
        ...this.state,
        myCart: [...this.state.myCart, cartItemExt],
        cartTotal
      });
    } else {
      this.showMods(hid, mid);
    }
  };

  //mods
  showMods = (hid, mid) => {
    const { actMenu, actHead, actMod } = this.getActive(hid, mid);
    this.setState({
      currentMod: { Modifier: actMod, hid, mid, menu: actMenu },
      isOpenDr: true,
      checked: []
    });
  };

  gotoCheck = () => {
    let myCart = [...this.state.myCart];
    let restData = this.props.restObj;
    let PropMenuItemDetails = [];
    let PropCounterSaleOrderDetail = [
      {
        ProPubSessionId: "c57f63a0-86ee-11ea-c844-fb0db4c93d3e",
        ProPubStrPaymode: "C"
      }
    ];
    myCart.forEach((item, i) => {
      const { MenuItem } = item;
      let saleItem = {
        ProPubStrMenuItemCode: MenuItem.PropMenuItemCode,
        ProPubIntQty: item.ProPubIntQty,
        ProPubStrCurrentIncomeHeadCode: MenuItem.PropPubIncomeHeadCode,
        ProPubStrPreModifierCode: "",
        ProPubIntMenuComboModifier: 0,
        ProPubIntSelectedRowIndex: i,
        ProPubSessionId: "a2d01780-8eb6-11ea-c357-2da7f6b1762d"
      };
      PropMenuItemDetails.push(saleItem);
    });
    let queryParams = {
      ...HDCheckTotalAmountParams,
      IntLocRestaurantId: restData.RestaurantId,
      strLocOrderDate: new Date().toDateString(),
      PropMenuItemDetails,
      PropCounterSaleOrderDetail
    };
    this.props.getDataWithParams(
      queryParams,
      HDCheckTotalAmount,
      "TotalAmountObj"
    );
    const TotalAmountObj = d_TotalAmountObj;
    this.props.history.push({
      pathname: "/checkout",
      state: {
        restObj: restData,
        TotalAmountObj,
        myCart: this.state.myCart
      }
    });
  };

  toggleDrawer = isTrue => {
    this.setState({ isOpenDr: isTrue });
  };
  minusMenuQty = (headId, menuId) => {
    const { actMenu: MenuItem } = this.getActive(headId, menuId);
    // 1. Make a shallow copy of the items
    let items = [...this.state.myCart];
    let itemIndex = items.findIndex(
      obj =>
        obj.ProPubStrMenuItemCode == menuId &&
        obj.MenuItem.PropPubMenuHeadCode == headId
    );
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...items[itemIndex] };
    // 3. Replace the property you're intested in
    if (item.ProPubIntQty > 1) {
      item.ProPubIntQty -= 1;
      item.PropPubPrice -= MenuItem.PropPubRate;
      if (item.addonList && item.addonList.length) {
        item.addonPrice -= item.addonRate;
        item.addonList.forEach(tem => (tem.ProPubIntQty -= 1));
        items[itemIndex] = item;
        this.setState({
          myCart: items,
          cartTotal:
            this.state.cartTotal - (MenuItem.PropPubRate + item.addonRate)
        });
      } else {
        items[itemIndex] = item;
        this.setState({
          myCart: items,
          cartTotal: this.state.cartTotal - MenuItem.PropPubRate
        });
      }
    } else {
      items.splice(itemIndex, 1);
      if (item.addonList && item.addonList.length) {
        this.setState({
          myCart: items,
          cartTotal: this.state.cartTotal - item.PropPubRate - item.addonRate
        });
      } else {
        this.setState({
          myCart: items,
          cartTotal: this.state.cartTotal - item.PropPubRate
        });
      }
    }
  };

  plusMenuQty = (headId, menuId) => {
    const { actMenu, actHead, actMod } = this.getActive(headId, menuId);

    if (actHead.PropPubModifierLinked === "1") {
      this.showMods(headId, menuId);
    } else {
      let items = [...this.state.myCart];
      let itemIndex = items.findIndex(
        obj =>
          obj.ProPubStrMenuItemCode == menuId &&
          obj.MenuItem.PropPubMenuHeadCode == headId
      );
      let item = { ...items[itemIndex] };
      item.ProPubIntQty += 1;
      item.PropPubPrice += actMenu.PropPubRate;
      let cartTotal = this.state.cartTotal + item.PropPubRate;
      items[itemIndex] = item;
      this.setState({ myCart: items, cartTotal });
    }
  };

  //for tabs change handling
  handleChangeMenuTab = ( menuTabValue) => {
    this.setState({
      ...this.state,
      menuTabValue
    });
  };

  addMenuToCartWithAddon = (hid, mid) => {
    const { actMenu: MenuItem, actHead, actMod } = this.getActive(hid, mid);
    //cart Item
    let cartItem = {
      ProPubStrMenuItemCode: MenuItem.PropMenuItemCode,
      ProPubIntQty: 1,
      ProPubIntMenuComboModifier: 0,
      ProPubStrCurrentIncomeHeadCode: MenuItem.PropPubIncomeHeadCode,
      ProPubIntSelectedRowIndex: this.state.myCart.length,
      ProPubSessionId: "e198fa90-92d5-11ea-d69c-450d36e5fca4",
      ProPubStrPreModifierCode: "",
      PropPubRate: MenuItem.PropPubRate,
      MenuItem
    };

    let addonList = [],
      price = 0;
    this.state.checked.length &&
      this.state.checked.forEach(add => {
        let mod = this.state.currentMod.Modifier[add];
        price += mod.Price;
        let addObj = {
          ProPubIntMenuComboModifier: "0",
          ProPubStrItemDescription: mod.ModifierName,
          ProPubBoolIsAllowChange: mod.AllowChange,
          ProPubStrModifierQtyCode: "0",
          ProPubStrPreModifierCode: "",
          ProPubIntQty: 1,
          ProPubStrModifierCode: mod.ModifierCode.toString(),
          ProPubSessionId: "e198fa90-92d5-11ea-d69c-450d36e5fca4",
          ProPubIntSelectedRowIndex: this.state.myCart.length
        };
        addonList.push(addObj);
      });
    let saleItem = {
      ...cartItem,
      addonList,
      addonRate: price,
      addonPrice: price
    };
    let cartTotal =
      this.state.cartTotal + MenuItem.PropPubRate + saleItem.addonPrice;
    this.setState({
      ...this.state,
      myCart: [...this.state.myCart, saleItem],
      cartTotal,
      checked: []
    });
    this.toggleDrawer(false);
  };
  filterBy = value => {
    let { filter } = this.state;
    let isTrue = filter[value];
    let filteredList = this.state.MenuItemList;
    if (!isTrue)
      filteredList = this.props.restData.menuDetails.MenuItemList.filter(
        (menu, i) => menu.PropPubVegNonVeg === "Veg"
      );

    this.setState({
      ...this.state,
      filter: { ...filter, [value]: !isTrue },
      MenuItemList: [...filteredList]
    });
  };

  searchMenu = e => {
    let { name, value } = e.target;
    let filteredList = this.props.restData.menuDetails.MenuItemList.filter(
      (menu, i) => {
        let keyRegx = new RegExp(value, "i");
        let temp = menu.PropPubMenuItemDescription.search(keyRegx);
        return temp === -1 ? false : true;
      }
    );
    this.setState({
      [name]: value,
      MenuItemList: [...filteredList]
    });
  };

  getActive = (hid, mid) => {
    const { restData } = this.props;
    const menuDetails = restData.menuDetails;
    const { MenuItemModifierList, MenuItemList } = menuDetails;
    const actHead = menuDetails.MenuHeadList.find(
      head => head.PropPubMenuHeadCode === hid
    );
    const actMod = MenuItemModifierList.Modifier.filter(mod => {
      let modItems = mod.MenuItemCode.split(","),
        id = modItems.indexOf(mid);
      return id === -1 ? false : true;
    });
    const actMenu = MenuItemList.find(
      obj => obj.PropPubMenuHeadCode === hid && obj.PropMenuItemCode === mid
    );
    return { actMenu, actHead, actMod };
  };

  minusCartQty(i) {
    throw new Error("Method not implemented.");
  }
  plusCartQty(i) {
    throw new Error("Method not implemented.");
  }
  render() {
    const { restData } = this.props;
    const menuDetails = restData.menuDetails;
    const { MenuHeadList, MenuItemModifierList, MenuItemList } = menuDetails;
    return (
      <div className="tab-pane" id="order-online">
        <div className="restaurants-order-bg m-bottom">
          <div className="tab-header">
            <div className="row">
              <div className="col-12 col-md-4 offset-md-6">
                <div className="input-group">
                  <span className="input-group-prepend">
                  <i className="fa fa-search text-muted" />
                  </span>
                <input 
                  className="form-control"
                  onChange={this.searchMenu}
                  value={this.state.searchKey}
                  name="searchKey"
                  placeholder="search menu item"
                 />
                </div>
              </div>
              <div className="col-12 col-md-2">
                <div className="filter-box">
                <div className='custom-control custom-switch'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='Veg'
          defaultChecked
          checked={this.props.isVeg}
                        onChange={() => this.filterBy("isVeg")}
                        name="Veg"
        />
        <label className='custom-control-label' htmlFor='customSwitchesChecked'>
        Veg
        </label>
      </div>
                 
                </div>
              </div>
            </div>
          </div>
          <div className="order-tabs">
          <MDBContainer>
        <MDBNav className="nav-tabs ">
        {MenuHeadList.map((obj, i) => (
           <MDBNavItem key={obj.PropPubMenuHeadCode} >
           <MDBNavLink link to="#" active={this.state.menuTabValue === `head${i}`} onClick={()=>this.handleChangeMenuTab(`head${i}`)} role="tab" >
           {obj.PropPubMenuHeadDescription}
           </MDBNavLink>
         </MDBNavItem>
      ))}
       </MDBNav>
        <MDBTabContent activeItem={this.state.menuTabValue} >
        <div className="tab-content meals">
          {MenuHeadList.map((head, i) => {
                return (
                  <MDBTabPane tabId={`head${i}`} role="tabpanel" key={i} >
            <div className="tab-pane">
                      <div className="all-meals-tab">
                        <div className="all-meal-dt">
                          <div className="row">
                            <div className="col-12 meal-title">
                              <h3> {head.PropPubMenuHeadDescription} </h3>
                            </div>
                            {this.state.MenuItemList.map((item, j) => {
                              return (
                                <div key={j} className="col-12 pm-right">
                                  <div className="meals-dt">
                                    <div className="meal-list">
                                      <ul className="list-unstyled">
                                        <li className="meal-list-item">
                                          <div className="meal-img-box">
                                            <img
                                              src={item.PropPubImagePath}
                                              className="img-fluid meal-img"
                                              alt=""
                                            />
                                            <i
                                              className={
                                                item.PropPubVegNonVeg == "Veg"
                                                  ? "veg"
                                                  : "non veg"
                                              }
                                            />
                                          </div>
                                          <div className="caption-meal">
                                            <h4>
                                              {item.PropPubMenuItemDescription}
                                            </h4>
                                            <h5>
                                              {
                                                item.PropPubMenuItemlineDescription
                                              }
                                            </h5>
                                            <p className="item-rate">
                                              <i
                                                className="rupee"
                                                aria-hidden="true"
                                                title="Copy to use rupee"
                                              />{" "}
                                              {" " + item.PropPubRate}{" "}
                                            </p>
                                          </div>
                                          <div className="add-control Qty align-self-center">
                                            {this.toggleCounter(
                                              item.PropPubMenuHeadCode,
                                              item.PropMenuItemCode
                                            ) > -1 ? (
                                              <Counter
                                                upgrader={() =>
                                                  this.plusMenuQty(
                                                    item.PropPubMenuHeadCode,
                                                    item.PropMenuItemCode
                                                  )
                                                }
                                                degrader={() =>
                                                  this.minusMenuQty(
                                                    item.PropPubMenuHeadCode,
                                                    item.PropMenuItemCode
                                                  )
                                                }
                                                count={i}
                                              />
                                            ) : (
                                              <MDBBtn
                                                color="primary"
                                                onClick={() =>
                                                  this.addMenuToCart(
                                                    item.PropPubMenuHeadCode,
                                                    item.PropMenuItemCode
                                                  )
                                                }
                                              >
                                                {" "}
                                                Add{" "}
                                              </MDBBtn>
                                            )}
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                   </div>
                   </div>
                   </div>
                   </div>
          </MDBTabPane>
        )
            })
          }
          </div>
        </MDBTabContent>
      </MDBContainer>
      
            
          </div>
          <div id="tabs-cart-total">
            <div className="view-cart">
              <p>
                {" "}
                {this.state.myCart.length + " Items | "} <i className="rupee" />
                &nbsp;{this.state.cartTotal.toFixed(2)}{" "}
              </p>
              <p>( All prices are exclusive of Taxes.)</p>
            </div>

            <div className="book">
              <MDBBtn
                onClick={() =>
                  this.setState({
                    isDialogeOpen: true
                  })
                }
                // disabled={this.state.myCart.length < 1}
                // endIcon={<span className="material-icons">shopping_cart</span>}
              >
                View Cart
              </MDBBtn>
            </div>
          </div>
          <div className="bottomDrawer">
          <MDBModal isOpen={this.state.isDialogeOpen} frame position="bottom" toggle={() =>
              this.setState({
                isDialogeOpen: false
              })}   size="fluid"  >
          <MDBModalHeader toggle={() =>
              this.setState({
                isDialogeOpen: false
              })}>MDBModal title</MDBModalHeader>
          <MDBModalBody>
          <div>
              <table className="cart-data table table-striped">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.myCart.length &&
                    this.state.myCart.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <div>
                              <h4>
                                {" "}
                                {item.MenuItem.PropPubMenuItemDescription}{" "}
                              </h4>
                              <h5>
                                {" "}
                                <span className="rupee" /> &nbsp;{" "}
                                {item.MenuItem.PropPubRate}{" "}
                              </h5>
                              <div>
                                {" "}
                                {item.addonList.map((add, j) => (
                                  <h5 key={j}>
                                    {" "}
                                    {add.ProPubStrItemDescription}{" "}
                                  </h5>
                                ))}{" "}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="cartQty">
                              <Counter
                                count={item.ProPubIntQty}
                                upgrader={() => this.plusCartQty(i)}
                                degrader={() => this.minusCartQty(i)}
                              />
                            </div>
                          </td>
                          <td>
                            <span className="rupee" />
                            <span> {item.PropPubRate.toFixed(2)} </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
                <tfoot>
                  <tr>
                    <th>&nbsp;</th>
                    <th>
                      <b>SubTotal</b>{" "}
                    </th>
                    <th>
                      <b>
                        <span className="rupee" />{" "}
                        {this.state.cartTotal.toFixed(2)}
                      </b>
                    </th>
                    <th>
                      <MDBBtn color="primary" onClick={this.gotoCheck}>
                        {" "}
                        Order Now{" "}
                      </MDBBtn>
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={() =>
              this.setState({
                isDialogeOpen: false
              })}>Close</MDBBtn>
            <MDBBtn color="primary">Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
          </div>

          
        </div>

        <ModsDrawer
          isOpenDr={this.state.isOpenDr}
          toggleDrawer={this.toggleDrawer}
          currentMod={this.state.currentMod}
          handleToggleMod={this.handleToggleMod}
          checked={this.state.checked}
          addMenuToCart={this.addMenuToCartWithAddon}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    restData: state.restListReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getDataWithParams: (queryParams, url, type, other) =>
      dispatch(getDataWithTypeAction(queryParams, url, type, other))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(MealTab);
