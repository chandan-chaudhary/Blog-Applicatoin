import React from 'react';
import '../style/register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { registerStart, registerSuccess, registerError } from '../redux/userSlice';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [error, setError] = useState(false);

  const user = useSelector((state)=> state.user.userInfo);
  const errorMsg = useSelector((state)=> state.user.error);
  console.log('satte:' ,errorMsg);

  const dispatch = useDispatch();

  const handleRegisterUser = async (e) => {
    dispatch(registerStart());
    try {
      e.preventDefault();
      setError(false);
      const user = await axios.post('http://127.0.0.1:5500/api/v1/users/register', {
        username, email, profilePic, password, confirmPassword
      });
      console.log(user.data)
      dispatch(registerSuccess(user.data.data));
      user.data && window.location.replace('/login');
    } catch (err) {
      setError(true);
      const error = err.response.data.message;
      dispatch(registerError(error));
      console.log('register-err', err);
    }
  }

  return (
    <div className='register'>
      <div className="registerWrapper">
        <form className="registerForm" onSubmit={handleRegisterUser}>
          <span className="registerInfo"><strong>REGISTER</strong></span>
          <img className='registerPP' src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" onChange={(e) => setProfilePic(e.target.value)}/>
          <label htmlFor="inputFile">
            <i className="registerPPUpload fa-solid fa-user-plus"></i>
          </label>
          <input type="file" id="inputFile" className='registerInputFile' />
          <label >Username</label>
          <input type="text" placeholder='Pablo' className='registerInput' onChange={(e) => setUsername(e.target.value)} />
          <label >Email</label>
          <input type="email" placeholder='pablo@email.com' className='registerInput' onChange={(e) => setEmail(e.target.value)} />
          <label >Password</label>
          <input type="password" className='registerInput' onChange={(e) => setPassword(e.target.value)} />
          <label >Confirm password</label>
          <input type="password" className='registerInput' onChange={(e) => setconfirmPassword(e.target.value)} />
          <button className="registerBtn">Sign up</button>
          {error && <span style={{ color: "red" }}>{errorMsg.split('username:')[1]}</span>}
        </form>
        <div className="registerLogin">
          <Link to='/login'>
            <button className="registerLoginBtn">Log In</button>
          </Link>
        </div>
      </div>
    </div >
  )
}
