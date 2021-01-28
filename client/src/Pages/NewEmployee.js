import React, { Component } from 'react'
import { Container, Button, Form, Col, Row } from "react-bootstrap";
export default class NewEmployee extends Component {

    constructor() {
        super();
        this.state = {
            itemsDepartments: [],
            itemsPositions: [],
            fio: "",
            phone: "",
            skills: "",
            education: "",
            experience: "",
            dname: "",
            pname: ""
        }
    }
    componentDidMount() {
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

submit(e){
    let url ="/newemployee"
    let data=this.state
    fetch(url,{
        method: 'POST',
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
alert("Запись успешно добавлена");
this.props.history.push('/employees')
}
    render() {
        const { itemsDepartments, itemsPositions } = this.state;
        return (
            <>
            <Container>
            <h3 className={"text-center mt-3"}>Добавление сотрудника</h3>
                <Form >
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

                    <Button onClick={()=>{this.submit()}} className={"but mb-2"} >Добавить</Button>
                </Form>
        </Container>
            </>
        )
    }
}