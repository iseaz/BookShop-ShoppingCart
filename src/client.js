"use strict"

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { browserHistory, hashHistory, IndexRoute, Route, Router } from 'react-router'

import reducers from './reducers'

import { addToCart } from './actions/cartActions'
import { getBooks, postBooks, deleteBooks, updateBooks } from './actions/booksActions'

import routes from './routes'

const middleware = applyMiddleware(thunk, logger)
const initialState = window.INITIAL_STATE
const store = createStore(reducers, initialState, middleware)

const Routes = (
	<Provider store={store}>
		{routes}
	</Provider>
)

render(
	Routes,
	document.getElementById('app')
)