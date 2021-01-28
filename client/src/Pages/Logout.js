import React, { Component  } from 'react'
import { Media, Container, Col, Row} from "react-bootstrap";
import { Link } from 'react-router-dom';
import '../Pages/First.css';
export default class Logout extends Component {


    componentDidMount() {
        fetch('/logout')
        .then(res => res.json())   
         window.location.reload();
    }


    render() {
       
            return (
           <></>
                )
    }
}