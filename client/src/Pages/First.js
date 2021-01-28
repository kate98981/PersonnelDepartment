import React, { Component  } from 'react'
import { Media, Container, Col, Row} from "react-bootstrap";
import { Link } from 'react-router-dom';
import '../Pages/First.css';


export default class First extends Component {
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
        fetch('/merchants')
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
                <Container>
                    {items.map(item => (
                        <Row key={item.name}>
                            <Col md={"8"} className={"ml-5"}>
                                <Media className={"m-5"}>
                                    <Media.Body>
                                    <Link to={{ pathname: `merchants/${item.id}`}}> <h5 className={"title"}>{item.name}</h5></Link>
                                        <p>{item.email}</p>
                                    </Media.Body>
                                </Media>
                            </Col>
                        </Row>
                    ))}
                </Container>
                )
        }
    }
}