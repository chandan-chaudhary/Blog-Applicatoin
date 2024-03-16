import React from 'react'

import '../style/header.css'
export default function Header() {
  return (
    <div className='header'>
      <div className="header-text">
        <span className='header-text-upper'>Create a</span>
        <span className='header-text-down'>Blog</span>
      </div>

      <img className="header-img" src="https://images.unsplash.com/photo-1643148636637-58b3eb95cdad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80" alt="unsplash_img" />
    </div>
  )
}
