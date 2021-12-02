import React from 'react';
import './App.css';
import Login from './pages/Login';
import Main from './pages/Main';
import Posts from './pages/Posts';
import Layout from './Components/Layout.js/Layout';
import {
  HashRouter as Router,
  Routes,
  Route,
}from 'react-router-dom';

const App = () => (
  <Router>  
    <Routes>

      <Route element={<Layout />}>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/Posts" element={<Posts />} />  
      </Route>

      <Route exact path="/Login" element={<Login />} />
     
    </Routes> 
  </Router>
);

export default App;
