import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap'
import Axios from '../../server/node_modules/axios'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './Components/Header';
import Login from './Pages/Login'

function App() {
  
  const [role, setRole] = useState(""); 
  const [name, setName] = useState(""); 
  Axios.defaults.withCredentials = true;
  useEffect(() => {
      Axios.get("/login").then((response) => {
        if (response.data.loggedIn == true) {
          setRole(response.data.user.rows[0].role);
          setName(response.data.user.rows[0].name);
        }  //else window.location.pathname = "/login"
      });
    }, []); 
  return (
    <>
    {role == "admin" && <Header name="Администратор"/>}
{role == "user" && <Header name={name}/>}
{role == "" && <Login />} 

    </>
  );
}

export default App;
