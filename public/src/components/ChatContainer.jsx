/** @format */

import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { sendMessageRoute, getAllMessageRoute } from '../utils/APIRoutes';
import ChatInput from '../components/ChatInput';
import Logout from '../components/Logout';
import { v4 as uuidv4 } from 'uuid';
import { IoIosArrowBack, IoIosEye } from 'react-icons/io';

const ChatContainer = ({
	currentChat,
	currentUser,
	isLoaded,
	socket,
	gobackButton,
}) => {
	const [messages, setMessages] = useState([]);
	const [arrivalMessage, setArrivalMessages] = useState([null]);
	const scrollRef = useRef();

	useEffect(() => {
		const useeffect = async () => {
			if (currentChat) {
				const response = await axios.post(getAllMessageRoute, {
					from: currentUser._id,
					to: currentChat._id,
				});

				setMessages(response.data);
			}
		};

		useeffect();
	}, [currentChat]);

	const handleSendMsg = async (msg) => {
		await axios.post(sendMessageRoute, {
			from: currentUser._id,
			to: currentChat._id,
			message: msg,
		});

		socket.current.emit('send-msg', {
			to: currentChat._id,
			from: currentChat._id,
			message: msg,
		});

		const msgs = [...messages];
		msgs.push({ fromSelf: true, message: msg });
		setMessages(msgs);
	};

	useEffect(() => {
		if (socket.current) {
			socket.current.on('msg-recieve', (msg) => {
				setArrivalMessages({ fromSelf: false, message: msg });
			});
		}
	}, []);

	useEffect(() => {
		arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
	}, [messages]);

	return (
		<>
			{currentChat && (
				<Container>
					<div className='chat-header'>
						<div className='user-details'>
							{gobackButton}
							<div className='avatar'>
								<img
									src={`${currentChat.avatarImage}`}
									alt='avatar'
								/>
							</div>
							<div className='username'>
								<h3>{currentChat.username}</h3>
							</div>
						</div>

						<Logout />
					</div>

					<div className='chat-messages'>
						{messages.map((message) => {
							return (
								<div
									ref={scrollRef}
									key={uuidv4()}>
									<div
										className={`message ${
											message.fromSelf ? 'sended' : 'recieved'
										}`}>
										<div className='content'>
											<div className='body'>
												<p>{message.message}</p>
											</div>
											<div className='footer'>
												{/* {createdAt} */}
												{/* <IoIosEye /> */}
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					<div className='chat-input'>
						<ChatInput handleSendMsg={handleSendMsg} />
					</div>
				</Container>
			)}
		</>
	);
};

const Container = styled.div`
	/* padding-top: 1rem; */
	display: grid;
	grid-template-rows: 10% 82.8% 6%;
	gap: 0.1rem;
	overflow: hidden;
	.chat-header {
		user-select: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0px 2rem;
		background-color: #fff;
		height: 68px;
		position: relative;
		bottom: -5px;
		/* margin-top: -16px; */
		.user-details {
			display: flex;
			align-items: center;
			gap: 1rem;
			.goback-contacts {
				background-color: transparent;
				border: none;
				cursor: pointer;
				font-size: 22px;
			}

			.avatar {
				img {
					height: 2rem;
				}
			}
			.username {
				h3 {
					color: #232323;
					padding: 5px;
					font-size: 15px;
					position: relative;
					top: -2px;
				}
			}
		}
	}

	.chat-messages {
		padding: .8rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow: auto;
		@media screen and (min-width: 720px) and (max-width: 1080px) {
			grid-template-columns: 15% 75% 15%;
		}
		&::-webkit-scrollbar {
			width: 0.2rem;
			&-thumb {
				background-color: #ffffff39;
				width: 0.1rem;
				border-radius: 1rem;
			}
		}
		.message {
			display: flex;
			align-items: center;
			margin: 2px 0;
			.content {
				position: relative;
				max-width: 40%;
				overflow-wrap: break-word;
				padding: .8rem 1rem;
				font-size: 14px;
				border-radius: .8rem;
				color: #222;
				.footer {
					font-size: 12px;
					position: relative;
					bottom: -10px;

					svg {
						margin: 0 0 0 4px;
					}
				}
			}
			&.recieved {
				.content {
					 .footer {
						 text-align: right;
					 }
				}
			}
		}
		.sended {
			justify-content: flex-end;
			.content {
				background-color: rgb(209, 253, 222);
				&:before {
					content: '';
					position: absolute;
					border: 10px solid #fff0;
					right: -18px;
					bottom: 10px;
					border-left-color: #cbe5ff;
				}
			}
		}

		.recieved {
			justify-content: flex-start;
			.content {
				background-color: #fff;
				&:before {
					content: '';
					position: absolute;
					border: 10px solid #fff0;
					left: -19px;
					bottom: 10px;
					border-right-color: #fff;
				}
			}
		}
	}
`;

export default ChatContainer;
