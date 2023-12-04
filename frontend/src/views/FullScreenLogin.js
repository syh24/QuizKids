// FullScreenLogin.js
import React, {useState, useEffect} from 'react';
import {InputField} from '@enact/sandstone/Input';
import Button from '@enact/sandstone/Button';

import LogoMotion from './logo_motion.gif';
import SciencePark from './science_park.jpg';

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
	setInputImgSrc,
	inputValidity
}) => {
	const [showRegisterForm, setShowRegisterForm] = useState(false);
	const [invalidMessage, setInvalidMessage] = useState('');

	const toggleRegisterForm = () => {
		setShowRegisterForm(!showRegisterForm);
	};

	return (
		<div className="w-screen h-screen flex text-black">
			{/* 왼쪽 섹션 - 회원가입 및 안내 */}
			<div className="w-1/2 flex flex-col justify-center items-center bg-secondary z-50">
				<div className="text-center p-8">
					<img src={LogoMotion} alt="QuizKids" className="w-96" />
					{/* <h2 className="text-3xl font-bold mb-4">QuizKids</h2> */}

					{!showRegisterForm ? (
						<>
							<p className="mb-6">새로운 경험을 시작하세요!</p>
							<button
								onClick={toggleRegisterForm}
								className="spottable bg-bold shadow-lg text-white font-bold py-2 px-4 rounded focus:brightness-90 focus:shadow-2xl"
							>
								회원가입하기
							</button>
						</>
					) : (
						<>
							<p className="mb-6">이미 계정이 있다면...</p>
							<button
								onClick={toggleRegisterForm}
								className="spottable bg-bold shadow-lg text-white font-bold py-2 px-4 rounded focus:brightness-90 focus:shadow-2xl"
							>
								로그인하기
							</button>
						</>
					)}
				</div>
			</div>
			{/* 오른쪽 섹션 - 로그인 또는 회원가입 폼 */}
			<div className="w-1/2 h-screen relative">
				{/* 배경 이미지용 div */}
				<div
					className="absolute inset-0 bg-cover bg-center blur-md"
					style={{
						backgroundImage: `url(${SciencePark})`
					}}
				></div>

				{/* 내용물을 담는 div */}
				<div className="relative flex justify-center items-center h-full">
					<div className="shadow-2xl rounded-lg p-8 pr-10 bg-white bg-opacity-75 backdrop-filter backdrop-blur-xl">
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
										skin="light"
									/>
								</div>
								<div className="mb-4">
									<InputField
										placeholder="비밀번호를 입력하세요"
										type="password"
										value={inputPassword}
										onChange={e => setInputPassword(e.value)}
										autoFocus={true}
										className="w-full p-2 border border-gray-300 rounded"
										skin="light"
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
								<h2 className="text-center text-2xl font-bold mb-4">
									회원가입
								</h2>
								{/* ... 회원가입 입력 필드 ... */}
								<div className="mb-4">
									<InputField
										placeholder="아이디를 입력하세요"
										value={inputNickname}
										onChange={e => setInputNickname(e.value)}
										autoFocus={true}
										dismissOnEnter={true}
										className="w-full p-2 border border-gray-300 rounded"
										skin="light"
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
										skin="light"
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
										skin="light"
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
										skin="light"
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
										skin="light"
									/>
								</div>

								<div className="flex justify-center bg-white">
									<span className="text-red-500">{invalidMessage}</span>
								</div>

								<Button
									onClick={onRegister}
									className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
								>
									회원가입하기
								</Button>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FullScreenLogin;
