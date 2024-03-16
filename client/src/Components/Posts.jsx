
import React from 'react'
import '../style/posts.css'
import Post from './Post'
export default function Posts({ posts }) {
  return (
    <div className='posts'>
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  )
}
