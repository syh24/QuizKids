import React, {useState} from 'react';
import Popup from '@enact/sandstone/Popup';
import BodyText from '@enact/ui/BodyText';
import Button from '@enact/sandstone/Button';

import Icon from '@enact/sandstone/Icon';

const QuizSolveOverlay = ({onClose, timestamp, video_id, quiz, handlePlay}) => {
	// const [currentQuizIndex, setCurrentQuizIndex] = useState(0); // Index to track the current quiz
	const currentQuiz = quiz; // Current quiz object

	const [answerState, setAnswerState] = useState('unanswered'); // 'correct', 'incorrect', or 'unanswered'
	const [selectedAnswer, setSelectedAnswer] = useState(null);

	const checkAnswer = selectedOption => {
		console.log(selectedOption, '을 선택했습니다. ');
		if (selectedOption === quiz.answer) {
			setAnswerState('correct');
		} else {
			setAnswerState('incorrect');
		}
		setSelectedAnswer(selectedOption);
	};

	const postAnswer = async () => {
		const ans = {
			answer: selectedAnswer
		};

		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URI}/api/quiz/${quiz.id}/answer`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(ans)
				}
			);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			console.log('답변 전송 완료:', data);

			// 여기서 videoHistories 관련 로직을 추가할 수 있음
			// 예: postVideoHistory();
		} catch (error) {
			console.error('Error posting quiz answer:', error);
		}
	};

	const renderOptions = quiz => {
		// Split the problem into lines, with the first line being the question
		const lines = quiz.problem.split('\n');
		const question = lines[0];
		const options = lines.slice(1); // Get the options (excluding the question)
		console.log('question: ', question);
		console.log('options: ', options);

		return (
			<>
				<BodyText className="bg-primary rounded-md p-2 w-full">
					{question}
				</BodyText>
				{options.map((option, index) => (
					<Button
						key={index}
						className="m-2 h-full"
						onClick={() => checkAnswer(index)}
					>
						{option}
					</Button>
				))}
			</>
		);
	};

	const renderResult = () => {
		return (
			<div className="flex flex-col items-center justify-center h-full pt-12">
				{/* 아이콘 추가 */}
				{/* <Icon
					size="large"
					className={
						answerState === 'correct' ? 'text-green-600' : 'text-red-600'
					}
					title={answerState === 'correct' ? 'circle' : 'closex'}
				>
					{answerState === 'correct' ? 'circle' : 'closex'}
				</Icon> */}

				{answerState === 'correct' ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="400"
						width="400"
						viewBox="0 0 448 512"
					>
						<path
							fill="#00da00"
							d="M224 96a160 160 0 1 0 0 320 160 160 0 1 0 0-320zM448 256A224 224 0 1 1 0 256a224 224 0 1 1 448 0z"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="400"
						width="400"
						viewBox="0 0 384 512"
					>
						<path
							fill="#ff2600"
							d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
						/>
					</svg>
				)}
				<div className="text-3xl py-12 text-center">
					{answerState === 'correct' ? (
						'정답입니다!'
					) : (
						<>
							<span className="font-bold">
								오답입니다.
								<br />
							</span>{' '}
							정답은{' ['}
							{quiz.answer + 1}. {quiz.problem.split('\n')[quiz.answer + 1]}
							{'] '}입니다.
						</>
					)}
				</div>
				<Button
					className="mt-4 bg-blue-500 text-white rounded-lg"
					onClick={() => {
						onClose();
						handlePlay();
						postAnswer();
					}}
				>
					확인
				</Button>
			</div>
		);
	};

	return (
		<Popup
			open={true}
			onClose={onClose}
			title="Quiz Time!"
			scrimType="transparent"
			className="backdrop-blur-md rounded-xl h-[80vh] w-[93vw] bg-white"
		>
			<div className="h-[60vh] px-8">
				<div className="flex flex-wrap justify-center">
					{answerState === 'unanswered' ? renderOptions(quiz) : renderResult()}
				</div>
			</div>
		</Popup>
	);
};

export default QuizSolveOverlay;
