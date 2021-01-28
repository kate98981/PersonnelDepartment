import React, { Component } from 'react'
import { Container, Button, Form } from "react-bootstrap";

export default class NewPosition extends Component {

    constructor() {
        super();
        this.state = {
            name: ""
        }
    }

submit(e){
    let url ="/newposition"
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
this.props.history.push('/positions')
}
    render() {
        return (
            <>
            <Container>
            <h3 className={"text-center mt-3"}>Добавление должности</h3>
                <Form >
                    <Form.Group >
                        <Form.Label>Наименование</Form.Label>
                        <Form.Control name="name" id="name" value={this.state.name} 
                        onChange={(data)=>{this.setState({name:data.target.value}) }} size="sm" />
                    </Form.Group>
                    <Button onClick={()=>{this.submit()}} className={"but mb-2"} >Добавить</Button>
                </Form>
        </Container>
            </>
        )
    }
}