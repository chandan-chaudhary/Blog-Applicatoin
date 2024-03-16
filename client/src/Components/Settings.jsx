
import React from 'react';

import '../style/settings.css';
import Sidebar from './Sidebar';

// import { Link } from 'react-router-dom';

export default function Settings() {
    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <form className="settingsForm">
                    <label className='settingsProfileLabel'>
                        <strong>Profile Settings</strong>
                    </label>
                    <div className="settingsProfile">
                        <img className='settingsPPic' src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="profile" />
                        <label htmlFor="inputfile">
                            <i className="settngsUpdatepp fa-solid fa-user-plus"></i>
                        </label>
                        <input type="file" id='inputfile' className='setttingsInputFile' />
                        <label >Username</label>
                        <input type="text" placeholder='eg."Pablo" ' />
                        <label >Email</label>
                        <input type="email" placeholder='pablo@gmail.com' />
                        <label >Password</label>
                        <input type="password" />
                    </div>
                    <button className="settingsProfileUpdate">Update</button>
                </form>
                <div className="settingsPrivacy">
                <span className="settingsDelete">Delete Account</span>
                <span className="TndC">Terms & Conditions</span>
                </div>
            </div>
            <Sidebar />
        </div>
    )
}
