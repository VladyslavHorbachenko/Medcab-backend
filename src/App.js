import React, { useEffect } from "react";
import styled from "styled-components";
import { Switch, Route, useHistory } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import LoginRedirect from "./components/Login/LoginRedirect";
import Signup from "./components/Signup";
import PreferenceForm from "./components/PreferenceForm";
import Recommendations from "./components/Recommendations";
import StrainList from "./components/StrainList/";
import Settings from "./components/Settings";
import { settings } from "./store/actions";
import { connect } from "react-redux";
import {getToken} from "./utils";

const StyledApp = styled.div`
  background:url("https://images.unsplash.com/photo-1446716336919-df838e44ce7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60");
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

`;

function App(props) {
  console.log()
  const { push } = useHistory();
  useEffect(() => {
    const id  = getToken()
    if (!id) {
      props.logout();
      push("/");
    }
  }, []);
  return (
    <StyledApp className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/preferences" component={PreferenceForm} />
        <PrivateRoute path="/recommended" component={Recommendations} />
        <PrivateRoute path="/strains" component={StrainList} />
        <PrivateRoute path="/redirect" component={LoginRedirect} />
        <PrivateRoute path="/settings" component={Settings} />
      </Switch>
    </StyledApp>
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.user.id,
  };
};

export default connect(mapStateToProps, {
  logout: settings.signOut,
})(App);
