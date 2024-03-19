import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../style/sidebar.css'
import axios from 'axios';

export default function Sidebar() {
    const [category, setcategory] = useState([]);


    useEffect(() => {
        const fetchCategory = async () => {
            const res = await axios.get('http://127.0.0.1:5500/api/v1/category');
            setcategory(res.data.data.category)
            console.log(res.data.data.category);
        };
        fetchCategory();
    }, []);

    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className='sidebarHeading'>About Us</span>
                <img className='sidebarImg' src="https://previews.123rf.com/images/soujanyaamith/soujanyaamith1705/soujanyaamith170500017/78748711-like-photos-videos-upload-post-modern-related-connected-platform-people-across-the-globe.jpg" alt="random_img" />
                <p className='sidebarDiscription'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ipsum ut omnis debitis illo culpa impedit quo error porro ad sed quae incidunt minima ea deleniti quisquam voluptatibus, blanditiis pariatur.</p>
            </div>
            <div className="sidebarItem">
                <span className='sidebarHeading'>CATEGORIES</span>
                <ul className="sidebarList">
                    {category.map((cat) => (
                        <Link to={`/?category=${cat.title}`} className='link'>
                            <li key={cat.title} className="sidebarListItem">{cat.title}</li>
                        </Link>
                    ))}
                    {/* <li className="sidebarListItem">Sports</li>
                    <li className="sidebarListItem">Music</li>
                    <li className="sidebarListItem">Stocks</li>
                    <li className="sidebarListItem">Crypto</li>
                    <li className="sidebarListItem">Nature</li> */}
                </ul>
            </div>
        </div >
    )
}
