/** @format */

import React from 'react';
import styled from 'styled-components';
import { BsFillChatLeftQuoteFill } from 'react-icons/bs';

const Welcome = ({ currentUser, gobackButton }) => {
	return (
		<>
			<Container>
				<BsFillChatLeftQuoteFill />
				<h1>
					Welcome,
					<span>
						{currentUser.username}

						<em>!</em>
					</span>
				</h1>
				<h2>Please select a chat to Start Messaging.</h2>
				{gobackButton}
			</Container>
		</>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	color: #ffff;
    background: #000000d9;

	svg {
		font-size: 8vw;
	}

	span {
		color: dodgerblue;
	}
`;

export default Welcome;
