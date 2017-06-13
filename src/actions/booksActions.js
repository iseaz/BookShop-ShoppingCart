"use strict"

export const getBooks = () => {
	return {
		type: 'GET_BOOKS'
	}
}

export const postBooks = book => {
	return {
		type: 'POST_BOOK',
		payload: book
	}
}

export const deleteBooks = id => {
	return {
		type: 'DELETE_BOOK',
		payload: id
	}
}

export const updateBooks = id => {
	return {
		type: 'UPDATE_BOOK',
		payload: id
	}
}