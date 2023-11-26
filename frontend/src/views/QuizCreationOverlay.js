import React, {useState, useEffect} from 'react';
import {WizardPanels, Slottable, Panel} from '@enact/sandstone/WizardPanels';
import Button from '@enact/sandstone/Button';
import Input from '@enact/sandstone/Input';
import {InputField} from '@enact/sandstone/Input';
import Checkbox from '@enact/sandstone/Checkbox';
import Popup from '@enact/sandstone/Popup';
import Scroller from '@enact/sandstone/Scroller';
import BodyText from '@enact/ui/BodyText';

const QuizCreationOverlay = ({onClose}) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [question, setQuestion] = useState('');
	const [options, setOptions] = useState(['', '', '', '']); // Assuming 4 options
	const [questionType, setQuestionType] = useState('');
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const totalSteps = 4; // Total number of steps

	const nextStep = () => {
		setCurrentStep(currentStep + 1);
	};

	const prevStep = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const setQuestionTypeAndAdvance = type => {
		setQuestionType(type);
		// 'O X 문제'를 선택했을 경우 바로 3단계로 넘어가기
		if (type === 'O X 문제') {
			setCurrentStep(2);
		} else {
			nextStep();
		}
	};

	const handleSubmit = () => {
		// 여기에 정답 제출 로직 추가
		console.log('Selected Answer:', selectedAnswer);
	};

	const handleAnswerSelect = answer => {
		setSelectedAnswer(answer);
	};

	const StepIndicator = ({currentStep, totalSteps}) => {
		return (
			<div className="flex justify-center items-center mb-5">
				{[...Array(totalSteps).keys()].map((step, index) => (
					<React.Fragment key={step}>
						{/* Circle */}
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center
                                    ${
																			currentStep === step
																				? 'bg-bold text-white border-8 border-white'
																				: 'bg-bold text-white'
																		} mx-0`}
						>
							{step + 1}
						</div>

						{/* Dotted Line Connector */}
						{index < totalSteps - 1 && (
							<div className="border-b-8 border-dotted border-bold w-16"></div>
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
						<BodyText className="bg-primary rounded-md p-2">
							문제의 종류를 선택하세요.
						</BodyText>
						<div className="flex flex-auto justify-center">
							{[
								'4개 중 맞는 문장 고르기',
								'O X 문제',
								'4개 중 맞는 숫자 고르기'
							].map(type => (
								<button
									key={type}
									onClick={() => setQuestionTypeAndAdvance(type)} // 수정된 함수 호출
									skin="light"
									className="bg-white spottable rounded-md p-2 m-2 transition duration-300 ease-in-out 
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
							<input
								tabIndex={0}
								placeholder="문제를 입력하세요. (최대 50자)"
								value={question}
								onChange={e => setQuestion(e.value)}
								className="spottable flex-1 text-sm rounded-md h-8 shadow-inner m-2"
							/>
						</div>
					</>
				);
			case 2:
				return (
					<>
						<BodyText className="bg-primary rounded-md p-2">
							문제를 입력하세요.
						</BodyText>
						<div className="flex">
							{options.map((option, index) => (
								<input
									key={index}
									value={option}
									className="spottable text-sm rounded-md h-8 shadow-inner
								p-2 m-2 transition duration-300 ease-in-out flex-grow
									focus:bg-gray-100 focus:shadow-md focus:ring-4 focus:ring-bold focus:scale-105"
									placeholder={`선택지 ${index + 1}`}
									onChange={e =>
										setOptions(
											options.map((o, i) => (i === index ? e.target.value : o))
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
											onClick={() => handleAnswerSelect(option)}
											className={`bg-white spottable rounded-md p-2 m-2 transition duration-300 ease-in-out 
                focus:bg-gray-100 focus:shadow-md focus:ring-4 focus:ring-bold focus:scale-105
                flex-grow ${selectedAnswer === option ? 'bg-orange-500' : ''}`}
										>
											{option}
										</button>
								  ))
								: options.map((option, index) => (
										<button
											key={index}
											onClick={() => handleAnswerSelect(option)}
											className={`bg-white spottable rounded-md p-2 m-2 transition duration-300 ease-in-out 
                focus:bg-gray-100 focus:shadow-md focus:ring-4 focus:ring-bold focus:scale-105
                flex-grow ${selectedAnswer === option ? 'bg-orange-500' : ''}`}
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
			<StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
			<div className="h-[60vh]">{renderStep()}</div>
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
