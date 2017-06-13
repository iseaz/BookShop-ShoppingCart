"use strict"

const INITIAL_STATE = {
	cart: []
}

export const cartReducers = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case 'ADD_TO_CART':
			return {
				...state,
				cart: action.payload,
				totalAmount: totals(action.payload).amount,
				totalQty: totals(action.payload).qty
			}
		
		case 'UPDATE_CART':
			const currentBookToUpdate = [...state.cart]
			const indexToUpdate = currentBookToUpdate.findIndex(book => {
				return book._id === action._id
			})

			const newBookToUpdate = {
				...currentBookToUpdate[indexToUpdate],
				quantity: currentBookToUpdate[indexToUpdate].quantity + action.unit
			}

			let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate+1)]

			return {
				...state,
				cart: cartUpdate,
				totalAmount: totals(cartUpdate).amount,
				totalQty: totals(cartUpdate).qty
			}
			
		
		case 'DELETE_CART_ITEM':
			return {
				...state,
				cart: action.payload,
				totalAmount: totals(action.payload).amount,
				totalQty: totals(action.payload).qty
			}
		
		default:
			return state
	}
}

export const totals = payloadArr => {
	const totalAmount = payloadArr.map(cart => {
		return cart.price * cart.quantity
	}).reduce((a, b) => a + b, 0)

	const totalQty = payloadArr.map(qty => {
		return qty.quantity
	}).reduce((a, b) => a + b, 0)

	return {
		amount: totalAmount.toFixed(2),
		qty: totalQty
	}
}