import React, {useState, useEffect} from 'react';
import {WizardPanels, Slottable, Panel} from '@enact/sandstone/WizardPanels';
import Button from '@enact/sandstone/Button';
import Input from '@enact/sandstone/Input';
import {InputField} from '@enact/sandstone/Input';
import Checkbox from '@enact/sandstone/Checkbox';
import Popup from '@enact/sandstone/Popup';
import Scroller from '@enact/sandstone/Scroller';
import BodyText from '@enact/ui/BodyText';

import badWordsChecker from '../badWordsChecker';

const QuizCreationOverlay = ({onClose, timestamp, video_id}) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [question, setQuestion] = useState('');
	const [options, setOptions] = useState(['', '', '', '']); // Assuming 4 options
	const [questionType, setQuestionType] = useState('');
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [isOXSelected, setIsOXSelected] = useState(false);

	const [isQuestionValid, setIsQuestionValid] = useState(true);
	const [isOptionsValid, setIsOptionsValid] = useState([
		true,
		true,
		true,
		true
	]);

	const totalSteps = 4; // Total number of steps

	const nextStep = () => {
		if (currentStep === 1) {
			const isValid = !badWordsChecker(question);
			setIsQuestionValid(isValid);
			if (!isValid) return; // 비속어가 포함되어 있다면 다음 단계로 넘어가지 않음
		} else if (currentStep === 2) {
			const optionsValidity = options.map(option => !badWordsChecker(option));
			setIsOptionsValid(optionsValidity);
			if (!optionsValidity.every(Boolean)) return; // 어느 하나라도 비속어가 있다면 다음 단계로 넘어가지 않음
		}

		if (isOXSelected && currentStep === 1) {
			setCurrentStep(currentStep + 2); // 1단계에서 바로 3단계로 넘어가기
		} else {
			setCurrentStep(currentStep + 1);
		}
	};

	const prevStep = () => {
		if (isOXSelected && currentStep === 3) {
			setCurrentStep(1); // 3단계에서 바로 1단계로 이동
		} else if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const setQuestionTypeAndAdvance = type => {
		setQuestionType(type);
		if (type === 'O X 문제') {
			setIsOXSelected(true);
		} else {
			setIsOXSelected(false);
		}
		nextStep();
	};

	const handleSubmit = async () => {
		const quizData = {
			user_id: 1, // TODO
			video_id: 1, // TODO
			problem: options
				.map((option, index) => `${index + 1}. ${option}`)
				.join('\n'),
			quiz_time: timestamp.toString(),
			answer: selectedAnswer
		};

		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URI}/api/quiz`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(quizData)
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			// 여기서 추가 처리 가능 (예: 응답 데이터 처리, 상태 업데이트 등)
			console.log('Quiz submitted successfully');
			console.log(quizData);
		} catch (error) {
			console.error('Failed to submit quiz:', error);
		}
		setIsOXSelected(false); // 제출 후 상태 초기화
	};

	const handleAnswerSelect = index => {
		setSelectedAnswer(index);
		console.log('Selected answer index:', index); // 로그 출력으로 확인
	};

	const StepIndicator = ({currentStep, totalSteps, isOXSelected}) => {
		return (
			<div className="flex justify-center items-center mb-5">
				{[...Array(totalSteps).keys()].map((step, index) => (
					<React.Fragment key={step}>
						{/* Circle */}
						<div
							className={`w-10 h-10 rounded-full flex items-center justify-center text-sm
																	${
																		currentStep === step
																			? 'bg-bold text-white border-8 border-white'
																			: index === 2 && isOXSelected
																			? 'bg-gray-400 text-white'
																			: 'bg-bold text-white'
																	} mx-0`}
						>
							{step + 1}
						</div>

						{/* Dotted Line Connector */}
						{index < totalSteps - 1 && (
							<div className="border-b-8 border-dashed border-bold w-16"></div>
						)}
					</React.Fragment>
				))}
			</div>
		);
	};

	const renderStep = () => {
		switch (currentStep) {
			case 0:
				return (
					<>
						<BodyText className="bg-secondary px-1 py-3 text-2xl">
							문제의 종류를 선택하세요. {timestamp}
						</BodyText>
						<div className="flex flex-auto justify-center">
							{[
								'4개 중 맞는 문장 고르기',
								'O X 문제',
								'4개 중 맞는 숫자 고르기'
							].map(type => (
								<button
									key={type}
									onClick={() => setQuestionTypeAndAdvance(type)}
									skin="light"
									className="bg-white spottable rounded-md p-4 m-4 transition duration-300 ease-in-out 
									focus:bg-gray-100 focus:shadow-md focus:ring-4 focus:ring-bold focus:scale-105
									flex-grow"
								>
									{type}
								</button>
							))}
						</div>
					</>
				);
			case 1:
				return (
					<>
						<BodyText className="bg-primary rounded-md p-2">
							문제를 입력하세요.
						</BodyText>
						<div className="flex">
							<InputField
								placeholder="문제를 입력하세요. (최대 50자)"
								value={question}
								onChange={e => setQuestion(e.value)}
								invalid={!isQuestionValid}
								autoFocus={true}
								dismissOnEnter={true}
								invalidMessage="비속어가 포함된 문제는 출제할 수 없습니다."
								className="spottable flex-1 text-sm rounded-md h-8 shadow-xl m-2"
							/>
						</div>
					</>
				);
			case 2:
				return (
					<>
						<BodyText className="bg-primary rounded-md p-2">
							선택지를 입력하세요.
						</BodyText>
						<div className="flex">
							{options.map((option, index) => (
								<InputField
									key={index}
									tabIndex={index}
									value={option}
									className="spottable text-sm rounded-md h-8 shadow-inner m-2 w-32"
									placeholder={`선택지 ${index + 1}`}
									autoFocus={true}
									dismissOnEnter={true}
									invalid={!isOptionsValid[index]}
									invalidMessage="비속어 포함"
									type={
										questionType === '4개 중 맞는 숫자 고르기'
											? 'number'
											: 'text'
									}
									onChange={e =>
										setOptions(
											options.map((o, i) => (i === index ? e.value : o))
										)
									}
								/>
							))}
						</div>
					</>
				);
			case 3:
				return (
					<div>
						<BodyText className="bg-primary rounded-md p-2">
							정답을 선택하세요.
						</BodyText>
						<div
							className={`flex ${
								questionType !== 'O X 문제' ? 'flex-col' : ''
							} justify-center`}
						>
							{questionType === 'O X 문제'
								? ['O', 'X'].map((option, index) => (
										<button
											key={index}
											onClick={() => handleAnswerSelect(index)}
											className={`bg-white spottable rounded-md p-2 m-2 transition duration-300 ease-in-out 
                  focus:bg-gray-100 focus:shadow-md focus:ring-4 focus:ring-bold focus:scale-105
                  flex-grow ${selectedAnswer == index ? 'bg-primary' : ''}`}
										>
											{option}
										</button>
								  ))
								: options.map((option, index) => (
										<button
											key={index}
											onClick={() => handleAnswerSelect(index)}
											className={`bg-white spottable rounded-md p-2 m-2 transition duration-300 ease-in-out 
                  focus:bg-gray-100 focus:shadow-md focus:ring-4 focus:ring-bold focus:scale-105
                  flex-grow ${
										selectedAnswer === index ? 'bg-black font-black' : ''
									}`}
										>
											{option}
										</button>
								  ))}
						</div>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<Popup
			open={true}
			onClose={onClose}
			title="Create New Quiz Question"
			scrimType="transparent"
			className="backdrop-blur-md rounded-xl h-[80vh] w-[93vw]  bg-white"
		>
			<StepIndicator
				currentStep={currentStep}
				totalSteps={totalSteps}
				isOXSelected={isOXSelected}
			/>
			<div className="h-[60vh] px-8">{renderStep()}</div>
			<div className="flex justify-between">
				{currentStep > 0 && <Button onClick={prevStep}>이전</Button>}
				{0 < currentStep && currentStep < 3 && (
					<Button onClick={nextStep}>다음</Button>
				)}
				{currentStep === 3 && <Button onClick={handleSubmit}>제출</Button>}
			</div>
		</Popup>
	);
};

export default QuizCreationOverlay;
