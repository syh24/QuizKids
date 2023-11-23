import React, {useState, useEffect} from 'react';
import {WizardPanels, Slottable, Panel} from '@enact/sandstone/WizardPanels';
import Button from '@enact/sandstone/Button';
import Input from '@enact/sandstone/Input';
import Checkbox from '@enact/sandstone/Checkbox';
import Popup from '@enact/sandstone/Popup';
import Scroller from '@enact/sandstone/Scroller';

const QuizCreationOverlay = ({onClose, timestamp, src}) => {
	const [current, setCurrent] = useState(0);
	const [questionType, setQuestionType] = useState('');
	const [question, setQuestion] = useState('');
	const [options, setOptions] = useState(['', '', '', '']);
	const [correctAnswer, setCorrectAnswer] = useState(null);

	useEffect(() => {
		if (questionType) {
			setCurrent(2); // questionType이 설정되면 다음 단계로 이동
		}
	}, [questionType]);

	const questionTypes = [
		'4개 중 맞는 문장 고르기',
		'O / X 문제',
		'4개 중 맞는 숫자 고르기',
		'사용자 지정 유형'
	];

	const handleQuestionTypeSelect = type => {
		setQuestionType(type);
		setCurrent(2); // 다음 페이지로 이동
	};

	// const handleAddOption = () => {
	// 	setOptions([...options, '']);
	// };

	// const handleOptionChange = (index, value) => {
	// 	const newOptions = [...options];
	// 	newOptions[index] = value;
	// 	setOptions(newOptions);
	// };

	// const handleDeleteOption = index => {
	// 	const newOptions = options.filter(
	// 		(_, optionIndex) => optionIndex !== index
	// 	);
	// 	setOptions(newOptions);
	// 	if (correctAnswer === index) {
	// 		setCorrectAnswer(null); // Reset correct answer if it was deleted
	// 	}
	// };

	// const handleToggleOption = index => {
	// 	if (correctAnswer === index) {
	// 		// If the same checkbox is clicked again, uncheck it
	// 		setCorrectAnswer(null);
	// 	} else {
	// 		// Otherwise, set this checkbox as the correct answer
	// 		setCorrectAnswer(index);
	// 	}
	// };
	const handleSave = () => {
		// 저장 로직 구현
		console.log({questionType, question, options, correctAnswer});
		onClose(); // 팝업 닫기
	};

	const handleSaveQuestion = async () => {
		const problemText = options
			.map((option, index) => `${index + 1}. ${option}`)
			.join('\n');
		const quizData = {
			user_id: 3, // Replace with actual user ID
			video_id: src, // Ensure 'src' is the video ID
			problem: {
				title: question,
				problem: problemText
			},
			answer: correctAnswer + 1 // Adjust for 0-based index
		};

		try {
			const response = await fetch('http://localhost:4000/api/quiz', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(quizData)
			});

			if (response.ok) {
				console.log('Quiz added successfully');
				onClose(); // Close the popup
			} else {
				console.error('Failed to add quiz');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<Popup
			open={true}
			onClose={onClose}
			title="Create New Quiz Question"
			className="backdrop-blur-md"
		>
			<WizardPanels
				current={0}
				nextButtonVisibility="auto"
				onBack={function noRefCheck() {}}
				onChange={function noRefCheck() {}}
				onNextClick={function noRefCheck() {}}
				onPrevClick={function noRefCheck() {}}
				onTransition={function noRefCheck() {}}
				onWillTransition={function noRefCheck() {}}
				prevButtonVisibility="auto"
				prevButton={
					<Button icon="closex" aria-label="Back">
						Back
					</Button>
				}
				nextButton={
					<Button icon="closex" aria-label="Quit">
						Close
					</Button>
				}
			>
				<Panel title="1. 문제의 종류를 선택하세요">
					<div style={{display: 'flex', justifyContent: 'space-around'}}>
						{['Type 1', 'Type 2', 'Type 3', 'Type 4'].map(type => (
							<Button key={type} onClick={() => setQuestionType(type)}>
								{type}
							</Button>
						))}
					</div>
				</Panel>
				<Panel title="2. 문제를 입력하세요">
					<Input value={question} onChange={e => setQuestion(e.value)} />
				</Panel>
				<Panel title="3. 선택지를 입력하세요">
					{options.map((option, index) => (
						<Input
							key={index}
							value={option}
							onChange={e =>
								setOptions(options.map((o, i) => (i === index ? e.value : o)))
							}
						/>
					))}
				</Panel>
				<Panel title="4. 정답 선택">{/* 정답 선택 로직 */}</Panel>
			</WizardPanels>
		</Popup>
	);
};

export default QuizCreationOverlay;
