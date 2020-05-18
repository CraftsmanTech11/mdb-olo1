import React from 'react'

export const Cartlist = (props) => {
    const {myCart, cartTotal} = props;
    const titleList= ['Meal','Qty','Price','Action']
    return (
        <div className="my-checkout">
                  <div className="table-responsive">
                    <table className="table  table-bordered">
                      <thead>
                        <tr>
                            {
                                titleList.map((obj, i) => (
                                    <td className="td-heading" key= {i} > {obj} </td>
                                    ))
                            }
                          
                        </tr>
                      </thead>
                      <tbody>
                      {myCart.length && myCart.map((item,i) => {
                        let MenuItem = item.MenuItem
                              return (
                                <tr>
                              <td> 
                                 <div className="name">
                                 <h4> {MenuItem.PropPubMenuItemDescription } </h4>
                                 </div>
                               </td>
                               <td className="td-content"> {item.ProPubIntQty} </td>
                               <td className="td-content"> 
                               <span className="rupee"></span>
                                <span> {" "} {item.PropPubRate.toFixed(2)} </span>
                                </td>
                               <td>
                                 <button className="remove-btn" onClick= { ()=> props.removeItem(i) } >Remove</button>
                               </td>
                            </tr>
                              )
                            }
                            )}
                            
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={4}>
                            <h4 className="text-right font-weight-bold">
                              Total <ins> {cartTotal} </ins>
                            </h4>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
    )
}
