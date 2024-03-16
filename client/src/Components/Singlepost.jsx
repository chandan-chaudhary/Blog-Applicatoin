import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/singlepost.css'


export default function Singlepost() {
    const [post, setpost] = useState([]);
    const location = useLocation();
    const pathname = location.pathname.split('/')[2];
    // console.log(pathname);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`http://127.0.0.1:5500/api/v1/posts/${pathname}`);
            console.log(res);
            setpost(res.data.data.post);
        };
        getPost();
    }, [pathname]);

    return (
        <>
            <div className='singlepost'>
                <div className="singlepostContainer">
                    <img className='singlepostImg' src="https://forkast.news/wp-content/uploads/2023/03/Bitcoin-3-1260x840.jpg" alt="btc" />
                    <span className='singlepostTitle'>{post.summary}</span>
                    <p className="singlepostDescription">{post.description}</p>
                </div>
                <div className="singlepostManager">
                    <i className="  singlepostEditor fa-solid fa-pen-nib"></i>
                    <i className="singlepostEditor  fa-solid fa-trash"></i>
                </div>
                <div className="singlepostPublisher">
                    <span className="singlepostAuthor">Author: <Link to={`${post.user ? '/?user=' + post.user.username : ''}`} className='link'><strong>{post.user ? post.user.username : 'Anonymus'}</strong></Link></span>
                    <span className="singlepostTime">{new Date(post.createdAt).toDateString()}</span>
                </div>
            </div >

        </>
    )
}
