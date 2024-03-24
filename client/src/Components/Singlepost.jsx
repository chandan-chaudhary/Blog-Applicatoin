import React from 'react'
import {useLocation, Link, json} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/singlepost.css'
import Update from "./Update";
import {useSelector} from "react-redux";


export default function Singlepost() {
    const [post, setpost] = useState([]);
    console.log('postSingle',post);

    const location = useLocation();
    const pathname = location.pathname.split('/')[2];
    // console.log(pathname);
    const user = useSelector((state) => state.user.userInfo);
    console.log('single', user.data.username);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`http://127.0.0.1:5500/api/v1/posts/${pathname}`);
            console.log(res);
            localStorage.setItem("post", JSON.stringify(res.data.data.post));
            setpost(res.data.data.post);
        };
        getPost();
    }, [pathname]);

    const deletePost = async(e)=>{
        e.preventDefault();
       await axios.delete(`http://localhost:5500/api/v1/posts/${post._id}`);
        console.log('delete success');
    };

    const isUserMatch = (post, user)=>{
        if(post.user && user.data){
            return post.user.username === user.data.username;
        };
        return false;
    };
    console.log('checkUserMatch',isUserMatch(post, user));

    return (
        <>
            <div className='singlepost'>
                <div className="singlepostContainer">
                    <img className='singlepostImg' src="https://forkast.news/wp-content/uploads/2023/03/Bitcoin-3-1260x840.jpg" alt="btc" />
                    <span className='singlepostTitle'>{post.summary}</span>
                    <p className="singlepostDescription">{post.description}</p>
                </div>
                { isUserMatch(post, user) &&
                    <div className="singlepostManager">
                            <Link className="link" to='/update'>
                            <i className="  singlepostEditor fa-solid fa-pen-nib"></i>
                            </Link>
                            <i className="singlepostEditor  fa-solid fa-trash" onClick={deletePost}></i>
                    </div>
                }
                <div className="singlepostPublisher">
                    <span className="singlepostAuthor">Author: <Link to={`${post.user ? '/?user=' + post.user.username : ''}`} className='link'><strong>{post.user ? post.user.username : 'Anonymus'}</strong></Link></span>
                    <span className="singlepostTime">{new Date(post.createdAt).toDateString()}</span>
                </div>
            </div >

        </>
    )
}
