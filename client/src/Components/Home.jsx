import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Posts from './Posts'
import Sidebar from './Sidebar';
import '../style/home.css';

export default function Home() {
  const { search } = useLocation();
  console.log(search);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // const api = "";
    const fetchPosts = async () => {
      const res = await axios.get(`http://127.0.0.1:5500/api/v1/posts/${search}`);
      setPosts(res.data.data.posts);
      console.log(res)
    }

    fetchPosts()
  }, [search])
  return (
    <>
      <Header />
      <div className='home'>
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  )
};
