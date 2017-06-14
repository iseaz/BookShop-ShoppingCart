"use strict"

import axios from 'axios'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

import reducers from './src/reducers'
import routes from './src/routes'

const handleRender = (req, res) => {
	axios.get('http://localhost:3002/books')
		.then(response => {
			//let HTML = JSON.stringify(response.data)
			//res.render('index', { HTML })

			const store = createStore(reducers, {
				"books": {
					"books": response.data
				}
			})

			const initialState = JSON.stringify(store.getState()).replace(/<\/script/g,'<\\/script').replace(/<!--/g, '<\\!--')

			const Routes = {
				routes,
				location: req.url
			}

			match(Routes, (err, redirect, props) => {
				if (err) {
					res.status(500).send('error fullfilling the request')
				} else if (redirect) {
					res.status(302, redirect.pathname + redirect.search)
				} else if (props) {
					const reactComponent = renderToString(
						<Provider store={store}>
							<RouterContext {...props} />
						</Provider>
					)

					res.status(200).render('index', { reactComponent, initialState })
				} else {
					res.status(404).send('Not Found')
				}
			})
		})
		.catch(err => {
			console.log('#Initial Server-side rendering error', err)
		})
}

module.exports = handleRender