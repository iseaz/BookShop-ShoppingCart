"use strict"

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { findDOMNode } from 'react-dom'
import { Button, ControlLabel, FormControl, FormGroup, Panel, Well } from 'react-bootstrap'
import { deleteBooks, postBooks } from '../../actions/booksActions'

class BooksForm extends Component {
	handleSubmit = () => {
		const book = [{
			id: findDOMNode(this.refs.title).value,
			title: findDOMNode(this.refs.title).value,
			description: findDOMNode(this.refs.description).value,
			price: findDOMNode(this.refs.price).value
		}]

		this.props.postBooks(book)
	}

	onDelete(){
		let bookId = findDOMNode(this.refs.delete).value

		this.props.deleteBooks(bookId)
	}

	render(){
		const booksList = this.props.books.map(book => {
			return (
				<option key={book._id} value={book._id}>{book._id}</option>
			)
		})

		return (
			<Well>
				<Panel>
					<FormGroup controlId="title">
						<ControlLabel>Title</ControlLabel>
						<FormControl type="text" placeholder="Enter Title" ref="title" />
					</FormGroup>

					<FormGroup controlId="description">
						<ControlLabel>Description</ControlLabel>
						<FormControl type="text" placeholder="Enter Description" ref="description" />
					</FormGroup>

					<FormGroup controlId="price">
						<ControlLabel>Price</ControlLabel>
						<FormControl type="text" placeholder="Enter Price" ref="price" />
					</FormGroup>

					<Button bsStyle="primary" bsSize="small" onClick={this.handleSubmit}>Save book</Button>
				</Panel>

				<Panel style={{marginTop: '25px'}}>
					<FormGroup controlId="formControlSelect">
						<ControlLabel>Select a book id to delete</ControlLabel>
						<FormControl componentClass="select" placeholder="select" ref="delete">
							<option>Select</option>
							{booksList}
						</FormControl>
					</FormGroup>

					<Button bsSize="small" bsStyle="danger" onClick={() => this.onDelete()}>Delete book</Button>
				</Panel>
			</Well>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		deleteBooks,
		postBooks
	}, dispatch)
}

const mapStateToProps = state => {
	return {
		books: state.books.books
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm)