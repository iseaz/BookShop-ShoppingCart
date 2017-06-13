"use strict"

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Col, Grid, Row } from 'react-bootstrap'
import { getBooks } from '../../actions/booksActions'
import BookItem from './bookItem'
import BooksForm from './booksForm'
import Cart from './cart'

class BooksList extends Component {
	componentDidMount(){
		this.props.getBooks()
	}

	render(){
		const booksList = this.props.books.map(book => {
			return (
				<Col xs={12} sm={6} md={4} key={book._id}>
					<BookItem 
						_id={book._id} 
						title={book.title} 
						description={book.description} 
						price={book.price} />
				</Col>
			)
		})

		return (
			<Grid>
				<Row>
					<Cart />
				</Row>
				<Row style={{ marginTop: '15px' }}>
					<Col xs={12} sm={6}>
						<BooksForm />
					</Col>
					{booksList}
				</Row>
			</Grid>
		)
	}
}

const mapStateToProps = state => {
	return {
		books: state.books.books
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ getBooks }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList)