import React, { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import store from "./store";
import { loadUser } from "./actions/authActions";
import AppNavbar from "./components/AppNavbar";
import Landingpage from "./components/Landingpage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <div>
      <AppNavbar />
      <Switch>
        <ProtectedRoute exact path="/" component={Landingpage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
