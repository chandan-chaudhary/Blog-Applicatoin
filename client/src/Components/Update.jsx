
import React from 'react'
import '../style/write.css';
import axios from "axios";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
// import {useLocation} from "react-router-dom";

export default function Update() {
    const [title, setTitle]= useState('');
    // const [photo, setPhoto]= useState('');
    const [summary, setSummary]= useState('');
    const [description, setDescription] = useState('');

    const user = useSelector(state =>state.user.userInfo);
    console.log(user);
    const post = JSON.parse(localStorage.getItem("post"));
    const token  = localStorage.getItem("token");
    console.log('post', post._id);



        const handleUpdate = async(e)=>{
            e.preventDefault();
            try{
                const updatePost = await axios.patch(`http://localhost:5500/api/v1/posts/65cb7c4b8f5940c38cd5f097`, {
                    title, summary, description
                },{
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(updatePost);

            }catch(err){
                console.log(err.message);
            }
        };

    return (
        <div className='write'>
            <form className='writeForm' onSubmit={handleUpdate}>
                <img className='writeImg' src="https://forkast.news/wp-content/uploads/2023/03/Bitcoin-3-1260x840.jpg"
                     alt="btc"/>
                <div className="writeContainer">
                    <label htmlFor="uploadFile">
                        <i className=" writeUploadFile fa-solid fa-folder-plus"></i>
                    </label>
                    <input type="file" id='uploadFile' className='writeInputfile'/>
                    <label htmlFor="writeInputfile">Title </label>
                    <input type="text" placeholder='Title' className='writeTitle'
                           defaultValue={`${post ? post.title : ''}`} onChange={(e)=> setTitle(e.target.value)}/>
                    <label htmlFor="writeInputfile">Summary </label>
                    <input type="text" placeholder='Title' className='writeTitle'
                           defaultValue={`${post ? post.summary : ''}`} onChange={(e)=> setSummary(e.target.value)}/>
                </div>
                <div className="writeContainer">
                    <label htmlFor="writeInputfile">Description </label>
                    <textarea placeholder='Describe something...' className='writeTitle writeText'
                              defaultValue={`${post ? post.description : ''}`} onChange={(e)=> setDescription(e.target.value)}></textarea>
                </div>
                <button className='writeSubmit'>Update</button>
            </form>
        </div>
    )
}
