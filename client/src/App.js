import React from 'react';
import { Navbar } from './Components/Nav';
import Home from './Components/Home';
import Single from './Components/Single';
import Write from './Components/Write';
import Settings from './Components/Settings';
import Login from './Components/Login';
import Register from './Components/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageErr from './Components/PageErr';
import { useSelector} from 'react-redux';


function App() {
  const user = useSelector((state) => state.user.userInfo);
  // const user = false;
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/post/:postId" element={<Single />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/writeblog" element={user ? <Write /> : <Register />} />
        <Route path="/*" element={<PageErr />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
