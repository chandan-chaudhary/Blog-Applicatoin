
import React from 'react'
import '../style/write.css';

export default function Write() {
  return (
    <div className='write'>
        <form className='writeForm'>
      <img className ='writeImg' src="https://forkast.news/wp-content/uploads/2023/03/Bitcoin-3-1260x840.jpg" alt="btc" />
        <div className="writeContainer">
            <label htmlFor="uploadFile">
            <i className=" writeUploadFile fa-solid fa-folder-plus"></i>
            </label>
            <input type="file" id='uploadFile' className='writeInputfile' />
            <input type="text" placeholder='Title' className='writeTitle'/>
        </div>
        <div className="writeContainer">
          <textarea placeholder='Describe something...' className='writeTitle writeText'></textarea>
        </div>
        </form>
      <button className='writeSubmit'>Publish</button>
    </div>
  )
}
