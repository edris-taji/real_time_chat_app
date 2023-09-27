/** @format */

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import io from 'socket.io-client';
import {
	IoIosAdd,
	IoIosAddCircle,
	IoIosArrowBack,
	IoIosArrowDropright,
	IoIosArrowForward,
	IoIosPulse,
	IoIosRestaurant,
} from 'react-icons/io';

const Chat = () => {
	const socket = useRef();
	const navigate = useNavigate();
	const [contacts, setContacts] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);
	const [currentChat, setCurrentChat] = useState(undefined);
	const [isLoaded, setIsLoaded] = useState(false);
	const [goBack, setGoBack] = useState('');

	useEffect(() => {
		if (!localStorage.getItem('chat-app-user')) {
			navigate('/login');
		}
	}, []);

	useEffect(() => {
		if (currentUser) {
			socket.current = io(host);
			socket.current.emit('add-user', currentUser._id);
		}
	}, [currentUser]);

	useEffect(() => {
		const useeffect = async () => {
			if (!localStorage.getItem('chat-app-user')) {
				navigate('/login');
			} else {
				setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
				setIsLoaded(true);
			}
		};
		useeffect();
	}, []);

	useEffect(() => {
		const useeffect = async () => {
			if (currentUser) {
				if (currentUser.isAvatarImageSet) {
					const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
					setContacts(data.data);
				} else {
					navigate('/setAvatar');
				}
			}
		};
		useeffect();
	}, [currentUser]);

	const handleChatChange = (chat) => {
		setCurrentChat(chat);
	};

	return (
		<>
			{isLoaded ? (
				<Container>
					<div className={`container ${goBack}`}>
						<Contacts
							contacts={contacts}
							currentUser={currentUser}
							changeChat={handleChatChange}
							gobackButton={
								<button
									className='goback'
									onClick={() => setGoBack('ChangeChatContainer')}>
									<IoIosArrowForward />
								</button>
							}
						/>

						{isLoaded && currentChat === undefined ? (
							<Welcome
								currentUser={currentUser}
								gobackButton={
									<button
										className='goback w'
										onClick={() => setGoBack('ChangeContacts')}>
										Start
									</button>
								}
							/>
						) : (
							<ChatContainer
								currentChat={currentChat}
								currentUser={currentUser}
								isLoaded={isLoaded}
								socket={socket}
								gobackButton={
									<button
										className='goback'
										onClick={() => setGoBack('ChangeContacts')}>
										<IoIosArrowBack />
									</button>
								}
							/>
						)}
					</div>
				</Container>
			) : null}
		</>
	);
};

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	flex-direction: column;
	gap: 1rem;
	background-color: #fff;
	.container {
		height: 100vh;
		width: 100vw;
		background-image: url(./assets/backgrounds/background-0.png),linear-gradient(241deg, #0d2e4c, #000000);
		background-position: bottom;
		display: grid;
		grid-template-columns: 25% 75%;
		@media screen and (min-width: 720px) and (max-width: 1080px) {
			grid-template-columns: 35% 65%;
		}
		
		@media screen and (max-width: 720px) {
			grid-template-columns: 35% 65%;
		}
		.goback {
			display: none;
			font-size: 22px;
			border: none;
			background-color: transparent;
			cursor: pointer;

			&.w {
				color: #222;
				text-transform: uppercase;
				padding: 10px 35px;
				background-color: lightgrey;
				border-radius: 2rem;
				margin-top: 1rem;
			}
		}

		@media screen and (max-width: 700px) {
			grid-template-columns: 0% 100%;
			.goback {
				display: block;
			}

			&.ChangeChatContainer {
				grid-template-columns: 0% 100%;
			}
			&.ChangeContacts {
				grid-template-columns: 100% 0%;
			}
		}
	}
`;

export default Chat;
