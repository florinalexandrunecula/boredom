import React, { Component } from 'react'
import { MenuItems } from "./menuItems"
import "./navBar.css"
import { Button } from "../button/button"
import { Link } from 'react-router-dom'

class NavBar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    liClick = () => {
        this.handleClick()
    }

    render() {
        return(
            <nav className="NavBarItems">
                <h1 className="navbar-logo">B0red0m<i className="fas fa-meh"/></h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}/>
                </div>
                <ul className={ this.state.clicked ? 'nav-menu active' : 'nav-menu' }>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index} onClick={this.liClick}>
                                <Link className={item.cName} to={item.url}>
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <Button>Sign Up</Button>
            </nav>
        )
    }
}

export default NavBar