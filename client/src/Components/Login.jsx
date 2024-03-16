import React from 'react';
import '../style/login.css';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className='login'>
        <div className='loginWrapper'>
            <form  className="loginForm">
                <span className="loginInfo"><strong>Sign in</strong></span>
                <label >Email</label>
                <input type="text" className='loginInput' placeholder='abc@email.com' />
                <label >Password</label>
                <input type="password" className='loginInput' />
                <button className="loginBtn">Login</button>
                <span className="loginPassForget">Forgot Password ?</span>
            </form>
            <Link to='/register'>
            <button className='loginregisterBtn'>Register</button>
            </Link>
        </div>
    </div>
  )
}
