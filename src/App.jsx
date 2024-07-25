import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';

import Dashboard from './Pages/Dashboard';
import Signin from './Pages/Signin';
import Blogs from './Pages/Blogs';
import Signup from './Pages/Signup';
// import About from './Pages/About';
import Header from './Compontents/Header';
import Footer from './Compontents/Footer';
import PrivateRoute from './Compontents/PrivateRoute';
import CreatePost from './Pages/CreatPost';
import OnlyAdminPrivateRoute from './Compontents/OnlyAdminRouter';



const App = () => {
  return (
   <BrowserRouter>
   <Header/>
   <Routes>
     <Route path = "/ " element={<Home/>}/>
     {/* <Route path = '/about' element={<About/>}/> */}
     <Route element={<PrivateRoute />}>
     
     <Route path= '/dashboard' element={<Dashboard/>}/>
     </Route>
     <Route element={<OnlyAdminPrivateRoute />}>
      <Route path='/create-post' element={<CreatePost />} />
      </Route> 
     <Route path= '/sign' element = {<Signin/>}/>
     <Route path = '/blog' element = {<Blogs/>}/>
     <Route path ='/signup' element={<Signup/>}/>
     
   </Routes>
   <Footer/>
   </BrowserRouter>
  );
};

export default App;