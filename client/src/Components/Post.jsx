
import React from 'react';
import '../style/post.css';
import { Link } from 'react-router-dom'
export default function Post({ post }) {
  return (
    <div className='post'>
      <Link to={`post/${post._id}`} className='link'>
        {post.photo && <img className='postImg' src={post.photo} alt="" />}
        <div className="postInfo">
          <span className="postAbout">{post.title}</span>
          <span className="postTitle">{post.summary} </span>
          <span className="postTime">{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="postDescription">{post.description}
        </p>
      </Link>
      <hr />
    </div>
  )
}
