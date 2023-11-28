import {useState, useEffect} from 'react';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Panels from '@enact/sandstone/Panels';
import Main from '../views/Main';
import {useBackHandler, useCloseHandler, useDocumentEvent} from './AppState';
import {isDevServe} from '../libs/utils';
import Skinnable from '@enact/sandstone/Skinnable';

import FullScreenLogin from '../views/FullScreenLogin';

/* istanbul ignore next*/
if (isDevServe()) {
	window.webOSSystem = {
		highContrast: 'off',
		close: () => {},
		platformBack: () => {},
		PmLogString: () => {},
		screenOrientation: 'landscape',
		setWindowOrientation: () => {}
	};
}

const App = props => {
	const [skinVariants, setSkinVariants] = useState({highContrast: false});
	const handleBack = useBackHandler();
	const handleClose = useCloseHandler();
	useDocumentEvent(setSkinVariants);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const [nickname, getNickname] = useState('');
	const [password, getPassword] = useState('');
	const [sex, getSex] = useState('');
	const [age, getAge] = useState('');
	const [imgSrc, getImgSrc] = useState('');

	const [inputValidity, setinputValidity] = useState('0');

	const handleLogin = async () => {
		const loginData = {
			nickname: nickname,
			password: password
		};
		try {
			const response = await fetch('http://localhost:4000/api/users/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(loginData)
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}


			const response_json = await response.json() ;
			if (Object.values(response_json)[0] != "fail") {
				console.log('login successfully');
				//console.log(loginData);
				//console.log(response_json);
				setIsLoggedIn(true);
			}
			else {
				console.log('Failed to login:', Object.values(response_json)[1]);
				//console.log(loginData);
				//console.log(response_json);
			}
		} catch (error) {
			console.error('Failed to login:', error);
		}
	};

	
	const handleRegister = async () => {
		setinputValidity(0)
		const registerData = {
			nickname: nickname,
			age: age,
			sex: sex,
			img_idx: imgSrc,
			password: password
		};
		try {
			if (false) {
				console.log('Failed to register: Only can use [ _ , + , - , @ , ^ , & , ~ , ! ]');
				console.log('Input nickname: ', nickname);
				setinputValidity(1);
			}
			else if (nickname.length < 2) {
				console.log('Failed to register: too short nickname (allow minimum 2)');
				console.log('nickname length: %d', nickname.length);
				setinputValidity(2);
			}
			else if (nickname.length > 10) {
				console.log('Failed to register: too long nickname (allow maximum 10)');
				console.log('nickname length: %d', nickname.length);
				setinputValidity(3);
			}
			/*
			else if (false) {
				console.log('Failed to register: Only can use [ _ , + , - , @ , ^ , & , ~ , ! ]');
				console.log('Input password: ', password);
				setinputValidity(4);
			}
			*/
			else if (password.length < 4) {
				console.log('Failed to register: too short password (allow minimum 4)');
				console.log('password length: %d', password.length);
				setinputValidity(5);
			}
			else if (password.length > 10) {
				console.log('Failed to register: too long password (allow maximum 10)');
				console.log('password length: %d', password.length);
				setinputValidity(6);
			}
			else if (sex == "") {
				console.log('Failed to register: choose your sex');
				setinputValidity(7);
			}
			else if (age == "") {
				console.log('Failed to register: choose your age');
				setinputValidity(8);
			}
			else if (imgSrc == "") {
				console.log('Failed to register: choose your image');
				setinputValidity(9);
			}
			else { //valid 한 입력
				const response = await fetch('http://localhost:4000/api/users/join', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(registerData)
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const response_json = await response.json() ;
				if (Object.values(response_json)[0] != "fail") {
					console.log('register successfully');
					//console.log(registerData);
					//console.log(response_json);
					
					handleLogin();
				}
				else {
					console.log('Failed to register:', Object.values(response_json)[1]);
					//console.log(registerData);
					//console.log(response_json);
				}
			}
		} catch (error) {
			console.error('Failed to register:', error);
		}
	};


	return (
		<div>
			{!isLoggedIn && (
				<FullScreenLogin onLogin={handleLogin} onRegister={handleRegister} 
								inputNickname={nickname} setInputNickname={getNickname} 
								inputPassword={password} setInputPassword={getPassword}
								inputAge={age} setInputAge={getAge} inputSex={sex} setInputSex={getSex}
								inputImgSrc={imgSrc} setInputImgSrc={getImgSrc} />
			)}
			{!isLoggedIn && inputValidity == '1' && (
				<div className="flex">
					닉네임 특수문자
				</div>
			)}
			{!isLoggedIn && inputValidity == '2' && (
				<div className="flex">
					닉네임 너무 짧음
				</div>
			)}
			{!isLoggedIn && inputValidity == '3' && (
				<div className="flex">
					닉네임 너무 긺
				</div>
			)}
			{!isLoggedIn && inputValidity == '4' && (
				<div className="flex">
					비밀번호 특수문자
				</div>
			)}
			{!isLoggedIn && inputValidity == '5' && (
				<div className="flex">
					비밀번호 너무 짧음
				</div>
			)}
			{!isLoggedIn && inputValidity == '6' && (
				<div className="flex">
					비밀번호 너무 긺
				</div>
			)}
			{!isLoggedIn && inputValidity == '7' && (
				<div className="flex">
					성별고르라고
				</div>
			)}
			{!isLoggedIn && inputValidity == '8' && (
				<div className="flex">
					나이고르라고
				</div>
			)}
			{!isLoggedIn && inputValidity == '9' && (
				<div className="flex">
					이미지고르라고
				</div>
			)}
			{isLoggedIn && (
				<Panels
					{...props}
					skinVariants={skinVariants}
					onBack={handleBack}
					onClose={handleClose}
					// className="bg-white text-black"
					skin="light"
				>
					<Main skin="light" user_id={2}/>
				</Panels>
			)}
		</div>
	);
};

export default ThemeDecorator(App);
