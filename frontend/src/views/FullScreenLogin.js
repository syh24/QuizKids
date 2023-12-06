// FullScreenLogin.js
import React, {useState, useEffect} from 'react';
import {InputField} from '@enact/sandstone/Input';
import Button from '@enact/sandstone/Button';

import ProfileSelection from './ProfileSection';
import BodyText from '@enact/ui/BodyText';

import LogoMotion from './logo_motion.gif';
import SciencePark from './science_park.jpg';

const imagePaths = [
	'https://ssl.pstatic.net/mimgnews/image/112/2021/07/08/202107081008046563160_20210708100917_01_20210708101006245.jpg?type=w540',
	'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTscDSszyGFxlaLRB8Aj1A3gfUKy0hCRhCH4g&usqp=CAU',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOByQi_wqBIRiSI8ta4O05kp-awGDIlYVhHQ&usqp=CAU',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUbasz5gJ16BJX0At8_H5IaBTn9H6OVEi_KA&usqp=CAU'
];

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
	const [showProfileSelection, setShowProfileSelection] = useState(false);

	const toggleRegisterForm = () => {
		setShowRegisterForm(!showRegisterForm);
	};

	const ageTypes = [
		'5살보다 어려요.',
		'5살에서 7살 사이에요.',
		'초등학교 저학년이에요.',
		'초등학교 고학년이에요.',
		'중학생이에요.',
		'고등학생이에요.',
		'성인이에요.'
	];

	const handleUserSex = sex => {
		setInputSex(sex);
	};

	const handleUserAge = ageIndex => {
		console.log('user age set to: ', ageIndex);
		setInputAge(ageIndex);
	};

	// const handleUserAge = index => {
	// 	setInputAge(index);
	// };

	const toggleProfileSelection = () => {
		setShowProfileSelection(!showProfileSelection);
	};

	const CustomButton = ({onClick, children, selected}) => {
		return (
			<button
				onClick={onClick}
				className={`m-2 px-4 py-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 rounded-lg focus:outline-none
                        ${
													selected
														? 'bg-bold hover:bg-bold'
														: 'bg-gray-600 hover:bg-gray-700'
												}`}
			>
				{children}
			</button>
		);
	};

	return (
		<div className="w-screen h-screen flex text-black">
			{/* 왼쪽 섹션 - 회원가입 및 안내 */}
			<div className="w-1/3 flex flex-col justify-center items-center bg-secondary z-50">
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
			<div className="w-2/3 h-screen relative">
				{/* 배경 이미지용 div */}
				<div
					className="absolute inset-0 bg-cover bg-center blur-md"
					style={{
						backgroundImage: `url(${SciencePark})`
					}}
				></div>

				{/* 내용물을 담는 div */}
				<div className="relative flex justify-center items-center h-full">
					<div className="shadow-2xl rounded-lg p-8 pr-10 bg-white bg-opacity-75 backdrop-filter backdrop-blur-xl max-w-3xl">
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
								<div className="flex">
									{/* 왼쪽 영역: 아이디, 비밀번호, 프로필 이미지 선택 */}
									<div className="w-1/2 pr-4">
										{/* 프로필 이미지 선택 */}
										<h3 className="text-lg font-semibold mb-2">
											프로필 이미지
										</h3>
										<div className="flex items-center mb-4">
											{showProfileSelection && (
												<ProfileSelection
													onClose={toggleProfileSelection}
													setIdx={setInputImgSrc}
												/>
											)}
											{inputImgSrc !== '' ? (
												<img
													src={imagePaths[inputImgSrc]}
													alt="프로필 이미지"
													className="ml-4 w-32 h-32 rounded-full mr-4 shadow-xl"
												/>
											) : (
												<div className="ml-4 w-32 h-32 rounded-full bg-gray-300 mr-4 shadow-xl"></div>
											)}
											<CustomButton onClick={toggleProfileSelection}>
												프로필 이미지 선택
											</CustomButton>
										</div>

										{/* 아이디 입력 */}
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

										{/* 비밀번호 입력 */}
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
									</div>

									{/* 오른쪽 영역: 성별, 나이 선택 */}
									<div className="w-1/2 pl-4">
										{/* 성별 선택 */}
										<h3 className="text-lg font-semibold mb-2">성별</h3>
										<div className="flex justify-center mb-4">
											<CustomButton
												onClick={() => handleUserSex('M')}
												selected={inputSex === 'M'}
											>
												남성
											</CustomButton>
											<CustomButton
												onClick={() => handleUserSex('F')}
												selected={inputSex === 'F'}
											>
												여성
											</CustomButton>
										</div>

										{/* 나이 선택 */}
										<h3 className="text-lg font-semibold mb-2">나이</h3>
										<div className="flex justify-center flex-wrap mb-4">
											{ageTypes.map((age, index) => (
												<CustomButton
													key={index}
													onClick={() => handleUserAge(index)} // index가 0일 때도 정확히 전달됩니다
													selected={inputAge === index}
												>
													{age}
												</CustomButton>
											))}
										</div>
									</div>
								</div>

								{/* 회원가입 버튼 */}
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
