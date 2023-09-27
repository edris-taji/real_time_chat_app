/** @format */

import React, { useState } from 'react';
import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

import Picker from 'emoji-picker-react';

import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

const ChatInput = ({ handleSendMsg }) => {
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [msg, setMsg] = useState('');

	const handleEmojiPickerHideShow = () => {
		setShowEmojiPicker(!showEmojiPicker);
	};

	const handleEmojiClick = (event, emoji) => {
		let message = msg;
		message += emoji.emoji;
		setMsg(message);
		console.log(emoji);
	};

	const sendChat = (event) => {
		event.preventDefault();
		if (msg.length > 0) {
			handleSendMsg(msg);
			setMsg('');
		}
	};

	return (
		<>
			<Container>
				<form
					className='input-container'
					onSubmit={(e) => sendChat(e)}>
					<input
						type='text'
						placeholder='Type your message here..'
						value={msg}
						onChange={(e) => setMsg(e.target.value)}
					/>
					<button className='submit'>
						<IoMdSend />
					</button>
					{/* <div className='button-container'>
						<div className='emoji'>
							<BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
							{showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
						</div>
					</div> */}
				</form>
			</Container>
		</>
	);
};

const Container = styled.div`
	    /* display: grid; */
    /* grid-template-columns: 5% 95%; */
    align-items: center;
    /* background-color: #ccc; */
    /* padding: 0 2rem; */
    /* padding-bottom: 0.3rem; */
    /* height: 100%; */
	.button-container {
		display: flex;
		align-items: center;
		color: #ffff;
		gap: 1rem;
		.emoji {
			position: relative;
			/* display: none; */
			svg {
				    border-radius: 10rem;
					border: 1px solid #ab9d9f;
					font-size: 2rem;
					color: #ffffff;
					cursor: pointer;
					background: #ab9d9f;
			}

			.EmojiPickerReact {
				position: absolute;
				top: -485px;
				background-color: #080420;
				box-shadow: 0 5px 1px #9a86f3;
				border-color: #9186f3;
				.emoji-scroll-wrapper::-webkit-scrollbar {
					background-color: #080420;
					width: 5px;

					&-thumb {
						background-color: #9186f3;
					}
			}
				.emoji-categories {
					button {
						filter: contrast(0);
					}
					.emoji-search {
						background-color: transparent;
						border-color: #9186f3;
					}
					.emoji-group {
						background-color: #080420;
					}
				}
			}
		}
	}

	.input-container {
		width: 100%;
		/* border-radius: 2rem; */
		display: flex;
		align-items: center;
		gap: 2rem;
		background-color: #ffff;
		padding: 0.6rem 0.5rem 0rem 0rem;
		input {
			width: 90%;
			height: 60%;
			background-color: transparent;
			color: #313131;
			border: none;
			padding: 1rem;
			padding-left: 2rem;
			font-size: 13px;
			position: relative;
			top: -5px;
			&::selection {
				background-color: #86c4f3;
			}
			&:focus {
				outline: none;
			}
		}
		button {
			position: relative;
			top: -4px;
			border-radius: 2rem;
			display: flex;
			justify-content: center;
			align-items: center;
			border: none;
			background-color: #9186f300;
			font-size: 2.5rem;
			color: dodgerblue;
			margin: 0 0px;
			outline: none;
			cursor: pointer;
		}
	}
`;

export default ChatInput;
