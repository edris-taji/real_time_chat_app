/** @format */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoIosPerson, IoIosSearch } from 'react-icons/io';
import MenuPanel from './MenuPanel';

const Contacts = ({ contacts, currentUser, changeChat, gobackButton }) => {
	const [currentUserName, setCurrentUserName] = useState(undefined);
	const [currentUserImage, setCurrentUserImage] = useState(undefined);
	const [currentSelected, setCurrentSelected] = useState(undefined);
	const [sea, setSea] = useState('');
	const [filteredContacts, setFilteredContacts] = useState([]);
	const [menuPanel, setMenuPanel] = useState('visible');

	useEffect(() => {
		if (currentUser) {
			setCurrentUserImage(currentUser.avatarImage);
			setCurrentUserName(currentUser.username);
		}
	}, [currentUser]);

	const changeCurrentChat = (index, contact) => {
		setCurrentSelected(index);
		changeChat(contact);
	};

	const handleSearch = async (event) => {
		event.preventDefault();

		const filteredcontacts = contacts.filter((contact) => {
			let x = contact.username.toLowerCase().includes(sea.toLowerCase());
			if (x) return contact;
		});
		setFilteredContacts(filteredcontacts);
	};

	const MarkUp = ({ contact, index }) => (
		<div
			key={index}
			className={`contact ${index === currentSelected ? 'selected' : ''}`}
			onClick={() => changeCurrentChat(index, contact)}>
			<div className='avatar'>
				<img
					// src={`data:image/svg+xml;base64,${contact.avatarImage}`}
					src={`${contact.avatarImage}`}
					alt='avatar'
				/>
			</div>
			<div className='username'>
				<h3>{contact.username}</h3>
			</div>
		</div>
	);

	return (
		<>
			{currentUserImage && currentUserName && (
				<Container>
					<div className='search'>
						{/* <button
							className='menu'
							onClick={() =>
								menuPanel == 'hidden'
									? setMenuPanel('visible')
									: setMenuPanel('hidden')
							}>
							<IoIosPerson />
						</button> */}
						<form
							className='input-container'
							onSubmit={(e) => handleSearch(e)}>
							<input
								type='text'
								placeholder='Search..'
								value={sea}
								onChange={(e) => setSea(e.target.value)}
								onKeyUp={(e) => handleSearch(e)}
							/>
							<button className='submit'>
								<IoIosSearch />
							</button>
						</form>
						{gobackButton}
					</div>
					<div className='contacts'>
						{filteredContacts.length === 0
							? contacts.map((contact, index) => {
									return MarkUp({ contact, index });
							  })
							: filteredContacts.map((contact, index) => {
									return MarkUp({ contact, index });
							  })}
					</div>
					{menuPanel == 'visible' && <MenuPanel />}
				</Container>
			)}
		</>
	);
};

const Container = styled.div`
	display: grid;
	grid-template-rows: 10% 75% 15%;
	overflow: hidden;
	background-color: #fff;
	border-right: 1px solid #d4d3d3;
	user-select: none;
	.contacts {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;
		gap: 0.8rem;
		/* padding: .5rem 0; */
		&::-webkit-scrollbar {
			width: 0.2rem;
			&-thumb {
				background-color: #ffffff39;
				width: 0.1rem;
				border-radius: 1rem;
			}
		}
		.contact {
			min-height: 3.8rem;
			width: 100%;
			cursor: pointer;
			padding: 0 0.5rem;
			gap: 1rem;
			display: flex;
			align-items: center;
			transition: 0.02s ease-in-out;
			.avatar {
				img {
					height: 3rem;
					margin-right: 10px;
				}
			}
			.username {
				h3 {
					color: #333;
					font-size: 18px;
					font-weight: 100;
				}
			}
	}
	.selected {
		background-color: dodgerblue;
		.username {
			h3 {
				color: #fff;
			}
		}
	}
	}
		.search {
		gap: 1rem;
		height: 3.4rem;
		padding: 8px 14px;
		display: flex;
		.input-container {
			display: flex;
			border: 2px solid #ddd;
			width: 100%;
			align-items: center;
			gap: 2rem;
			background-color: #ffff;
			input {
				width: 90%;
				height: 60%;
				background-color: transparent;
				color: #313131;
				border: none;
				padding: 0.6rem;
				padding-left: 0.7rem;
				font-size: 13px;
				&::selection {
					background-color: #86c4f3;
				}
				&:focus {
					outline: none;
				}
			}
			button {
				padding: 0.3rem 1rem 00.3rem 1.7rem;
				border-radius: 2rem;
				display: flex;
				justify-content: center;
				align-items: center;
				border: none;
				background-color: #9186f300;
				font-size: 2.5rem;
				margin: 0 0px;
				outline: none;
				cursor: pointer;
				svg {
					color: #ccc;
					font-size: 22px;
				}
			}
		}
		.menu {
			padding: 0rem 1rem 0rem 0rem;
			border-radius: 2rem;
			display: flex;
			justify-content: center;
			align-items: center;
			border: none;
			background-color: #9186f300;
			font-size: 2.5rem;
			margin: 0 0px;
			outline: none;
			cursor: pointer;
			svg {
				color: #ccc;
				font-size: 22px;
			}
		}
	}
`;

export default Contacts;
