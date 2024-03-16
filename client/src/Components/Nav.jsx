import React from "react";
import '../style/topbar.css'
import { Link } from "react-router-dom";
export const Navbar = () => {
  const user = false;
  return (
    <div className="navbar">
      <div className="top-left">
        <i className="fa-brands fa-instagram  top-icon"></i>
        <i className="fa-brands fa-x-twitter top-icon"></i>
        <i className="fa-brands fa-linkedin top-icon"></i>
        <i className="fa-brands fa-square-github top-icon"></i>
      </div>
      <div className="top-center">
        <ul className="top-centerlist">
          <li className="top-centeritem">
            <Link className="link" to="/" >Home</Link>
          </li>
          <li className="top-centeritem">
            <Link className="link" to="/post/:postId" >Blog</Link>
          </li>
          <li className="top-centeritem">
            <Link className="link" to="/writeblog" >Write</Link>
          </li>
          <li className="top-centeritem">
            <Link className="link" to="/writeblog" >Update</Link>
          </li>
          <li className="top-centeritem">
            {user &&
              <Link className="link" to="/login" >Logout</Link>
            }
          </li>
        </ul>
      </div>
      <div className="top-right">
        <i className="fa-solid fa-magnifying-glass top-rightitem"></i>
        {
          user ? (
            <>
              <Link className="link" to="/settings">
                <img className="top-profile" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="profile" />
              </Link>
              <span className="top-rightitem">Pablo</span>
            </>)
            :
            (
              <div className="top-right">
                <Link className="top-centeritem link" to='/login'>LOGIN</Link>
                <Link className="top-centeritem link" to='/register'>SIGN UP</Link>
              </div>
            )
        }
      </div>
    </div>
  );
};
