import React, { Component } from 'react'
import { connect } from 'react-redux'

import Menu from './components/menu'
import Footer from './components/footer'

class Main extends Component {
	render(){
		return (
			<div>
				<Menu cartItemsNumber={this.props.totalQty} />
				{this.props.children}
				<Footer />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		totalQty: state.cart.totalQty
	}
}

export default connect(mapStateToProps)(Main)