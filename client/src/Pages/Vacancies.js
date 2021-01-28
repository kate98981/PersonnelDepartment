import React, { Component } from 'react'
import { Button, Container, Col, Row, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';
import '../Pages/Position.css';


export default class Vacancies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        };
    }
    handleEdit = id => {
        this.props.history.push(`/edit/${id}`);
    };
    componentDidMount() {
        fetch('/vacancies')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
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


    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <p> Error {error.message} </p>
        } else if (!isLoaded) {
            return <><p className={"text-center"}> Загрузка... </p><div className={"air3"}></div></>
        } else {
            return (
                <>
                <p className={"text-center nametitle"}>Вакансии</p>
                <Container fluid>
                     <Row>                  
                     <Col  xs={1}></Col>
                    <Col xs={8}>
                    <Table>
                        <thead>
                            <th>Должность</th> <th>Обязанности</th> <th>Дата</th> <th>Статус </th>
                        </thead>
                        <tbody>
                            {items.map(item => (<tr key={item.name}>
                                <td> 
                                <p/><Link to={{ pathname: `vacancie/${item.id_vacancies}` }}>{item.pname}</Link><p/>
                                </td>
                                <td> 
                                <p/>{item.demands}<p/>
                                </td>
                                <td> 
                                <p/>{item.date}<p/>
                                </td>
                                <td> 
                                <p/>{item.status}<p/>
                                </td>
                            </tr>))}
                        </tbody>
                    </Table>
                    </Col>
                    <Col xs={3}><Link to={'/newvacancie'}><Button  className={"but mb-2"}>Добавить вакансию</Button></Link><br/></Col>
                    </Row>  </Container>
                    </>
            )
        }
    }
}