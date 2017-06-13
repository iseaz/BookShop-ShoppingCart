"use strict"

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deleteCartItem, getCart, updateCart } from '../../actions/cartActions'
import { Button, ButtonGroup, Col, Label, Modal, Panel, Row, Well } from 'react-bootstrap'

class Cart extends Component {
	constructor(){
		super()

		this.state = {
			showModal: false
		}
	}

	componentDidMount(){
		this.props.getCart()
	}

	open(){
		this.setState({ showModal: true })
	}

	close(){
		this.setState({ showModal: false })
	}

	onDelete(_id){
		const currentBookToDelete = this.props.cart

		const indexToDelete = currentBookToDelete.findIndex(cart => {
			return cart._id === _id
		})

		let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete+1)]
		
		this.props.deleteCartItem(cartAfterDelete)
	}

	onIncrement(_id){
		this.props.updateCart(_id, 1, this.props.cart)
	}

	onDecrement(_id, quantity){
		if (quantity > 1) {
			this.props.updateCart(_id, -1, this.props.cart)
		}
	}

	renderCart(){
		const cartItemsList = this.props.cart.map(cart => {
			return (
				<Panel key={cart._id}>
					<Row>
						<Col xs={12} sm={4}>
							<h6>{cart.title}</h6>
						</Col>
						<Col xs={12} sm={2}>
							<h6>usd. {cart.price}</h6>
						</Col>
						<Col xs={12} sm={2}>
							<h6>qty. <Label bsStyle="success">{cart.quantity}</Label></h6>
						</Col>
						<Col xs={6} sm={4}>
							<ButtonGroup style={{minWidth: '300px'}}>
								<Button bsSize="small" onClick={() => this.onDecrement(cart._id, cart.quantity)}>-</Button>
								<Button bsSize="small" onClick={() => this.onIncrement(cart._id)}>+</Button>
								<Button bsSize="small" bsStyle="danger" onClick={() => this.onDelete(cart._id)}>Delete</Button>
							</ButtonGroup>
						</Col>
					</Row>
				</Panel>
			)
		})

		return (
			<Panel header="Cart" bsStyle="primary">
				{cartItemsList}
				<Row>
					<Col xs={12}>
						<h6>Total amount: {this.props.totalAmount}</h6>
						<Button bsStyle="success" bsSize="small" onClick={() => this.open()}>PROCEED TO CHECKOUT</Button>
					</Col>
				</Row>

				<Modal show={this.state.showModal} onHide={() => this.close()}>
					<Modal.Header closeButton>
						<Modal.Title>Thank you!</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<h6>Your order has been saved</h6>
						<p>You will receive an email confirmation</p>
					</Modal.Body>

					<Modal.Footer>
						<Col xs={6}>
							Total $: {this.props.totalAmount}
						</Col>
						<Button onClick={() => this.close()}>Close</Button>
					</Modal.Footer>
				</Modal>
			</Panel>
		)
	}

	renderEmpty(){
		return (
			<div></div>
		)
	}

	render(){
		if (this.props.cart[0]) {
			return this.renderCart()
		} else {
			return this.renderEmpty()
		}
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		deleteCartItem,
		getCart,
		updateCart
	}, dispatch)
}

const mapStateToProps = state => {
	return {
		cart: state.cart.cart,
		totalAmount: state.cart.totalAmount
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)