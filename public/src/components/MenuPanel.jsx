/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { styled } from 'styled-components';
import { allUsersRoute } from '../utils/APIRoutes';

const MenuPanel = ({ menuPanel }) => {
	const [closeState, setCloseState] = useState('visible');
	const [currentUser, setCurrentUser] = useState(undefined);
	const [isLoaded, setIsLoaded] = useState(false);

	const handleClose = () => {
		setCloseState('hidden');
	};

	useEffect(() => {
		const useeffect = async () => {
            setCurrentUser(JSON.parse(localStorage.getItem('chat-app-user')));
			console.log(currentUser);
		};
		useeffect();
	}, []);

	return (
		<>
			{isLoaded && (
				<Container className={`${closeState}`}>
					<div className='menu-panel'>
						<button
							className='close'
							onClick={handleClose}>
							<IoIosClose />
						</button>
						<h3 className='title'>Edit Profile</h3>

						<form>
							<img
								src={currentUser.avatarImage}
								alt=''
							/>
							<input
								type='text'
								name='username'
								value={currentUser.username}
								placeholder='Username'
							/>
							<input
								type='email'
								name='email'
								value={currentUser.email}
								placeholder='Email'
							/>
							<button type='submit'>Save</button>
						</form>
					</div>
				</Container>
			)}
		</>
	);
};

const Container = styled.div`
    position: absolute;
    background: #000000cc;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index:1;
    width: 100%;
    height: 100%;
    padding: 20px;
    &.visible {
        display: flex;
    }
    &.hidden {
        display: none;
    }
    .menu-panel {
        background-color: #fff;
        border-radius: 1rem;
        padding: 10px 0 40px 0px;
        width: 500px;
        height: fit-content;
        .close {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 5px 10px 0px;
            font-size: 30px;
            background-color: transparent;
            color: #fff;
            border: none;
            &:hover {
                cursor: pointer;
            }
            &:focus {
                outline: none;
            }
        }
        .title {
            padding: 5px 20px;
        }

        form {
            text-align: center;
            padding: 0 30px;
            img {
                max-width: 150px;
            }
            input {
                background-color: #fff;
                padding: .9rem;
                border: .1rem solid #696969;
                border-radius: .5rem;
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
        }
    }
`;

export default MenuPanel;
