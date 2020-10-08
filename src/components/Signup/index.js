import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import formSchema from "./formSchema";
import * as yup from "yup";
import { axiosWithAuth } from "../../utils";

const initialSignupFormValues = {
  name: "",
  password: "",
  email: "",
};

const initialSignupFormErrors = {
  name: "",
  password: "",
};

const initialDisabled = true;

const Signup = (props) => {
  const { push } = useHistory();
  const [formValues, setFormValues] = useState(initialSignupFormValues);
  const [formErrors, setFormErrors] = useState(initialSignupFormErrors);
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

  const onSubmit = (event) => {
    event.preventDefault();
    const signupData = {
      email: formValues.email,
      password: formValues.password,
      username: formValues.name,
    };
    axiosWithAuth()
      .post("/api/register", signupData)
      .then((res) => {
        console.log(res);
        push("/login");
      })
      .catch((err) => {
        console.log(err);
        setFormErrors({
          ...formErrors,
          name: "Signup failed. Please try again.",
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
      <div>
        <StyledSignup>
          <Link to="/login">
          </Link>
        </StyledSignup>

        <div className="errors">
          <div>{formErrors.name}</div>
          <div>{formErrors.password}</div>
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
              placeholder="Enter Your Email"
              minLength="6"
              name="email"
              value={formValues.email}
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
          <StyledButton className="button_login" disabled={disabled}>
            Sign Up
          </StyledButton>
        </div>
      </div>
    </form>
  );
};

export default Signup;

const StyledSignup = styled.div`
  
`;

const StyledInput = styled.div`
  
`;

const StyledButton = styled.button`
  
`;
