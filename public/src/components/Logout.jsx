/** @format */

import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = ({ currentUser }) => {
	const navigate = useNavigate();
	const handleClick = () => {
		localStorage.clear();
		navigate('/login');
	};
	return (
		<>
			<Button onClick={handleClick}>✖</Button>
		</>
	);
};

const Button = styled.button`
    background-color: #997af000;
    color: #757575;
    padding: 0.3rem 0.8rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.5rem;
    transition: 0.5s ease-in-out;
    font-size: 1.5rem;

	&:focus {
		outline: none;
	}
`;

export default Logout;
