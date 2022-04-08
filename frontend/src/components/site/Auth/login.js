import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import * as authService from "../services/authService";
import ReCaptcha from '../../ui/ReCaptcha';
import * as actions from '../../../utils/store/actions';
import url from '../url';


const initialValues = {
  email: "",
  password: "",
  recaptcha: "",
  attempts: 0,
};

export const Login = () => {
  let navigate = useNavigate();
  
  const dispatch = useDispatch();
  const loginAttempts = useSelector((state) => state.loginAttempts);
  useEffect(() => {
    setValues((p) => ({ ...p, ['attempts']: loginAttempts }));
  }, [loginAttempts]);
  
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState("");
  
  const recaptchaRef = React.createRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if(recaptchaRef.current)
    {
      const recaptchaValue = recaptchaRef.current.getValue();
      if(recaptchaValue)
      {
        recaptchaRef.current.reset();
        values.recaptcha = recaptchaValue;
      }
    }
    authService.Login(values)
    .then((response) => {
      dispatch({ type: 'RESET_LOGIN_ATTEMPTS' });
      const token = response.data.token;
      const user = response.data.user;
      dispatch(actions.authLogin(token, user));
      navigate(url.Home);
    }).catch((e) => {
      dispatch({ type: 'UPDATE_LOGIN_ATTEMPTS' });
      let error=e.response.data.error[0];
      setErrors(error);
    });
  };

  const hasErrorFor = (fieldName) => {
    return !!errors[fieldName];
  };

  const renderError=(fieldName)=>{
    let status=hasErrorFor(fieldName);
    if(status){
      return errors[fieldName][0];
    }
  }
  
  
  return (
    <div className="container col-md-6 border" style={{marginTop:50,padding:45,background:"ghostwhite",borderRadius:25}}>
      <form onSubmit={(e) => onSubmit(e)}>
      <p className="text-danger text-center font-weight-bold">{renderError('mismatch_credentials')}</p> 
        <div className="form-group py-2">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            placeholder="Enter User Name"
          />
          <span className="text-danger">{renderError('email')}</span>
        </div>

        <div className="form-group py-2">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            placeholder="Enter Password Here"
          />
          <span className="text-danger">{renderError('password')}</span>
        </div>

        {values.attempts > 3 && (
        <div className="form-group py-2">
          <label>ReCaptcha</label>
          <ReCaptcha 
            size="normal"
            ref={ recaptchaRef }
            onChange={(value) => {
              //setValues(p => ({ ...p, ['recaptcha']: value }));
            }}
          />
          <span className="text-danger">{renderError('recaptcha')}</span>
        </div>
        )}

        <div className="form-group py-2">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};