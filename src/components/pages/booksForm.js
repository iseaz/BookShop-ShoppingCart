"use strict"

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { findDOMNode } from 'react-dom'
import {
	Button,
	Col,
	ControlLabel,
	DropdownButton,
	FormControl,
	FormGroup,
	Image,
	InputGroup,
	MenuItem,
	Panel,
	Row,
	Well
} from 'react-bootstrap'
import axios from 'axios'
import { deleteBooks, getBooks, postBooks, resetButton } from '../../actions/booksActions'

class BooksForm extends Component {
	constructor(){
		super()

		this.state = {
			images: [{}],
			img: ''
		}
	}

	componentDidMount(){
		this.props.getBooks()

		axios.get('/api/images')
			.then(response => {
				this.setState({
					images: response.data
				})
			})
			.catch(err => {
				this.setState({
					images: 'error loading image files from the server',
					img: ''
				})
			})
	}

	handleSubmit = () => {
		const book = [{
			title: findDOMNode(this.refs.title).value,
			description: findDOMNode(this.refs.description).value,
			images: findDOMNode(this.refs.images).value,
			price: findDOMNode(this.refs.price).value
		}]

		this.props.postBooks(book)
	}

	resetForm = () => {
		this.props.resetButton()

		findDOMNode(this.refs.title).value = ''
		findDOMNode(this.refs.description).value = ''
		findDOMNode(this.refs.price).value = ''

		this.setState({
			img: ''
		})
	}

	onDelete(){
		let bookId = findDOMNode(this.refs.delete).value

		this.props.deleteBooks(bookId)
	}

	handleSelect(img){
		this.setState({
			img: '/images/' + img
		})
	}

	render(){
		const booksList = this.props.books.map(book => {
			return (
				<option key={book._id} value={book._id}>{book.title}</option>
			)
		})

		const imgList = this.state.images.map((image, i) => {
			return (
				<MenuItem key={i} eventKey={image.name} onClick={() => this.handleSelect(image.name)}>{image.name}</MenuItem>
			)
		})

		return (
			<Well>
				<Row>
					<Col xs={12} sm={6}>
						<Panel>
							<InputGroup>
        						<FormControl type="text" ref="images" value={this.state.img} />
								<DropdownButton
									componentClass={InputGroup.Button}
									id="input-dropdown-addon"
									title="Select an image" 
									bsStyle="primary">
									{imgList}
								</DropdownButton>
							</InputGroup>

							<Image src={this.state.img} responsive />
						</Panel>
					</Col>

					<Col xs={12} sm={6}>
						<Panel>
							<FormGroup controlId="title" validationState={this.props.validation}>
								<ControlLabel>Title</ControlLabel>
								<FormControl type="text" placeholder="Enter Title" ref="title" />
								<FormControl.Feedback />
							</FormGroup>

							<FormGroup controlId="description" validationState={this.props.validation}>
								<ControlLabel>Description</ControlLabel>
								<FormControl type="text" placeholder="Enter Description" ref="description" />
								<FormControl.Feedback />
							</FormGroup>

							<FormGroup controlId="price" validationState={this.props.validation}>
								<ControlLabel>Price</ControlLabel>
								<FormControl type="text" placeholder="Enter Price" ref="price" />
								<FormControl.Feedback />
							</FormGroup>

							<Button 
								bsStyle={(!this.props.style) ? ('primary') : (this.props.style)} 
								bsSize="small" 
								onClick={(!this.props.msg) ? (this.handleSubmit) : (this.resetForm)}>
								{(!this.props.msg) ? ('Save book') : (this.props.msg)}
							</Button>
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
					</Col>
				</Row>
			</Well>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		deleteBooks,
		getBooks,
		postBooks,
		resetButton
	}, dispatch)
}

const mapStateToProps = state => {
	return {
		books: state.books.books,
		msg: state.books.msg,
		style: state.books.style,
		validation: state.books.validation
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm)