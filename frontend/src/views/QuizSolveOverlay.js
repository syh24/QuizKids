import React, {useState} from 'react';
import Popup from '@enact/sandstone/Popup';
import BodyText from '@enact/ui/BodyText';
import Button from '@enact/sandstone/Button';

const QuizSolveOverlay = ({onClose, timestamp, video_id, quiz}) => {
	// const [currentQuizIndex, setCurrentQuizIndex] = useState(0); // Index to track the current quiz
	const currentQuiz = quiz; // Current quiz object

	const renderOptions = quiz => {
		// Split the problem into lines, with the first line being the question
		const lines = quiz.problem.split('\n');
		const question = lines[0];
		const options = lines.slice(1); // Get the options (excluding the question)

		return (
			<>
				<BodyText className="mb-4">{question}</BodyText>
				{options.map((option, index) => (
					<Button key={index} className="m-2">
						{option}
					</Button>
				))}
			</>
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
				<BodyText className="mb-4">
					{currentQuiz && currentQuiz.problem}
				</BodyText>
				<div className="flex flex-wrap justify-center">
					{currentQuiz && renderOptions(currentQuiz)}
				</div>
				<Button className="mt-4">Next Question</Button>
			</div>
		</Popup>
	);
};

export default QuizSolveOverlay;
