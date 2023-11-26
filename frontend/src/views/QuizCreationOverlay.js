import React, {useState, useEffect} from 'react';
import {WizardPanels, Slottable, Panel} from '@enact/sandstone/WizardPanels';
import Button from '@enact/sandstone/Button';
import Input from '@enact/sandstone/Input';
import {InputField} from '@enact/sandstone/Input';
import Checkbox from '@enact/sandstone/Checkbox';
import Popup from '@enact/sandstone/Popup';
import Scroller from '@enact/sandstone/Scroller';

const QuizCreationOverlay = ({onClose}) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [question, setQuestion] = useState('');
	const [options, setOptions] = useState(['', '', '', '']); // Assuming 4 options
	const [questionType, setQuestionType] = useState('');
	const totalSteps = 4; // Total number of steps

	const nextStep = () => {
		setCurrentStep(currentStep + 1);
	};

	const prevStep = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
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
						<header>문제의 종류를 선택하세요. </header>
						<div className="flex">
							{[
								'4개 중 맞는 문장 고르기',
								'O X 문제',
								'4개 중 맞는 숫자 고르기'
							].map(type => (
								<Button key={type} onClick={() => setQuestionType(type)}>
									{type}
								</Button>
							))}
						</div>
					</>
				);
			case 1:
				return (
					<>
						<header>문제를 입력하세요. </header>
						<InputField
							placeholder="문제를 입력하세요. (최대 50자)"
							value={question}
							onChange={e => setQuestion(e.value)}
						/>
					</>
				);
			case 2:
				return options.map((option, index) => (
					<InputField
						key={index}
						value={option}
						onChange={e =>
							setOptions(
								options.map((o, i) => (i === index ? e.target.value : o))
							)
						}
					/>
				));
			case 3:
				return <div>{/* Answer selection logic */}</div>;
			default:
				return null;
		}
	};

	return (
		<Popup
			open={true}
			onClose={onClose}
			title="Create New Quiz Question"
			className="backdrop-blur-md rounded-xl h-[80vh] w-[93vw]"
		>
			<StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
			{renderStep()}
			<div>
				{currentStep > 0 && <Button onClick={prevStep}>Back</Button>}
				{currentStep < 3 && <Button onClick={nextStep}>Next</Button>}
				{currentStep === 3 && <Button onClick={onClose}>Finish</Button>}
			</div>
		</Popup>
	);
};

export default QuizCreationOverlay;
