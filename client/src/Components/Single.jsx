import React from 'react'
import '../style/single.css'
import Sidebar from './Sidebar'
import Singlepost from './Singlepost'
export default function Single() {
  return (
    <div className='single'>
        <Singlepost />
        <Sidebar />
    </div>
  )
}
