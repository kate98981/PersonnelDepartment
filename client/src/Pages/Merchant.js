import React, { Component } from 'react'
import { Media, Container, Col, Row, Form, Button} from "react-bootstrap";

export default class Merchant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            name: ""
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
    }

    getData = () => {
          fetch(`${window.location.pathname}`)
          .then(response => response.json())
          .then(obj => {
            console.log(obj);
            const { name, email } = obj[0];
            this.setState({
              name,
              email
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
    //document.getElementById('name').value = ''
    //document.getElementById('email').value = ''
    alert("Запись успешно изменена");
    window.location.reload();
    //this.props.history.push(`${window.location.pathname}`)
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
    this.props.history.push('/')
    }




    /*
    
*/


    render() {
        /*
        $(document).ready(function() {
            document.getElementById("info").style.display="block";
        });*/
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

        const { error, isLoaded, items } = this.state;
        if (error) {
            return <p> Error {error.message} </p>
        } else if (!isLoaded) {
            return <><p className={"text-center"}> Загрузка... </p><div className={"air3"}></div></>
        } else {
            return (
              <Container>
                  <Form id="info">
                    {items.map(item => (
                        <Row key={item.name}>
                            <Col md={"8"} className={"ml-5"}>
                                <Media className={"m-5"}>
                                    <Media.Body>
                                    <h5 className={"title"}>{item.name}</h5>
                                        <p>{item.email}</p>
                                    </Media.Body>
                                </Media>
                            </Col> 
                        </Row>
                    ))}
                    <Button onClick={()=>{showEditForm()}} className={"but mb-2"}>Редактировать</Button>
                    <Button 
                    onClick={(e) => window.confirm("Вы уверены, что хотите удалить?") && this.submitDelete()}
                     className={"but mb-2"}>Удалить</Button>
                </Form>
                <Form id="editForm" style={{display : 'none'}}>
                <h3 className={"text-center mt-3"}>Редактирование</h3>
                    <Form.Group >
                        <Form.Label>Имя</Form.Label>
                        <Form.Control name="name" id="name" value={this.state.name} 
                        onChange={(data)=>{this.setState({name:data.target.value}) }} size="sm" />
                        <Form.Label className={"mt-3"}>Почта</Form.Label>
                        <Form.Control name="email" id="email" value={this.state.email} 
                       onChange={(data)=>{this.setState({email:data.target.value}) }} as="textarea" size="sm" rows="2" />
                    </Form.Group>
                    <Button onClick={()=>{hideEditForm()}} className={"but mb-2"}>Отмена</Button><br/>
                    <Button onClick={()=>{this.submitEdit()}} className={"but mb-2"}>Сохранить</Button>
                </Form>
        </Container>
)
    }}}