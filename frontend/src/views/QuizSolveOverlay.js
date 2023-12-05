import React, {useState} from 'react';
import Popup from '@enact/sandstone/Popup';
import BodyText from '@enact/ui/BodyText';
import Button from '@enact/sandstone/Button';

import Icon from '@enact/sandstone/Icon';

const QuizSolveOverlay = ({onClose, timestamp, video_id, quiz}) => {
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

	const renderOptions = quiz => {
		// Split the problem into lines, with the first line being the question
		const lines = quiz.problem.split('\n');
		const question = lines[0];
		const options = lines.slice(1); // Get the options (excluding the question)

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
			<div className="flex flex-col items-center justify-center h-full">
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

				<div
					className={
						answerState === 'correct'
							? 'text-green-600 text-9xl'
							: 'text-red-600 text-9xl'
					}
				>
					{answerState === 'correct' ? 'O' : 'X'}
				</div>

				<BodyText
					className={`text-lg ${
						answerState === 'correct' ? 'text-green-600' : 'text-red-600'
					}`}
				>
					{answerState === 'correct' ? (
						'정답입니다!'
					) : (
						<>
							<span className="font-bold">오답입니다.</span> 정답은{' ['}
							{quiz.answer + 1}. {quiz.problem.split('\n')[quiz.answer + 1]}
							{'] '}입니다.
						</>
					)}
				</BodyText>
				<Button
					className="mt-4 bg-blue-500 text-white rounded-lg"
					onClick={onClose}
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
