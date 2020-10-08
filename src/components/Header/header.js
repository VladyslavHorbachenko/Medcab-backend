import { NavLink } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { settings } from "../../store/actions";
import '../Login/LoginRedirect/LoginPage.css'

const Header = (props) => {
  const { signOut } = props;
  const StyledHeader = styled.div`
   
  `;

  const StyledLogout = styled.button`
    
  `;

  const logoutHandler = (e) => {
    signOut();
    window.location.reload();
  };

  return (
    <div className="header_top">
            <NavLink to="/strains">
                <h1>Strain List</h1>
            </NavLink>
            <NavLink to="/recommended">
                <h1>Recommendations</h1>
            </NavLink>
            <NavLink to="/settings">
                <h1>Settings</h1>
            </NavLink>
            <button className="button_login" onClick={logoutHandler}>Log out</button>
    </div>
  );
};

export default connect(null, {
  signOut: settings.signOut,
})(Header);
