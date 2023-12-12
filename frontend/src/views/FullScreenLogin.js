// FullScreenLogin.js
import React, {useState, useEffect} from 'react';
import {InputField} from '@enact/sandstone/Input';
import Button from '@enact/sandstone/Button';

import ProfileSelection from './ProfileSection';
import BodyText from '@enact/ui/BodyText';

import LogoMotion from './logo_motion.gif';
import {imagePaths} from './Main';

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
				className={`spottable m-2 px-4 py-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 rounded-lg focus:outline-none
				transition duration-300 ease-in-out	focus:bg-primary focus:shadow-xl focus:text-black  focus:scale-110
                        ${
													selected
														? 'bg-bold hover:bg-bold'
														: 'bg-gray-500 hover:bg-gray-700'
												}`}
			>
				{children}
			</button>
		);
	};

	// return (
	// 	<button
	// 		onClick={onClick}
	// 		className={`spottable m-2 px-4 py-2 text-sm font-medium leading-5 text-center text-black transition-colors rounded-lg focus:outline-none
	// 		transition duration-300 ease-in-out
	// 							focus:bg-primary focus:shadow-xl  focus:scale-110
	// 										${selected ? 'bg-bold hover:bg-bold' : 'bg-gray-400 hover:bg-gray-700'}`}
	// 	>
	// 		{children}
	// 	</button>
	// );

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
				{/* <div
					className="absolute inset-0 bg-cover bg-center blur-md"
					style={{
						backgroundImage: `url(${SciencePark})`
					}}
				></div> */}

				<div id="bg-wrap" className="z-0 absolute inset-0 overflow-y-hidden">
					<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
						<defs>
							<radialGradient
								id="Gradient1"
								cx="50%"
								cy="50%"
								fx="0.441602%"
								fy="50%"
								r=".5"
							>
								<animate
									attributeName="fx"
									dur="34s"
									values="0%;3%;0%"
									repeatCount="indefinite"
								></animate>
								<stop offset="0%" stopColor="rgba(255, 150, 255, 1)"></stop>
								<stop offset="100%" stopColor="rgba(255, 150, 255, 0)"></stop>
							</radialGradient>
							<radialGradient
								id="Gradient2"
								cx="50%"
								cy="50%"
								fx="2.68147%"
								fy="50%"
								r=".5"
							>
								<animate
									attributeName="fx"
									dur="23.5s"
									values="0%;3%;0%"
									repeatCount="indefinite"
								></animate>
								<stop offset="0%" stopColor="rgba(255, 255, 0, 1)"></stop>
								<stop offset="100%" stopColor="rgba(255, 255, 0, 0)"></stop>
							</radialGradient>
							<radialGradient
								id="Gradient3"
								cx="50%"
								cy="50%"
								fx="0.836536%"
								fy="50%"
								r=".5"
							>
								<animate
									attributeName="fx"
									dur="21.5s"
									values="0%;3%;0%"
									repeatCount="indefinite"
								></animate>
								<stop offset="0%" stopColor="rgba(150, 255, 255, 1)"></stop>
								<stop offset="100%" stopColor="rgba(150, 255, 255, 0)"></stop>
							</radialGradient>
							<radialGradient
								id="Gradient4"
								cx="50%"
								cy="50%"
								fx="4.56417%"
								fy="50%"
								r=".5"
							>
								<animate
									attributeName="fx"
									dur="23s"
									values="0%;5%;0%"
									repeatCount="indefinite"
								></animate>
								<stop offset="0%" stopColor="rgba(150, 255, 0, 1)"></stop>
								<stop offset="100%" stopColor="rgba(150, 255, 0, 0)"></stop>
							</radialGradient>
							<radialGradient
								id="Gradient5"
								cx="50%"
								cy="50%"
								fx="2.65405%"
								fy="50%"
								r=".5"
							>
								<animate
									attributeName="fx"
									dur="24.5s"
									values="0%;5%;0%"
									repeatCount="indefinite"
								></animate>
								<stop offset="0%" stopColor="rgba(150,150,255, 1)"></stop>
								<stop offset="100%" stopColor="rgba(150,150,255, 0)"></stop>
							</radialGradient>
							<radialGradient
								id="Gradient6"
								cx="50%"
								cy="50%"
								fx="0.981338%"
								fy="50%"
								r=".5"
							>
								<animate
									attributeName="fx"
									dur="25.5s"
									values="0%;5%;0%"
									repeatCount="indefinite"
								></animate>
								<stop offset="0%" stopColor="rgba(255,0,0, 1)"></stop>
								<stop offset="100%" stopColor="rgba(255,0,0, 0)"></stop>
							</radialGradient>
						</defs>

						<rect
							x="13.744%"
							y="1.18473%"
							width="100%"
							height="100%"
							fill="url(#Gradient1)"
							transform="rotate(334.41 50 50)"
						>
							<animate
								attributeName="x"
								dur="20s"
								values="25%;0%;25%"
								repeatCount="indefinite"
							></animate>
							<animate
								attributeName="y"
								dur="21s"
								values="0%;25%;0%"
								repeatCount="indefinite"
							></animate>
							<animateTransform
								attributeName="transform"
								type="rotate"
								from="0 50 50"
								to="360 50 50"
								dur="7s"
								repeatCount="indefinite"
							></animateTransform>
						</rect>
						<rect
							x="-2.17916%"
							y="35.4267%"
							width="100%"
							height="100%"
							fill="url(#Gradient2)"
							transform="rotate(255.072 50 50)"
						>
							<animate
								attributeName="x"
								dur="23s"
								values="-25%;0%;-25%"
								repeatCount="indefinite"
							></animate>
							<animate
								attributeName="y"
								dur="24s"
								values="0%;50%;0%"
								repeatCount="indefinite"
							></animate>
							<animateTransform
								attributeName="transform"
								type="rotate"
								from="0 50 50"
								to="360 50 50"
								dur="12s"
								repeatCount="indefinite"
							></animateTransform>
						</rect>
						<rect
							x="9.00483%"
							y="14.5733%"
							width="100%"
							height="100%"
							fill="url(#Gradient3)"
							transform="rotate(139.903 50 50)"
						>
							<animate
								attributeName="x"
								dur="25s"
								values="0%;25%;0%"
								repeatCount="indefinite"
							></animate>
							<animate
								attributeName="y"
								dur="12s"
								values="0%;25%;0%"
								repeatCount="indefinite"
							></animate>
							<animateTransform
								attributeName="transform"
								type="rotate"
								from="360 50 50"
								to="0 50 50"
								dur="9s"
								repeatCount="indefinite"
							></animateTransform>
						</rect>
					</svg>
				</div>

				{/* 내용물을 담는 div */}
				<div className="relative flex justify-center items-center h-full z-50">
					<div className="shadow-2xl rounded-lg p-8 pr-10 bg-white bg-opacity-75 backdrop-filter backdrop-blur-xl max-w-3xl z-50">
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
													spotlightDisabled={showProfileSelection}
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
