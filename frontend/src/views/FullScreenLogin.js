// FullScreenLogin.js
import React from 'react';

const FullScreenLogin = ({onLogin, onRegister}) => {
	return (
		<div className="w-screen h-screen flex justify-center items-center text-black">
			{/* 로그인 및 회원가입 폼 구현 */}
			<div className=" bg-gray-200 bg-opacity-75 backdrop-filter backdrop-blur-sm">
				QuizKids가 처음이라면?
				<button
					onClick={onRegister}
					className="bg-bold p-1 m-2 rounded-lg text-black"
				>
					회원가입
				</button>
				QuizKids 계정이 있다면?
				<button
					onClick={onLogin}
					className="bg-bold p-1 m-2 rounded-lg text-black"
				>
					로그인하기
				</button>
			</div>
		</div>
	);
};

export default FullScreenLogin;
