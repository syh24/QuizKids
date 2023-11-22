import React, {useState} from 'react';
import Button from '@enact/sandstone/Button';
import Input from '@enact/sandstone/Input';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import Checkbox from '@enact/sandstone/Checkbox';
import Popup from '@enact/sandstone/Popup';
import Scroller from '@enact/sandstone/Scroller';
import Icon from '@enact/ui/Icon';

const QuizCreationOverlay = ({onClose, timestamp}) => {
	const [showPopup, setShowPopup] = useState(false);
	const [question, setQuestion] = useState('');
	const [options, setOptions] = useState(['', '']);

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
	};

	const [checkedOptions, setCheckedOptions] = useState([]);

	const handleToggleOption = index => {
		setCheckedOptions(current => {
			const newChecked = new Set(current);
			if (newChecked.has(index)) {
				newChecked.delete(index);
			} else {
				newChecked.add(index);
			}
			return Array.from(newChecked);
		});
	};

	const handleSaveQuestion = async () => {
		// Example data structure, modify according to your frontend
		console.log('Question:', question, 'Options:', options);
		const quizData = {
			userId: 'user',
			videoId: '1',
			problem: question,
			answer: checkedOptions,
			quizJson: JSON.stringify({options}) // Convert options array to JSON string
		};
		console.log(quizData);
		try {
			const response = await fetch('/addQuiz', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(quizData)
			});

			if (response.ok) {
				console.log('Quiz added successfully');
				console.log(quizData);
				setShowPopup(false);
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
							checked={checkedOptions.includes(index)}
						/>
						{/* Implement toggle logic if necessary */}
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
