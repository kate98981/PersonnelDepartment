import React, { Component } from 'react'
import { Container, Button, Form, Col, Row } from "react-bootstrap";
export default class NewVacancie extends Component {

    constructor() {
        super();
        this.state = {
            itemsDepartments: [],
            itemsPositions: [],
            itemsUsers : [],
            demands: "",
            dname: "",
            pname: "",
            uname: ""
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

submit(e){
    let url ="/newvacancie"
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
this.props.history.push('/vacancies')
}
    render() {
        const { itemsDepartments, itemsPositions, itemsUsers } = this.state;
        return (
            <>
            <Container>
            <h3 className={"text-center mt-3"}>Добавление вакансии</h3>
                <Form >
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
                    
                    </Col><Col  md={5}>

                    <Form.Group as={Col} md="10">
                        <Form.Label>Обязанности</Form.Label>
                        <Form.Control as="textarea" rows="3" name="demands" value={this.state.demands} 
                        onChange={(data)=>{this.setState({demands:data.target.value}) }} size="sm" />
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