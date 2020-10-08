import React, { useState, useEffect } from "react";
import styled from "styled-components";
import formSchema from "./formSchema";
import * as yup from "yup";
import { axiosWithAuth, setToken } from "../../utils";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { user } from "../../store/actions";
import '../Login/LoginRedirect/LoginPage.css'


const initialLoginFormValues = {
  name: "",
  password: "",
};

const initialLoginFormErrors = {
  name: "",
  password: "",
};

const initialDisabled = true;

const Login = (props) => {
  const { push } = useHistory();
  const [formValues, setFormValues] = useState(initialLoginFormValues);
  const [formErrors, setFormErrors] = useState(initialLoginFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const onInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((error) => {
        setFormErrors({
          ...formErrors,
          [name]: error.errors[0],
        });
      });

    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      username: formValues.name,
      password: formValues.password,
    };
    axiosWithAuth()
      .post("/api/login", loginData)
      .then((res) => {
        /**
         * Set the token, set the ID and username into state
         */
        setToken(res.data.token);
        props.setID(res.data.id);
        push("/redirect")
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          name: "Login failed. Please try again",
        });
      });
  };

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      console.log(valid);
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <form onSubmit={onSubmit}>
      <div className="header">
        <div className="menu_header">
          <div className="logo">
            <h3>Med Cabinet</h3>
          </div>
          <div className="menu_items">

          </div>
      </div>
      </div>

        <div className="form_input">
          <label>
            <input
              type="text"
              placeholder="Enter Your Username"
              minLength="8"
              name="name"
              value={formValues.name}
              onChange={onInputChange}
              autocomplete="off"
            />
          </label>

          <label>
            <input
              type="text"
              placeholder="Enter Your Password"
              minLength="6"
              name="password"
              value={formValues.password}
              onChange={onInputChange}
              autocomplete="off"
            />
          </label>
          <button className="button_login" disabled={disabled}>
            Login
          </button>
          <Link to="/signup">
            <button className="button_login">Sign up</button>
          </Link>
          <div className="errors">
            <div>{formErrors.name}</div>
            <div>{formErrors.password}</div>
        </div>
      </div>
    </form>
  );
};

export default connect(null, {
  setID: user.setID,
})(Login);

const StyledLogin = styled.div`
   // display:flex;
   // width:100%;
   // height:5vh;
   // justify-content: space-evenly;
   // background-color:white;
   // padding-top:5px;
`;

const StyledButton = styled.button`

`;
