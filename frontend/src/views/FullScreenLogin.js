// FullScreenLogin.js
import React, {useState, useEffect} from 'react';
import {InputField} from '@enact/sandstone/Input';
import Button from '@enact/sandstone/Button';


const FullScreenLogin = ({onLogin, onRegister, inputNickname, setInputNickname, 
						inputPassword, setInputPassword, inputSex, setInputSex,
						inputAge, setInputAge, inputImgSrc, setInputImgSrc}) => {
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
				<div className="flex">
					<InputField
						tabIndex={0}
						placeholder="아이디를 입력하세요"
						value={inputNickname}
						onChange={e => setInputNickname(e.value)}
						className="spottable flex-1 text-sm rounded-md h-8 shadow-inner m-2"
					/>
					<InputField
						tabIndex={0}
						placeholder="비밀번호를 입력하세요"
						value={inputPassword}
						onChange={e => setInputPassword(e.value)}
						className="spottable flex-1 text-sm rounded-md h-9 shadow-inner m-2"
					/>
				</div>
				<div className="flex">
					<InputField
						tabIndex={0}
						placeholder="남/녀(임시)"
						value={inputSex}
						onChange={e => setInputSex(e.value)}
						className="spottable flex-1 text-sm rounded-md h-8 shadow-inner m-2"
					/>
					<InputField
						tabIndex={0}
						placeholder="나이(임시) <<숫자만 입력>>"
						value={inputAge}
						onChange={e => setInputAge(e.value)}
						className="spottable flex-1 text-sm rounded-md h-8 shadow-inner m-2"
					/>
					<InputField
						tabIndex={0}
						placeholder="imgSrc or imgIdx(임시) <<숫자만 입력>>"
						value={inputImgSrc}
						onChange={e => setInputImgSrc(e.value)}
						className="spottable flex-1 text-sm rounded-md h-8 shadow-inner m-2"
					/>
				</div>
			</div>
		</div>
	);
};

export default FullScreenLogin;
