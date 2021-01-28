import React, { useEffect , useState } from 'react';
import Axios from '../../../server/node_modules/axios'
import { Container, Button, Form } from "react-bootstrap";


export default function Registration(){

    
  const [nameReg, setNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [role, setRole] = useState(""); 

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("/register", {
      name: nameReg,
      email: emailReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });

    alert("Запись успешно добавлена");
    window.location.reload();
  };



  Axios.defaults.withCredentials = true;
  useEffect(() => {
      Axios.get("/login").then((response) => {
        if (response.data.loggedIn == true) {
          setRole(response.data.user.rows[0].role);
        }
      });
    }, []);


return(

<Container>
            <h3 className={"text-center mt-3"}>Регистрация пользователя</h3>
                <Form >
                    <Form.Group >
                        <Form.Label>ФИО</Form.Label>
                        <Form.Control name="name" id="name" type="text"
                        onChange={(e) => { setNameReg(e.target.value);}} size="sm" />

                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" id="email" type="email"
                         onChange={(e) => { setEmailReg(e.target.value);}} size="sm" />

                        <Form.Label>Пароль</Form.Label>
                        <Form.Control name="password" id="password" type="password"
                        onChange={(e) => { setPasswordReg(e.target.value);}} size="sm" />
                    </Form.Group>
                    <Button onClick={register}className={"but mb-2"} >Добавить</Button>
                </Form>
        </Container>



)

}