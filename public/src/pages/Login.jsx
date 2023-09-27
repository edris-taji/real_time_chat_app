/** @format */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import Logo from '../assets/logo.svg';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';

function Login() {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		username: '',
		password: '',
	});

	useEffect(() => {
		if (localStorage.getItem('chat-app-user')) {
			navigate('/');
		}
	}, []);

	const toastOptions = {
		position: 'bottom-right',
		autoClose: 8000,
		pauseOnHover: true,
		draggable: true,
		theme: 'light',
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (handleValidation()) {
			const { password, username } = values;
			const { data } = await axios.post(loginRoute, {
				username,
				password,
			});

			if (data.status === false) {
				toast.error(data.msg, toastOptions);
			}

			if (data.status === true) {
				localStorage.setItem('chat-app-user', JSON.stringify(data.user));
				navigate('/');
			}
		}
	};

	const handleValidation = () => {
		const { password, username } = values;
		if (password === '') {
			toast.error('username and passwrod are required.', toastOptions);
			return false;
		} else if (username === '') {
			toast.error('username and passwrod are required.', toastOptions);
			return false;
		}
		return true;
	};

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};
	return (
		<>
			<FormContainer>
				<form
					onSubmit={(event) => {
						handleSubmit(event);
					}}>
					<div className='brand'>
						<div className='logo'>
							<img
								src={Logo}
								alt=''
							/>
						</div>
						<h1>Snappy</h1>
					</div>
					<input
						type='text'
						placeholder='Username'
						name='username'
						onChange={(e) => handleChange(e)}
					/>
					<input
						type='password'
						placeholder='Password'
						name='password'
						onChange={(e) => handleChange(e)}
					/>

					<button type='submit'>Login in</button>
					<span>
						Don't have an account? <Link to='/register'>Register</Link>
					</span>
				</form>
			</FormContainer>
			<ToastContainer />
		</>
	);
}

const FormContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	align-items: center;
	background-color: #ddd;
	.brand {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		position: relative;
		.logo {
			position: absolute;
			top: -6rem;
			background: #0a0a13;
			border-radius: 5rem;
			border: 3px solid #696969;
			width: 6rem;
			height: 6rem;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
		}
		.logo img {
			height: 5.6em;
			position: absolute;
			left: -0.6rem;
		}

		h1 {
			color: #fff;
			text-transform: uppercase;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: #2f2f2f;
		padding: 3rem 5rem;
		border-radius: 2rem;
		input {
			background-color: #fff;
			padding: 1rem;
			border: 0.1rem solid #696969;
			border-radius: 1rem;
			color: #000;
			width: 100%;
			font-size: 1rem;
			margin: 10px 0;
			&:focus {
				border: 0.1rem solid dodgerblue;
				outline: none;
			}
		}
		button {
			background-color: dodgerblue;
			color: #fff;
			padding: 1rem 2rem;
			border: none;
			font-weight: bold;
			cursor: pointer;
			border-radius: 1rem;
			transition: 0.5s ease-in-out;
			text-transform: uppercase;
			font-size: 1rem;
			&:focus {
				border: 0.1rem solid dodgerblue;
				outline: none;
			}
		}
		span {
			color: #fff;
			text-transform: uppercase;
			padding: 10px 0;
			a {
				color: #1e90ff;
				text-decoration: none;
				font-weight: bold;
			}
		}
	}
`;

export default Login;
