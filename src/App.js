import React, { useState } from "react";
import { MDBNavbar } from "mdbreact";
import { Provider } from "react-redux";
import { store } from "./Store/Store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AlertDialog } from "./Comps/UI/Modal";
import OloHome from "./Pages/Olo_home";
import RestDetails from "./Pages/RestDetails";

const NavbarPage = () => {
  const [errorObj, setError] = useState({ txt: "", open: false });

  return (
    <Provider store={store}>
      <Router>
        {/* <Appbar /> */}
        <Switch>
          <Route path="/restdetails/:id" component={RestDetails} />
          <Route path="/" component={OloHome} />
        </Switch>
        <AlertDialog
          txt={errorObj.errorMsg}
          open={errorObj.isError}
          handleClose={() => setError({ ...errorObj, open: !errorObj.open })}
        />
      </Router>
    </Provider>
  );
};

export default NavbarPage;
