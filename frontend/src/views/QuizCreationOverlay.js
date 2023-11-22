import React, {useState} from 'react';
import Button from '@enact/sandstone/Button';
import Input from '@enact/sandstone/Input';
import Checkbox from '@enact/sandstone/Checkbox';
import Popup from '@enact/sandstone/Popup';
import Scroller from '@enact/sandstone/Scroller';

const QuizCreationOverlay = ({onClose, timestamp, src}) => {
	const [question, setQuestion] = useState('');
	const [options, setOptions] = useState(['', '']);
	const [correctAnswer, setCorrectAnswer] = useState(null);

	const handleAddOption = () => {
		setOptions([...options, '']);
	};

	const handleOptionChange = (index, value) => {
		const newOptions = [...options];
		newOptions[index] = value;
		setOptions(newOptions);
	};

	const handleDeleteOption = index => {
		const newOptions = options.filter(
			(_, optionIndex) => optionIndex !== index
		);
		setOptions(newOptions);
		if (correctAnswer === index) {
			setCorrectAnswer(null); // Reset correct answer if it was deleted
		}
	};

	const handleToggleOption = index => {
		if (correctAnswer === index) {
			// If the same checkbox is clicked again, uncheck it
			setCorrectAnswer(null);
		} else {
			// Otherwise, set this checkbox as the correct answer
			setCorrectAnswer(index);
		}
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
		<Popup open={true} onClose={onClose} title="Create New Quiz Question">
			<div>Current Timestamp: {timestamp}s</div>
			<Input
				placeholder="Enter your question here"
				value={question}
				onChange={e => setQuestion(e.value)}
			/>
			<Scroller direction="vertical" style={{maxHeight: '60vh'}}>
				{options.map((option, index) => (
					<div key={index} className="flex items-center my-2">
						<Checkbox
							onToggle={() => handleToggleOption(index)}
							checked={correctAnswer === index}
						/>
						<Input
							className="ml-2"
							value={option}
							onChange={e => handleOptionChange(index, e.value)}
							size="small"
							type="text"
							placeholder="Enter option text"
						/>
						<Button
							size="small"
							icon="trash"
							onClick={() => handleDeleteOption(index)}
						></Button>
					</div>
				))}
			</Scroller>
			<Button icon="plus" onClick={handleAddOption}>
				Add Option
			</Button>
			<Button onClick={handleSaveQuestion}>Add This Question</Button>
		</Popup>
	);
};

export default QuizCreationOverlay;
