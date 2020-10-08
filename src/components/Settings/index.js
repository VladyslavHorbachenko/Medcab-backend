import React, { useEffect } from "react";
import StyledSettings from "./StyledSettings";
import Header from "../Header/header";
import { connect } from "react-redux";
import { settings } from "../../store/actions";
import "../Login/LoginRedirect/LoginPage.css"

const Settings = (props) => {
  const {
    id,
    userData,
    fieldValues,
    updated,
    isDeleted,
    updateInfo,
    fillFields,
    handleSettingsInput,
    setUpdated,
    deleteProfile,
  } = props;

  if (isDeleted) {
    window.location.reload();
  }
  const submitHandler = (e) => {
    e.preventDefault();
    updateInfo({ id, req: fieldValues });
  };
  const deleteHandler = (e) => {
    e.preventDefault();
    deleteProfile(id);
  };

  useEffect(() => {
    fillFields(userData);
    return () => {
      setUpdated(false);
    };
  }, []);
  return (
      <div>  <Header />
    <div className="form_input">
      <h1>Settings</h1>
      <form onSubmit={submitHandler}>
        <p className="update_user_sign">Update User Info</p>
        <div>
          <label></label>
          <input
            type="text"
            name="username"
            value={fieldValues.username}
            onChange={handleSettingsInput}
          />
        </div>
        <div>
          <label></label>
          <input
            type="text"
            name="email"
            value={fieldValues.email}
            onChange={handleSettingsInput}
          />
        </div>
        <div>
          <input type="submit" value="Submit Changes" />
        </div>
        {updated && <div>User info updated successfully</div>}
      </form>
      <div>
        <h3 className= "prerefencess">Delete User Profile</h3>
        <h4>(warning: this cannot be undone)</h4>
        <buttonc class="button_loginn" onClick={deleteHandler}>Delete</buttonc>
      </div>
    </div>
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    id: state.user.id,
    userData: {
      username: state.user.username,
      email: state.user.email,
    },
    fieldValues: state.settings.fieldValues,
    updated: state.settings.updated,
    isDeleted: state.settings.isDeleted,
  };
};

export default connect(mapStateToProps, {
  updateInfo: settings.updateInfo,
  fillFields: settings.fillFields,
  handleSettingsInput: settings.handleSettingsInput,
  setUpdated: settings.setUpdated,
  deleteProfile: settings.deleteProfile,
})(Settings);
