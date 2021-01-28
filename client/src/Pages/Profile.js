import React, {useEffect, useState} from 'react';
import Axios from '../../../server/node_modules/axios'
import { Button, Container, Col, Row, Media, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Visitor from "../Components/Visitor";
import Admin from "../Components/Admin";

export default function Profile(){
    const [role, setRole] = useState(""); 
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState(""); 
    Axios.defaults.withCredentials = true;
    useEffect(() => {
        Axios.get("/login").then((response) => {
          if (response.data.loggedIn == true) {
            setRole(response.data.user.rows[0].role);
            setName(response.data.user.rows[0].name);
            setEmail(response.data.user.rows[0].email);
          }
         // else window.location.pathname = "/login"
        });
      }, []);
    
return(
    <div>
        {role == "user" &&
        <Container>
                  <Form id="info">
                  <p className={"text-center nametitle"}>Профиль</p>
                            <Col md={"8"} className={"ml-5"}>
                                <Media className={"m-5"}>
                                    <Media.Body>
                                      <Row>
                                    <Col  xs={5}>
                                    <p className={"title"}>ФИО &nbsp;</p>
                                    <p className={"title"}>Почта &nbsp;</p>
                                    <p className={"title"}>Роль в системе &nbsp;</p>
                                    </Col>
                                    <Col  xs={7}>
                                    <p className={"value"}>{name}</p>       
                                    <p className={"value"}>{email}</p>
                                    <p className={"value"}>{role}</p>
                                    </Col>
                                    </Row>
                                    </Media.Body>
                                </Media>
                            </Col> 
                </Form>
        </Container>

 
        }
        {role == "admin" && 
  



<Container fluid>
<Row>
<Col  xs={2}></Col>
<Col xs={7}>
<Form id="info">
    <p className={"text-center nametitle"}>Профиль</p>
                      <Media className={"m-5"}>
                          <Media.Body>
                            <Row>
                          <Col  xs={5}>
                          <p className={"title"}>Имя &nbsp;</p>
                          <p className={"title"}>Роль в системе &nbsp;</p>
                          </Col>
                          <Col  xs={5}>
                          <p className={"value"}>Администратор</p>       
                          <p className={"value"}>{role}</p>
                          </Col>
                          </Row>
                          </Media.Body>
                      </Media>
                      </Form>
</Col>
<Col xs={3}> <Link to={'/registration'}><Button  className={"but adduser mb-2"}>Добавить пользователя</Button></Link>  <br/></Col>
</Row>  </Container>
    
    }
    </div>
)

}