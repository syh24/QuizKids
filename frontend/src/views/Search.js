import Alert from '@enact/sandstone/Alert';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import css from './Main.module.less';
import $L from '@enact/i18n/$L';
import {useConfigs} from '../hooks/configs';
import {usePopup} from './HomeState';
import {VirtualGridList, VirtualList} from '@enact/sandstone/VirtualList';
import Media from './Media';
import ImageItem from '@enact/sandstone/ImageItem';
import Scroller from '@enact/ui/Scroller';
import MediaOverlay from '@enact/sandstone/MediaOverlay';
import {useState, useEffect} from 'react';
import Detail from './Detail';
import {InputField} from '@enact/sandstone/Input';

const Search = ({user_id}) => {
	const [currentVideoSrc, setCurrentVideoSrc] = useState('');
	const [currentVideoId, setCurrentVideoId] = useState('');
	const [videoSources, setVideoSources] = useState([]);

	const [searchText, setSearchText] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	// Updated to accept src directly
	const handleVideoSelect = video => {
		setCurrentVideoSrc(video ? video.url_link : '');
		setCurrentVideoId(video ? video.id : '');
	};

	const handleKeyPress = (event, src) => {
		if (event.key === 'Enter') {
			handleVideoSelect(src);
		}
	};

	const fetchVideos = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URI}/api/videos?order_by=hit&order_type=desc&count=4/`
			);
			const data = await response.json();
			// const videoUrls = data.map(video => video.url_link);
			setVideoSources(data);
		} catch (error) {
			console.log('Eror fetching videos:', error);
		}
	};

	const fetchSearchResults = async () => {
		if (searchText) {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_BACKEND_URI}/api/videos?name=${searchText}`
				);
				const data = await response.json();
				setSearchResults(data);
				setVideoSources(data);
			} catch (error) {
				console.log('Error fetching search results:', error);
			}
		}
	};

	const handleSearchSelect = video => {
		setSearchText(video.name);
	};

	// Use useEffect to fetch videos on component mount
	useEffect(() => {
		fetchVideos();
	}, []);

	// Use useEffect to fetch videos on search text change
	useEffect(() => {
		fetchSearchResults();
	}, [searchText, videoSources]);

	return (
		<div className="m-4">
			{currentVideoSrc === '' && (
				<>
					<InputField
						type="text"
						value={searchText}
						onChange={e => setSearchText(e.value)}
						autoFocus={true}
						dismissOnEnter={true}
						placeholder="검색어를 입력하세요"
						className="w-full"
					/>
					{searchText && (
						<div>
							{searchResults.map((video, index) => (
								<div
									key={index}
									onClick={() => handleSearchSelect(video)}
									className="spottable p-2 m-2 bg-gray-100 rounded-sm shadow-md
                                transition duration-300 ease-in-out focus:bg-primary focus:shadow-xl focus:scale-105
                                hover:bg-primary hover:shadow-xl hover:scale-105"
								>
									{video.name}
								</div>
							))}
						</div>
					)}
				</>
			)}

			{currentVideoSrc === '' ? (
				<div className="ml-4">
					<div className="h-56 mt-12">
						{searchText ? (
							<BodyText>검색 결과</BodyText>
						) : (
							<BodyText>추천 영상</BodyText>
						)}

						<div className="flex overflow-x-auto  whitespace-nowrap h-full no-scrollbar">
							{videoSources.map((video, index) => (
								<div key={index} className="mr-2 flex-shrink-0">
									<Media
										onClick={() => handleVideoSelect(video)}
										onKeyDown={event => handleKeyPress(event, video.url_link)}
										idx={video.id}
										src={video.url_link}
										thumbSrc={video.thumbnail}
										name={video.name}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			) : (
				<Detail
					src={currentVideoSrc}
					video_id={currentVideoId}
					onBack={() => handleVideoSelect('')}
					user_id={user_id}
				/>
			)}
		</div>
	);
};

export default Search;
