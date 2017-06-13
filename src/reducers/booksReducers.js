"use strict"

const INITIAL_STATE = {
	books: [
		{
			_id: 1,
			title: 'book title',
			description: 'book description',
			price: 300
		}, {
			_id: 2,
			title: 'book title2',
			description: 'book description2',
			price: 600
		}
	]
}

export const booksReducers = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case 'GET_BOOKS':
			return {
				...state,
				books: [...state.books]
			}
		
		case 'POST_BOOK':
			return {
				books: [...state.books, ...action.payload]
			}
		
		case 'DELETE_BOOK':
			const currentBookToDelete = [...state.books]
			const indexToDelete = currentBookToDelete.findIndex(book => {
				return book._id == action.payload
			})

			return {
				books: [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete+1)]
			}
		
		case 'UPDATE_BOOK':
			const currentBookToUpdate = [...state.books]
			const indexToUpdate = currentBookToUpdate.findIndex(book => {
				return book._id === action.payload._id
			})

			const newBookToUpdate = {
				...currentBookToUpdate[indexToUpdate],
				title: action.payload.title
			}

			return {
				books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate+1)]
			}
		
		default:
			return state
	}
}