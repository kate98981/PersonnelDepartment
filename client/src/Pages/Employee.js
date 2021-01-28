import React, { Component } from 'react'
import { Media, Container, Col, Row, Form, Button} from "react-bootstrap";
import '../Pages/Position.css';

export default class Department extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            itemsDepartments: [],
            itemsPositions: [],
            items: [],
            fio: "",
            phone: "",
            skills: "",
            education: "",
            experience: "",
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
    }

    getData = () => {
          fetch(`${window.location.pathname}`)
          .then(response => response.json())
          .then(obj => {
            console.log(obj);
            const { fio, phone, skills, education, experience, dname, pname } = obj[0];
            this.setState({
                fio, phone, skills, education, experience, dname, pname
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
    alert("Запись успешно удалена");
    this.props.history.push('/employees')
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

        const { error, isLoaded, items, itemsDepartments, itemsPositions } = this.state;
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
                                    <p className={"title"}>ФИО &nbsp;</p>
                                    <p className={"title"}>Должность &nbsp;</p>
                                    <p className={"title"}>Отдел &nbsp;</p>
                                    <p className={"title"}>Телефон &nbsp;</p>
                                    </Col>
                                    <Col  md={4}>
                                    <p className={"value"}>{item.fio}</p>   
                                    <p className={"value"}>{item.pname}</p>
                                    <p className={"value"}>{item.dname}</p>    
                                    <p className={"value"}>{item.phone}</p>
                                    </Col>
                                    <Col  md={2}>
                                    <p className={"title"}>Навыки &nbsp;</p>
                                    <p className={"title"}>Образование &nbsp;</p>
                                    <p className={"title"}>Опыт работы &nbsp;</p>
                                    </Col>
                                    <Col  md={4}>
                                    <p className={"value"}>{item.skills}</p>
                                    <p className={"value"}>{item.education}</p>       
                                    <p className={"value"}>{item.experience}</p>
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
                    onClick={(e) => window.confirm("Вы уверены, что хотите удалить?") && this.submitDelete()}
                     className={"but mb-2"}>Удалить</Button></Col><Col  xs={3}></Col></Row>
                </Form>
                <Form id="editForm" style={{display : 'none'}}>
                <h3 className={"text-center mt-3"}>Редактирование сотрудника</h3>
                    <Form.Group >
                        <Row >
                    <Col md={{ span: 4, offset: 2 }}>
                        
                        <Form.Group as={Col} md="10">
                        <Form.Label>ФИО</Form.Label>
                        <Form.Control name="fio" value={this.state.fio} 
                        onChange={(data)=>{this.setState({fio:data.target.value}) }} size="sm" />
                        </Form.Group>

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
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control name="phone" value={this.state.phone} 
                        onChange={(data)=>{this.setState({phone:data.target.value}) }} size="sm" />
                        </Form.Group>
                    </Col><Col  md={5}>

                    <Form.Group as={Col} md="10">
                        <Form.Label>Навыки</Form.Label>
                        <Form.Control as="textarea" rows="2" name="skills" value={this.state.skills} 
                        onChange={(data)=>{this.setState({skills:data.target.value}) }} size="sm" />
                    </Form.Group>

                    <Form.Group as={Col} md="10">
                        <Form.Label>Образование</Form.Label>
                        <Form.Control as="textarea" rows="2" name="education" value={this.state.education} 
                        onChange={(data)=>{this.setState({education:data.target.value}) }} size="sm" />
                        </Form.Group>
                        <Form.Group as={Col} md="10">
                        <Form.Label>Опыт работы</Form.Label>
                        <Form.Control as="textarea" rows="2" name="experience" value={this.state.experience} 
                        onChange={(data)=>{this.setState({experience:data.target.value}) }} size="sm" />
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