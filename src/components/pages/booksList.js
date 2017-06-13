"use strict"

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Carousel, Col, Grid, Row } from 'react-bootstrap'
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
						images={book.images} 
						price={book.price} />
				</Col>
			)
		})

		return (
			<Grid>
				<Row>
					<Carousel>
						<Carousel.Item>
							<img width={900} height={300} alt="900x300" src="/images/home1.jpg"/>
							<Carousel.Caption>
							<h3>First slide label</h3>
							<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item>
							<img width={900} height={300} alt="900x300" src="/images/home2.jpg"/>
							<Carousel.Caption>
							<h3>Second slide label</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
							</Carousel.Caption>
						</Carousel.Item>
					</Carousel>
				</Row>

				<Row style={{marginTop: '15px'}}>
					<Cart />
				</Row>
				
				<Row style={{marginTop: '15px'}}>
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