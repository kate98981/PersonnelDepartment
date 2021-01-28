import React, { Component } from 'react'
import { Media, Container, Col, Row, Form, Button} from "react-bootstrap";
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import 'moment-timezone';
import '../Pages/Position.css';

export default class Vacancie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            itemsDepartments: [],
            itemsPositions: [],
            itemsUsers : [],
            items: [],
            status: "",
            date: "",
            uname: "",
            demands: "",
            dname: "",
            pname: ""
        };
    }
    
    componentDidMount() {
        this.getData()
        fetch(`${window.location.pathname}`)
        .then(res => res.json())
        .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

            fetch('/departments')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        itemsDepartments: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

            fetch('/positions')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        itemsPositions: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

            fetch('/users')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        itemsUsers: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    getData = () => {
          fetch(`${window.location.pathname}`)
          .then(response => response.json())
          .then(obj => {
            console.log(obj);
            const { status, date, uname, demands, dname, pname } = obj[0];
            this.setState({
                status, date, uname, demands, dname, pname
            });
          })
          .catch(err => console.log(err))
      }
    
      submitEdit(e){
        let url =`${window.location.pathname}`
        let data=this.state
        fetch(url,{
            method: 'PUT',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(data)
        }).then((result)=>{
            result.json().then((resp)=>{
            console.warn("resp", resp)
        }) 
    })
    alert("Запись успешно изменена");
    window.location.reload();
    }


    submitDelete(e){
        let url =`${window.location.pathname}`
        let data=this.state
        fetch(url,{
            method: 'DELETE',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(data)
        }).then((result)=>{
            result.json().then((resp)=>{
            console.warn("resp", resp)
        }) 
    })
    alert("Вакансия закрыта");
    this.props.history.push('/vacancies')
  //  this.props.history.push('/')
    }

    render() {
        function showEditForm()
        {
            document.getElementById("info").style.display="none";
            document.getElementById("editForm").style.display="block";
        }
        function hideEditForm()
        {
            document.getElementById("editForm").style.display="none";
            document.getElementById("info").style.display="block";
        }

        const { error, isLoaded, items, itemsDepartments, itemsPositions, itemsUsers } = this.state;
        if (error) {
            return <p> Error {error.message} </p>
        } else if (!isLoaded) {
            return <><p className={"text-center"}> Загрузка... </p><div className={"air3"}></div></>
        } else {
            return (
              <Container fluid>
                  <Form id="info">
                    {items.map(item => (
                        <Row key={item.name}>
                            <Col className={"ml-5"}>
                                <Media className={"m-5"}>
                                    <Media.Body>
                                    <Row>
                                    <Col  md={2}>
                                    <p className={"title"}>Должность &nbsp;</p>
                                    <p className={"title"}>Отдел &nbsp;</p>
                                    <p className={"title"}>Обязанности &nbsp;</p>
                                    </Col>
                                    <Col  md={4}>
                                    <p className={"value"}>{item.pname}</p>
                                    <p className={"value"}>{item.dname}</p>    
                                    <p className={"value"}>{item.demands}</p>    
                                    </Col>
                                    <Col  md={2}>
                                    <p className={"title"}>Рекрутер &nbsp;</p>
                                    <p className={"title"}>Дата создания &nbsp;</p>
                                    <p className={"title"}>Статус &nbsp;</p>
                                    </Col>
                                    <Col  md={4}>
                                    <p className={"value"}>{item.uname}</p>
                                    <p className={"value"}><Moment format="DD.MM.YYYY">{item.date}</Moment></p>       
                                    <p className={"value"}>{item.status}</p>
                                    </Col>
                                    </Row>
                                    </Media.Body>
                                </Media>
                            </Col> 
                        </Row>
                    ))}


                    <Row>
                    <Col  xs={3}></Col><Col  xs={3}>
                    <Button onClick={()=>{showEditForm()}} className={"but mb-2"}>Редактировать</Button></Col>
                    <Col  xs={3}><Button 
                    onClick={(e) => window.confirm("Вы уверены, что хотите закрыть вакансию?") && this.submitDelete()}
                     className={"but mb-2"}>Закрыть</Button></Col><Col  xs={3}></Col></Row>
                </Form>
                <Form id="editForm" style={{display : 'none'}}>
                <h3 className={"text-center mt-3"}>Редактирование вакансии</h3>
                    <Form.Group >
                        <Row >
                    <Col md={{ span: 4, offset: 2 }}>
                        

                        <Form.Group as={Col} md="10">
                        <Form.Label>Должность</Form.Label>
                        <Form.Control as="select" size="sm" name="pname" value={this.state.pname} 
                        onChange={(data)=>{this.setState({pname:data.target.value}) }}>
                        {itemsPositions.map(itemsPositions => (<option
                        selected={this.state.pname == itemsPositions.name}>
                        {itemsPositions.name}</option>
                            ))}
                        </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} md="10">
                        <Form.Label>Отдел</Form.Label>
                        <Form.Control as="select" size="sm" name="dname" value={this.state.dname} 
                        onChange={(data)=>{this.setState({dname:data.target.value}) }}>
                        {itemsDepartments.map(itemsDepartments => (<option
                        selected={this.state.dname == itemsDepartments.name}>
                        {itemsDepartments.name}</option>
                            ))}
                        </Form.Control>
                        </Form.Group>               

                        <Form.Group as={Col} md="5">
                        <Form.Label>Дата создания</Form.Label>
                        <Form.Control type="date" name="date" value={this.state.date} 
                        onChange={(data)=>{this.setState({date:data.target.value}) }} size="sm" />
                        </Form.Group>
                        
                    </Col><Col  md={5}>

                    

                    <Form.Group as={Col} md="10">
                        <Form.Label>Рекрутер</Form.Label>
                        <Form.Control as="select" size="sm" name="uname" value={this.state.uname} 
                        onChange={(data)=>{this.setState({uname:data.target.value}) }}>
                        {itemsUsers.map(itemsUsers => (<option
                        selected={this.state.pname == itemsUsers.name}>
                        {itemsUsers.name}</option>
                            ))}
                        </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="10">
                        <Form.Label>Обязанности</Form.Label>
                        <Form.Control as="textarea" rows="2" name="demands" value={this.state.demands} 
                        onChange={(data)=>{this.setState({demands:data.target.value}) }} size="sm" />
                    </Form.Group>
                        
                        </Col></Row>
                    </Form.Group>
                    <br/>
                    <Row>
                    <Col  xs={3}></Col><Col  xs={3}>
                    <Button onClick={()=>{hideEditForm()}} className={"but mb-2"}>Отмена</Button></Col>
                    <Col  xs={3}><Button onClick={()=>{this.submitEdit()}} className={"but mb-2"}>Сохранить</Button></Col><Col  xs={3}></Col></Row>
                </Form>
        </Container>
)
    }}}