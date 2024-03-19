import React from "react";
import "../style/login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import { registerStart, registerSuccess, registerError } from '../redux/userSlice';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

    const user = useSelector(state => state.user.userInfo);
  console.log(user);
  const errorMsg = useSelector(state => state.error);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setError(false);
      dispatch(registerStart());
      const login = await axios.post(
        "http://127.0.0.1:5500/api/v1/users/login",
        { email, password }
      );
      console.log('atlogin',login.data);
      dispatch(registerSuccess(login.data));
    } catch (err) {
      setError(true);
      console.log(err);
      dispatch(registerError(err));
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <form className="loginForm" onSubmit={handleLogin}>
          <span className="loginInfo">
            <strong>Sign in</strong>
          </span>
          <label>Email</label>
          <input
            type="text"
            className="loginInput"
            placeholder="abc@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            className="loginInput"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginBtn">Login</button>
          {error && <span className="loginPassForget">{errorMsg}</span>}
          <span className="loginPassForget">Forgot Password ?</span>
        </form>
        <Link to="/register">
          <button className="loginregisterBtn">Register</button>
        </Link>
      </div>
    </div>
  );
}
