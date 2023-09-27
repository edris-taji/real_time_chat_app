/** @format */

import React, { Component } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SetAvatar from './pages/SetAvatar';

class App extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<BrowserRouter>
				<Routes>
					<Route
						path='/register'
						element={<Register />}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/setAvatar'
						element={<SetAvatar />}
					/>
					<Route
						path='/'
						element={<Chat />}
					/>
				</Routes>
			</BrowserRouter>
		);
	}
}

export default App;
