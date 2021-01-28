import React, { Component } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import logo from './HR.png'
import Employees from '../Pages/Employees'
import Employee from '../Pages/Employee'
import NewEmployee from '../Pages/NewEmployee'
import Positions from '../Pages/Positions'
import Position from '../Pages/Position'
import NewPosition from '../Pages/NewPosition'
import Departments from '../Pages/Departments'
import Department from '../Pages/Department'
import NewDepartment from '../Pages/NewDepartment'
import Vacancies from '../Pages/Vacancies'
import Vacancie from '../Pages/Vacancie'
import NewVacancie from '../Pages/NewVacancie'
import Second from '../Pages/Second'
import Merchant from '../Pages/Merchant'
import Registration from '../Pages/Registration'
import Login from '../Pages/Login'
import Profile from '../Pages/Profile'
import Logout from '../Pages/Logout'
import './Header.css'

export default class Header extends Component {
    render() {
        return (
            <>
                <Navbar collapseOnSelect expand={"md"} className={"header"}>
                <Container fluid>
                        <Navbar.Brand href="/vacancies">
                            <img
                                src={logo}
                                height="90"
                                width="90"
                                className="d-inline-block align-top"
                                alt="logo"
                            /> 
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/vacancies">Вакансии</Nav.Link>
                                <Nav.Link href="/employees">Сотрудники</Nav.Link>
                                <Nav.Link href="/positions">Должности</Nav.Link>
                                <Nav.Link href="/departments">Отделы</Nav.Link>
                                <Nav className="text">Вы вошли как</Nav>
                                <Nav.Link href="/profile">{this.props.name}</Nav.Link>
                                <Nav.Link href="/logout">Выйти</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Router>
<Switch>
            <Route exact path='/vacancies' component={Vacancies} />
            <Route path='/vacancie/:id' component={Vacancie} />
            <Route path='/newvacancie' component={NewVacancie} />
            <Route exact path='/' component={Vacancies} />
            <Route path='/second' component={Second} />
            <Route path='/employees' component={Employees} />
            <Route path='/employee/:id' component={Employee} />
            <Route path='/newemployee' component={NewEmployee} />
            <Route path='/positions' component={Positions} />
            <Route path='/position/:id' component={Position} />
            <Route path='/newposition' component={NewPosition} />
            <Route path='/departments' component={Departments} />
            <Route path='/department/:id' component={Department} />
            <Route path='/newdepartment' component={NewDepartment} />
            <Route path='/merchants/:id' component={Merchant} />
            <Route path="/login" exact render={(props) => <Login />} />
            <Route path="/registration" exact render={(props) => <Registration />} /> 
            <Route path="/profile" exact render={(props) => <Profile />} />  
            <Route path="/logout" exact render={(props) => <Logout />} />  
</Switch>
                </Router>
            </>
        )
    }
}