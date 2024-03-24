
import React, {useState} from 'react'
import '../style/write.css';
import axios from "axios";

export default function Write() {
    const [title, setTitle]= useState('');
    const [photo, setPhoto]= useState('');
    const [summary, setSummary]= useState('');
    const [description, setDescription] = useState('');

    const handlePost =  async (e) => {
        e.preventDefault();
        try{
            const post = await axios.post('http://127.0.0.1:5500/api/v1/posts', {
                title, photo, summary, description
            });
            console.log(post);
        }catch(err) {
            console.log(err);
        }
    }
  return (
    <div className='write'>
        <form className='writeForm' onSubmit={handlePost}>
            <img className='writeImg' src="https://forkast.news/wp-content/uploads/2023/03/Bitcoin-3-1260x840.jpg"
                 alt="btc"/>
            <div className="writeContainer">
                <label htmlFor="uploadFile">
                    <i className=" writeUploadFile fa-solid fa-folder-plus"></i>
                </label>
                <input type="file" id='uploadFile' className='writeInputfile'
                       onChange={(e) => setPhoto(e.target.value)}/>
                <input type="text" placeholder='Title' className='writeTitle'
                       onChange={(e) => setTitle(e.target.value)}/>
                <label htmlFor="writeInputfile">Summary </label>
                <input type="text" placeholder='Title' className='writeTitle'
                       onChange={(e) => setSummary(e.target.value)}/>
            </div>
            <div className="writeContainer">
                <textarea placeholder='Describe something...' className='writeTitle writeText'
                          onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <button className='writeSubmit'>Publish</button>
        </form>
    </div>
  )
}
