import React, { Component } from 'react'
import { Button, Container, Col, Row, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';
import '../Pages/Position.css';


export default class Departments extends Component {
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
        fetch('/departments')
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
                <p className={"text-center nametitle"}>Отделы</p>
                <Container fluid>
                     <Row>                  
                    <Col  xs={2}></Col>
                    <Col xs={7}>
                    <Table>
                        <thead>
                            <th>Наименование</th>
                        </thead>
                        <tbody>
                            {items.map(item => (<tr key={item.name}>
                                <td> 
                                <p/> <Link to={{ pathname: `department/${item.id_departments}` }}>{item.name}</Link><p/>
                                </td>
                            </tr>))}
                        </tbody>
                    </Table>
                    </Col>
                    <Col xs={3}><Link to={'/newdepartment'}><Button  className={"but mb-2"}>Добавить отдел</Button></Link><br/></Col>
                    </Row>  </Container>
                    </>
            )
        }
    }
}