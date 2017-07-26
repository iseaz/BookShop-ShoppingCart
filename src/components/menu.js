"use strict"

import React, { Component } from 'react'
import { Badge, MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap'

class Menu extends Component {
	render(){
		return (
			<Navbar inverse fixedTop>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="/">Redux Application</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>

				<Navbar.Collapse>
					<Nav pullRight>
						<NavItem eventKey={1} href="/admin">Admin</NavItem>
						<NavItem eventKey={2} href="/cart">
							Your Cart 
							{
								(this.props.cartItemsNumber > 0) ? <Badge className="badge">{this.props.cartItemsNumber}</Badge> : ''
							}
						</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

export default Menu