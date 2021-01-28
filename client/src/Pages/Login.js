import React, {useEffect, useState} from 'react';
import Axios from '../../../server/node_modules/axios'
import { Row, Button, Form } from "react-bootstrap";
import '../Pages/Login.css';

export default function Login(){

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post("/login", {
      name: name,
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.message){
        setLoginStatus(response.data.message)
      }else {
        window.location.href = "/positions";
      }
    });
   // window.location.href = "/";
  //  this.props.history.push(`/`);
   // window.location.reload();
  };

  useEffect(() => {
    Axios.get("/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user.rows[0].name);
      }
    });
  }, []);


return(
    <div className="App">
      <div className="login">
        <h2>Войдите в систему</h2>
        <Form.Group >
                       <Form.Label>Почта</Form.Label>
                        <Form.Control name="email" id="email" type="email" 
                        onChange={(e) => {setEmail(e.target.value);}} size="sm" />
                         <Form.Label>Пароль</Form.Label>
                        <Form.Control name="password" id="password" type="password" 
                         onChange={(e) => {setPassword(e.target.value);}} size="sm" />
                    </Form.Group>
                    <Button onClick={login} className={"but mb-2"} >Войти</Button>
      </div>
      <h6>{loginStatus}</h6>
    </div>
)

}