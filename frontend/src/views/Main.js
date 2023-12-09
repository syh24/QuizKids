import React, {useState, useRef, useEffect} from 'react';

import TabLayout, {Tab} from '@enact/sandstone/TabLayout';
import {Header, Panel} from '@enact/sandstone/Panels';
import $L from '@enact/i18n/$L';
import Home from './Home';
// import Account from './Account';
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import Icon from '@enact/sandstone/Icon';
import Account from './Account';
import Profile from './Profile';
import Search from './Search';
import History from './History';
import MediaOverlay from '@enact/sandstone/MediaOverlay';
import SystemState from './SystemState';
import SwitchItem from '@enact/sandstone/SwitchItem';

import LogoPath from './logo.svg';

import {Image} from '@enact/sandstone/Image';

const imagePaths = [
	'https://i.esdrop.com/d/f/7KR1V6ddvN/HHgzYEAZCS.jpg',
	'https://i.esdrop.com/d/f/7KR1V6ddvN/uREUlVacey.jpg',
	'https://i.esdrop.com/d/f/7KR1V6ddvN/WsvlJs70rr.jpg',
	'https://i.esdrop.com/d/f/7KR1V6ddvN/aKRDbFql4b.jpg',
	'https://i.esdrop.com/d/f/7KR1V6ddvN/zUnpoLvpMG.jpg'
];

// hover 상태에 따라 video를 제어하는 Component
const HoverVideoOverlay = ({src, ...rest}) => {
	const [isHovering, setIsHovering] = useState(false);
	const videoRef = useRef(null);

	const handleMouseEnter = () => {
		setIsHovering(true);
		if (videoRef.current) {
			videoRef.current.play();
		}
	};

	const handleMouseLeave = () => {
		setIsHovering(false);
		if (videoRef.current) {
			videoRef.current.pause();
		}
	};

	return (
		<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<MediaOverlay {...rest}>
				<video ref={videoRef} muted loop>
					<source src={src} type="video/mp4" />
				</video>
			</MediaOverlay>
		</div>
	);
};

const Main = props => {
	const [userNickName, setUserNickName] = useState('');
	const [userAge, setUserAge] = useState(-1);
	const [userSex, setUserSex] = useState('');
	const [userImgIdx, setUserImgIdx] = useState(-1);

	const updateUser = async new_body => {
		try {
			const response = await fetch(
				// `http://localhost:4000/api/users/${props.user_id}`,
				`${process.env.REACT_APP_BACKEND_URI}/api/users/${props.user_id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(new_body)
				}
			);

			if (!response.ok) {
				throw new Error('서버 응답 오류');
			}

			const updatedUserData = await response.json();
			console.log('업데이트된 사용자 정보:', updatedUserData);
			return true;
		} catch (error) {
			console.error('데이터 업데이트 실패:', error);
			return false;
		}
	};

	// following functions are the Props passed to the profile Component
	const setWrapperName = async newNickName => {
		try {
			const success = await updateUser({nickname: newNickName});
			if (success) {
				setUserNickName(newNickName);
				return true;
			}
			// duplicate nickname
			else {
				return false;
			}
		} catch (error) {
			console.error('에러 발생:', error);
			return false;
		}
	};

	const setWrapperAge = newAge => {
		setUserAge(newAge);
		updateUser({age: newAge});
	};

	const setWrapperSex = newSex => {
		setUserSex(newSex);
		updateUser({sex: newSex});
	};

	const setWrapperImgIdx = newIdx => {
		setUserImgIdx(newIdx);
		updateUser({img_idx: newIdx});
	};

	// fetch user
	const getUser = async () => {
		console.log('받아온 user_id:');
		console.log(props.user_id);
		const user = await (
			await fetch(
				`${process.env.REACT_APP_BACKEND_URI}/api/users/?user_id=${props.user_id}`
			)
		).json();

		//setMovies(json.data.movies);
		console.log('user:======================', user);
		console.log(user[0]);
		setUserNickName(user[0].nickname);
		setUserAge(user[0].age);
		setUserSex(user[0].sex);
		setUserImgIdx(user[0].img_idx);
	};

	useEffect(() => {
		getUser();
	}, []);
	if (props.user_id) {
		return (
			<Panel className="bg-white">
				<img
					src={LogoPath}
					alt="QuizKids"
					className="w-12 h-12 absolute pt-4 pl-4"
				/>
				<TabLayout
					onSelect={function noRefCheck() {}}
					onTabAnimationEnd={function noRefCheck() {}}
					orientation="vertical"
					tabSize={null}
				>
					<Tab title="Profile" icon={imagePaths[userImgIdx]} className="mt-36">
						<Profile
							imgSrc={imagePaths[userImgIdx]}
							nickName={userNickName}
							sex={userSex}
							age={userAge}
							setName={setWrapperName}
							setAge={setWrapperAge}
							setSex={setWrapperSex}
							setImgIdx={setWrapperImgIdx}
							onLogout={props.onLogout}
						/>
					</Tab>
					<Tab title={$L('Home')} icon="home">
						<Home user_id={props.user_id} />
					</Tab>
					<Tab icon="search" title="Search">
						<Search />
					</Tab>
					<Tab icon="gear" title="Settings">
						{/* <Button icon="demosync">Button 1</Button>
					<Button icon="demosync">Button 2</Button>
					<Button icon="demosync">Button 3</Button>
					<Button icon="demosync">Button 4</Button>
					<Button icon="demosync">Button 5</Button> */}
						<SwitchItem onToggle={function noRefCheck() {}}>
							사용자 맞춤 추천
						</SwitchItem>
						<SwitchItem onToggle={function noRefCheck() {}}>
							Quiz 더 자주 띄우기
						</SwitchItem>
					</Tab>
					<Tab icon="list" title="History">
						<History userID={props.user_id} />
					</Tab>
					{/* <Tab icon="profile" title="login">
						<Account />
					</Tab> */}
					<Tab icon="wisa" title="ResourceUsage">
						<SystemState />
					</Tab>
				</TabLayout>
			</Panel>
		);
	}
	return <div>대기 중...</div>;
};

export default Main;
export {imagePaths};
