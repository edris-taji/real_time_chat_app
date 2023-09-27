/** @format */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import loader from '../assets/logo.svg';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { setAvatarRoute } from '../utils/APIRoutes';

import { Buffer } from 'buffer';

function SetAvatar() {
	// const api = 'https://api.multiavatar.com/45678945';
	const api = 'assets/avatars';
	const navigate = useNavigate();

	const [avatars, setAvatars] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedAvatar, setSelectedAvatar] = useState(undefined);

	const toastOptions = {
		position: 'bottom-right',
		autoClose: 8000,
		pauseOnHover: true,
		draggable: true,
		theme: 'light',
	};

	useEffect(() => {
		if (!localStorage.getItem('chat-app-user')) {
			navigate('/login');
		}
	}, []);

	const setProfilepicture = async () => {
		if (selectedAvatar === undefined) {
			toast.error('Please select an avatar', toastOptions);
		} else {
			try {
				if (!isLoading) {
					const user = await JSON.parse(localStorage.getItem('chat-app-user'));
					const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
						image: avatars[selectedAvatar],
					});

					if (data.isSet) {
						user.isAvatarImageSet = true;
						user.avatarImage = data.image;
						localStorage.setItem('chat-app-user', JSON.stringify(user));
						navigate('/');
					} else {
						toast.error(
							'Error setting avatar. Please try again.',
							toastOptions
						);
					}
				}
			} catch (error) {
				alert(error);
			}
		}
	};

	useEffect(() => {
		const useeffect = async () => {
			const data = [];
			for (let i = 0; i < 4; i++) {
				// const image = await axios.get(`${api}/${Math.random() * 10000}`);
				const image = `${api}/avatar (${Math.floor(Math.random() * 20)}).png`;

				// const buffer = new Buffer(image.data);
				// data.push(buffer.toString('base64'));
				data.push(image);
			}

			setAvatars(data);
			setIsLoading(false);
		};

		useeffect();
	}, []);

	return (
		<>
			{isLoading ? (
				<Container>
					<div className='loader'>
						<img
							src={loader}
							alt='loader'
							className='loader'
						/>
					</div>
				</Container>
			) : (
				<Container>
					<div className='title-container'>
						<h1>Pick an avatar as your profile picture</h1>
					</div>
					<div className='avatars'>
						{avatars.map((avatar, index) => {
							return (
								<div
									key={index}
									className={`avatar ${
										selectedAvatar === index ? 'selected' : ''
									}`}>
									<img
										// src={`data:image/svg+xml;base64,${avatar}`}
										src={`${avatar}`}
										alt='avatar'
										onClick={() => setSelectedAvatar(index)}
									/>
								</div>
							);
						})}
					</div>

					<button
						className='submit-btn'
						onClick={setProfilepicture}>
						Set as Profile Picture
					</button>
				</Container>
			)}
			<ToastContainer />
		</>
	);
}

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	align-items: center;
	background-color: #2f2f2f;
	div.loader {
		max-inline-size: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background: #2f2f2f;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		img.loader {
			width: 20%;
		}
	}

	.title-container {
		h1 {
			color: #fff;
		}
	}
	.avatars {
		display: flex;
		gap: 2;
		.avatar {
			border: 0.4rem solid transparent;
			padding: 0.2rem;
			margin: 10px 3px;
			display: flex;
			border-radius: 5rem;
			justify-content: center;
			align-items: center;
			transition: 0.5s ease-in-out;
			img {
				height: 6rem;
			}
		}
		.selected {
			border: 0.4rem solid dodgerblue !important;
		}
	}
	.submit-btn {
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
`;

export default SetAvatar;
