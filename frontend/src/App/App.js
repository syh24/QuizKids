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

	const [userId, get_userId] = useState('');
	const [nickname, getNickname] = useState('');
	const [password, getPassword] = useState('');
	const [sex, getSex] = useState('');
	const [age, getAge] = useState('');
	const [imgSrc, getImgSrc] = useState('');

	const [validityMsg, setValidityMsg] = useState(null);

	const handleLogin = async () => {
		const loginData = {
			nickname: nickname,
			password: password
		};
		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URI}/api/users/login`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(loginData)
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const response_json = await response.json();
			if (Object.values(response_json)[0] != 'fail') {
				console.log('login successfully');
				//console.log(loginData);
				//console.log(response_json);

				//console.log(Object.values(response_json)[2]);
				get_userId(Object.values(response_json)[2]);

				console.log('user_id: ', userId);
			} else {
				console.log('Failed to login:', Object.values(response_json)[1]);
				//console.log(loginData);
				//console.log(response_json);
			}
		} catch (error) {
			console.error('Failed to login:', error);
		}
	};

	const handleRegister = async () => {
		setValidityMsg(null);
		const registerData = {
			nickname: nickname,
			age: age,
			sex: sex,
			img_idx: imgSrc,
			password: password
		};
		try {
			if (
				nickname.indexOf('/') != -1 ||
				nickname.indexOf('&') == -1 ||
				nickname.indexOf('*') != -1
			) {
				console.log("Failed to register: Can't use [ / , & , * ]");
				console.log('Input nickname: ', nickname);
				setValidityMsg('[ / , & , * ]는 사용할 수 없습니다.');
			} else if (nickname.length < 2) {
				console.log('Failed to register: too short nickname (allow minimum 2)');
				console.log('nickname length: %d', nickname.length);
				setValidityMsg('닉네임이 너무 짧습니다');
			} else if (nickname.length > 10) {
				console.log('Failed to register: too long nickname (allow maximum 10)');
				console.log('nickname length: %d', nickname.length);
				setValidityMsg('비밀번호가 너무 깁니다');
			} else if (
				password.indexOf('/') != -1 ||
				password.indexOf('&') == -1 ||
				password.indexOf('*') != -1
			) {
				console.log("Failed to register: Can't use [ / , & , * ]");
				setValidityMsg('[ / , & , * ]는 사용할 수 없습니다.');
			} else if (password.length < 4) {
				console.log('Failed to register: too short password (allow minimum 4)');
				console.log('password length: %d', password.length);
				setValidityMsg('비밀번호가 너무 짧습니다');
			} else if (password.length > 10) {
				console.log('Failed to register: too long password (allow maximum 10)');
				console.log('password length: %d', password.length);
				setValidityMsg('비밀번호가 너무 깁니다');
			} else if (sex == '') {
				console.log('Failed to register: choose your sex');
				setValidityMsg('성별을 선택해주세요');
			} else if (age == '') {
				console.log('Failed to register: choose your age');
				setValidityMsg('나이를 선택해주세요');
			} else if (imgSrc == '') {
				console.log('Failed to register: choose your image');
				setValidityMsg('프로필 이미지를 선택해주세요');
			} else {
				//valid 한 입력
				const response = await fetch(
					`${process.env.REACT_APP_BACKEND_URI}/api/users/join`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(registerData)
					}
				);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const response_json = await response.json();
				if (Object.values(response_json)[0] != 'fail') {
					console.log('register successfully');
					//console.log(registerData);
					//console.log(response_json);

					//console.log(Object.values(response_json)[2]);
					get_userId(Object.values(response_json)[2]);
					handleLogin();
				} else {
					console.log('Failed to register:', Object.values(response_json)[1]);
					setValidityMsg(Object.values(response_json)[1]);
					//console.log(registerData);
					//console.log(response_json);
				}
			}
		} catch (error) {
			console.error('Failed to register:', error);
		}
	};

	useEffect(() => {
		if (userId) {
			// userId가 설정된 후 실행할 로직
			console.log('로그인 후 userId:', userId);
			setIsLoggedIn(true);
		}
	}, [userId]); // userId가 변경될 때마다 실행

	return (
		<div>
			{!isLoggedIn && (
				<FullScreenLogin
					onLogin={handleLogin}
					onRegister={handleRegister}
					inputNickname={nickname}
					setInputNickname={getNickname}
					inputPassword={password}
					setInputPassword={getPassword}
					inputAge={age}
					setInputAge={getAge}
					inputSex={sex}
					setInputSex={getSex}
					inputImgSrc={imgSrc}
					setInputImgSrc={getImgSrc}
				/>
			)}
			{!isLoggedIn && validityMsg && (
				<div className="flex absolute top-0 right-52 text-red-500 p-4 px-6 rounded-full shadow-xl">
					{validityMsg}
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
					<Main skin="light" user_id={userId} />
				</Panels>
			)}
		</div>
	);
};

export default ThemeDecorator(App);
