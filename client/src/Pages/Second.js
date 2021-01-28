import React, { Component } from 'react'
import { Container, Button, Form } from "react-bootstrap";

export default class Second extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            email: ""
        }
    }

submit(e){
    let url ="/merchants"
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
//document.getElementById('name').value = ''
//document.getElementById('email').value = ''
alert("Запись успешно добавлена");
this.props.history.push('/')
}
    render() {
        return (
            <>
            <Container>
            <h3 className={"text-center mt-3"}>Заполните заявку</h3>
            <div className={"fon"}>
                <Form >
                    <Form.Group >
                        <Form.Label>Имя</Form.Label>
                        <Form.Control name="name" id="name" value={this.state.name} 
                        onChange={(data)=>{this.setState({name:data.target.value}) }} size="sm" />
                        <Form.Label className={"mt-3"}>Почта</Form.Label>
                        <Form.Control name="email" id="email" value={this.state.email} 
                       onChange={(data)=>{this.setState({email:data.target.value}) }} as="textarea" size="sm" rows="2" />
                    </Form.Group>
                    <Button onClick={()=>{this.submit()}} className={"but mb-2"} >Добавить</Button>
                </Form>
            </div>
        </Container>
            </>
        )
    }
}