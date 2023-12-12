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

const QuizCreationOverlay = ({onClose, timestamp, video_id, user_id}) => {
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

	const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

	const handleSubmissionConfirmation = () => {
		handleSubmit(); // Proceed with the actual submission
		setShowConfirmationPopup(false); // Close the confirmation popup
		onClose();
	};

	const handleSubmissionCancel = () => {
		setShowConfirmationPopup(false); // Close the confirmation popup
	};

	const handleSubmitWithConfirmation = () => {
		setShowConfirmationPopup(true); // Show the confirmation popup
	};

	const nextStep = () => {
		// Check for empty question or bad words
		if (currentStep === 1) {
			const isValid = question.trim() !== '' && !badWordsChecker(question);
			setIsQuestionValid(isValid);
			if (!isValid) return; // Prevents proceeding if the question is empty or contains bad words
		}

		// Check for empty options or bad words
		if (currentStep === 2) {
			const optionsValidity = options.map(
				option => option.trim() !== '' && !badWordsChecker(option)
			);
			setIsOptionsValid(optionsValidity);
			if (!optionsValidity.every(Boolean)) return; // Prevents proceeding if any option is empty or contains bad words
		}

		// Check if an answer is selected (only for non-OX questions)
		if (currentStep === 3 && !isOXSelected && selectedAnswer === null) {
			// Add logic to show an error message or indication
			return; // Prevents proceeding without selecting an answer
		}

		// Logic for OX questions to skip options step
		if (isOXSelected && currentStep === 1) {
			setCurrentStep(currentStep + 2); // Skips directly to answer selection for OX questions
		} else {
			setCurrentStep(currentStep + 1); // Proceed to the next step
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
			user_id: user_id, // TODO
			video_id: video_id, // TODO
			problem:
				question +
				'\n' +
				options.map((option, index) => `${option}`).join('\n'),
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

	const imgTypeSrc = [
		'https://github.com/kevink1113/static_CSE4103/blob/main/img/button/four_char.png?raw=true',
		'https://github.com/kevink1113/static_CSE4103/blob/main/img/button/ox.png?raw=true',
		'https://github.com/kevink1113/static_CSE4103/blob/main/img/button/four_num.png?raw=true'
	];
	const renderStep = () => {
		switch (currentStep) {
			case 0:
				return (
					<>
						<BodyText className="bg-secondary px-1 py-3 text-2xl">
							문제의 종류를 선택하세요.
						</BodyText>
						<div className="flex flex-auto justify-center">
							{[
								'4개 중 맞는 문장 고르기',
								'O X 문제',
								'4개 중 맞는 숫자 고르기'
							].map((type, index) => (
								<button
									key={type}
									onClick={() => setQuestionTypeAndAdvance(type)}
									skin="light"
									className="bg-white spottable rounded-md p-4 m-4 transition duration-300 ease-in-out 
									focus:bg-gray-100 focus:shadow-md focus:ring-4 focus:ring-bold focus:scale-105
									flex-grow"
								>
									<img
										src={imgTypeSrc[index]}
										className="w-48 h-48 mx-auto mb-2 object-contain"
										alt="quiz"
									/>
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
								invalidMessage="부적합한 문제 (비속어, 빈 내용 등)"
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
						<div className="flex flex-wrap">
							{options.map((option, index) => (
								<InputField
									key={index}
									tabIndex={index}
									value={option}
									className="spottable text-sm rounded-md h-8 shadow-inner m-2 w-1/3 mb-8"
									placeholder={`선택지 ${index + 1}`}
									autoFocus={true}
									dismissOnEnter={true}
									invalid={!isOptionsValid[index]}
									invalidMessage="부적합"
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
											onClick={() => {
												handleAnswerSelect(index);
												setOptions(['O', 'X']);
											}}
											className={`bg-white spottable rounded-md p-4 m-2 h-80 text-7xl font-extrabold transition duration-300 ease-in-out 
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
											className={`bg-white spottable rounded-md p-4 m-2 h-16 transition duration-300 ease-in-out 
                  focus:bg-gray-100 focus:shadow-md focus:ring-4 focus:ring-bold focus:scale-105
                  flex-grow ${
										selectedAnswer === index
											? 'bg-black font-black text-green-600'
											: ''
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
			className="backdrop-blur-md rounded-xl h-[80vh] w-[93vw] bg-white"
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
				{currentStep === 3 && (
					<Button onClick={handleSubmitWithConfirmation}>제출</Button>
				)}
			</div>

			{showConfirmationPopup && (
				<Popup
					open={showConfirmationPopup}
					onClose={handleSubmissionCancel}
					title="Confirm Submission"
					scrimType="transparent"
					className="rounded-xl"
				>
					<div className="bg-white p-6 rounded-lg shadow-2xl w-2/3 h-2/3 mx-auto mt-20 flex flex-col justify-center items-center">
						<img
							src="https://github.com/kevink1113/static_CSE4103/blob/main/img/button/notice.png?raw=true"
							className="w-32 h-32"
						/>
						<BodyText className="text-gray-700 text-3xl text-center">
							한 번 제출하면 수정할 수 없으며, <br />
							운영진 검토 후 문제가 등록됩니다. <br />
							제출하시겠습니까?
						</BodyText>

						<div className="flex justify-center mt-6 space-x-4">
							<button
								onClick={handleSubmissionCancel}
								className="spottable bg-gray-500 focus:bg-gray-400 focus:scale-110 focus:shadow-xl text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out text-2xl"
							>
								다시 한번 생각해볼래요.
							</button>
							<button
								onClick={handleSubmissionConfirmation}
								className="spottable bg-bold focus:bg-yellow-400 focus:scale-110 focus:shadow-xl text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out text-2xl"
							>
								제출할래요!
							</button>
						</div>
					</div>
				</Popup>
			)}
		</Popup>
	);
};

export default QuizCreationOverlay;
