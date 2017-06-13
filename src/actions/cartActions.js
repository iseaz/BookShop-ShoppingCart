"use strict"

export const addToCart = book => {
	return {
		type: 'ADD_TO_CART',
		payload: book
	}
}

export const updateCart = (_id, unit) => {
	return {
		type: 'UPDATE_CART',
		_id,
		unit
	}
}

export const deleteCartItem = cart => {
	return {
		type: 'DELETE_CART_ITEM',
		payload: cart
	}
}