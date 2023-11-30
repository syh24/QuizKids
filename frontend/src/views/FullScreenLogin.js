// FullScreenLogin.js
import React, {useState, useEffect} from 'react';
import {InputField} from '@enact/sandstone/Input';
import Button from '@enact/sandstone/Button';

import LogoMotion from './logo_motion.gif';

const FullScreenLogin = ({
	onLogin,
	onRegister,
	inputNickname,
	setInputNickname,
	inputPassword,
	setInputPassword,
	inputSex,
	setInputSex,
	inputAge,
	setInputAge,
	inputImgSrc,
	setInputImgSrc
}) => {
	const [showRegisterForm, setShowRegisterForm] = useState(false);
	const toggleRegisterForm = () => {
		setShowRegisterForm(!showRegisterForm);
	};

	return (
		<div className="w-screen h-screen flex text-black">
			{/* 왼쪽 섹션 - 회원가입 및 안내 */}
			<div className="w-1/2 flex flex-col justify-center items-center bg-secondary">
				<div className="text-center p-8">
					<img src={LogoMotion} alt="QuizKids" className="w-96" />
					{/* <h2 className="text-3xl font-bold mb-4">QuizKids</h2> */}
					<p className="mb-6">새로운 경험을 시작하세요!</p>
					{!showRegisterForm ? (
						<button
							onClick={toggleRegisterForm}
							className="spottable bg-bold shadow-lg text-white font-bold py-2 px-4 rounded focus:brightness-90 focus:shadow-2xl"
						>
							회원가입하기
						</button>
					) : (
						<button
							onClick={toggleRegisterForm}
							className="spottable bg-bold shadow-lg text-white font-bold py-2 px-4 rounded focus:brightness-90 focus:shadow-2xl"
						>
							로그인하기
						</button>
					)}
				</div>
			</div>
			{/* 오른쪽 섹션 - 로그인 또는 회원가입 폼 */}
			<div className="w-1/2 flex justify-center items-center bg-white">
				<div className="shadow-2xl rounded-lg p-8 pr-10">
					{!showRegisterForm ? (
						// 로그인 폼
						<>
							<h2 className="text-center text-2xl font-bold mb-4 text-black">
								로그인
							</h2>
							{/* ... 로그인 입력 필드 ... */}
							<div className="mb-4">
								<InputField
									placeholder="아이디를 입력하세요"
									value={inputNickname}
									onChange={e => setInputNickname(e.value)}
									autoFocus={true}
									dismissOnEnter={true}
									className="w-full p-2 border border-gray-300 rounded"
								/>
							</div>
							<div className="mb-4">
								<InputField
									placeholder="비밀번호를 입력하세요"
									type="password"
									value={inputPassword}
									onChange={e => setInputPassword(e.value)}
									autoFocus={true}
									dismissOnEnter={true}
									className="w-full p-2 border border-gray-300 rounded"
								/>
							</div>
							<Button
								onClick={onLogin}
								className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
							>
								로그인
							</Button>
						</>
					) : (
						// 회원가입 폼
						<>
							<h2 className="text-center text-2xl font-bold mb-4">회원가입</h2>
							{/* ... 회원가입 입력 필드 ... */}
							<div className="mb-4">
								<InputField
									placeholder="아이디를 입력하세요"
									value={inputNickname}
									onChange={e => setInputNickname(e.value)}
									autoFocus={true}
									dismissOnEnter={true}
									className="w-full p-2 border border-gray-300 rounded"
								/>
							</div>
							<div className="mb-4">
								<InputField
									placeholder="비밀번호를 입력하세요"
									type="password"
									value={inputPassword}
									onChange={e => setInputPassword(e.value)}
									autoFocus={true}
									dismissOnEnter={true}
									className="w-full p-2 border border-gray-300 rounded"
								/>
							</div>
							<div className="mb-4">
								<InputField
									placeholder="성별을 입력하세요 (남/녀)"
									value={inputSex}
									onChange={e => setInputSex(e.value)}
									autoFocus={true}
									dismissOnEnter={true}
									className="w-full p-2 border border-gray-300 rounded"
								/>
							</div>
							<div className="mb-4">
								<InputField
									placeholder="나이를 입력하세요"
									type="number"
									value={inputAge}
									onChange={e => setInputAge(e.value)}
									autoFocus={true}
									dismissOnEnter={true}
									className="w-full p-2 border border-gray-300 rounded"
								/>
							</div>
							<div className="mb-6">
								<InputField
									placeholder="이미지 인덱스를 입력하세요"
									type="number"
									value={inputImgSrc}
									onChange={e => setInputImgSrc(e.value)}
									autoFocus={true}
									dismissOnEnter={true}
									className="w-full p-2 border border-gray-300 rounded"
								/>
							</div>
							<Button
								onClick={onRegister}
								className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
							>
								가입하기
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default FullScreenLogin;
