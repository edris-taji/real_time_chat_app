/** @format */

import React, { useEffect, useState } from 'react';
import { IoIosMenu, IoIosSearch } from 'react-icons/io';
import { styled } from 'styled-components';
import { allUsersRoute } from '../utils/APIRoutes';
import axios from 'axios';

const ContactSearch = () => {
	const [sea, setSea] = useState('');
	const [seaResult, setSeaResult] = useState('');
	const [currentUser, setCurrentUser] = useState(undefined);
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		const useeffect = async () => {
			setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
			const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
			setContacts(data.data);
		};
		useeffect();
	}, []);

	const handleSearch = async (event) => {
		event.preventDefault();
		let seaRes = [];
		contacts.map((contact) => {
			let username = contact.username.toLowerCase();
			username = username.includes(sea.toLocaleLowerCase());
			username && seaRes.push(contact);
		});
		setSeaResult(seaRes);
	};

	const handleMenuPanel = () => {
		console.log('menu panel');
	};

	return (
		<>
			<Container>
				<div className='search'>
					<button
						className='menu'
						onClick={handleMenuPanel}>
						<IoIosMenu />
					</button>
					<form
						className='input-container'
						onSubmit={(e) => handleSearch(e)}>
						<input
							type='text'
							placeholder='Search..'
							value={sea}
							onChange={(e) => setSea(e.target.value)}
						/>
						<button className='submit'>
							<IoIosSearch />
						</button>
					</form>
				</div>
			</Container>
		</>
	);
};

const Container = styled.div`
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

export default ContactSearch;
