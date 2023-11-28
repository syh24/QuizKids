import React, {useState, useRef, useEffect} from 'react';

import TabLayout, {Tab} from '@enact/sandstone/TabLayout';
import {Header, Panel} from '@enact/sandstone/Panels';
import $L from '@enact/i18n/$L';
import Home from './Home';
// import Account from './Account';
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import Icon from '@enact/sandstone/Icon';
import imgsrc_ from './cat_1.png';
import imgsrc__ from './cat_2.png';
import imgsrc___ from './penguin.png';
import imgsrc____ from './dog.png';
import imgsrc_____ from './dog_1.png';
import Account from './Account';
import Profile from './Profile';
import MediaOverlay from '@enact/sandstone/MediaOverlay';
import SystemState from './SystemState';
const imagePaths = ['https://ssl.pstatic.net/mimgnews/image/112/2021/07/08/202107081008046563160_20210708100917_01_20210708101006245.jpg?type=w540', 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTscDSszyGFxlaLRB8Aj1A3gfUKy0hCRhCH4g&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOByQi_wqBIRiSI8ta4O05kp-awGDIlYVhHQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUbasz5gJ16BJX0At8_H5IaBTn9H6OVEi_KA&usqp=CAU'];

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

	const updateUser = async(new_body) => {
		try {
			const response = await fetch(`http://localhost:4000/api/users/${props.user_id}`, {
			  method: 'PUT',
			  headers: {
				'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(new_body),
			});
	  
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
	const setWrapperName = async (newNickName) => {
		try {
			const success = await updateUser({ "nickname": newNickName });
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

	const setWrapperAge = (newAge) => {
		setUserAge(newAge);
		updateUser({"age": newAge})
	}

	const setWrapperSex = (newSex) => {
		setUserSex(newSex);
		updateUser({"sex" : newSex})
	}

	const setWrapperImgIdx = (newIdx) => {
		setUserImgIdx(newIdx);
		updateUser({"img_idx" : newIdx})
	}

	// fetch user
	const getUser = async() => {
        const user = await
        (await fetch(
            `http://localhost:4000/api/users/?user_id=${props.user_id}`
        )).json();

        //setMovies(json.data.movies);
		console.log(user[0]);
		setUserNickName(user[0].nickname);
		setUserAge(user[0].age);
		setUserSex(user[0].sex);
		setUserImgIdx(user[0].img_idx);
    };

    useEffect(() => {getUser();}, []);

	return (
		<Panel className="bg-white">
			<TabLayout
				onSelect={function noRefCheck() {}}
				onTabAnimationEnd={function noRefCheck() {}}
				orientation="vertical"
				tabSize={null}
			>
				<Tab title="Profile" icon={imagePaths[userImgIdx]}>
					<Profile 
						imgSrc={imagePaths[userImgIdx]}
						nickName={userNickName} 
						sex={userSex} 
						age={userAge}
						setName={setWrapperName}
						setAge={setWrapperAge}
						setSex={setWrapperSex}
						setImgIdx={setWrapperImgIdx}
					/>
				</Tab>
				<Tab title={$L('Home')} icon="home">
					<Home />
				</Tab>
				<Tab icon="gear" title="Settings">
					<Button icon="demosync">Button 1</Button>
					<Button icon="demosync">Button 2</Button>
					<Button icon="demosync">Button 3</Button>
					<Button icon="demosync">Button 4</Button>
					<Button icon="demosync">Button 5</Button>
				</Tab>
				<Tab icon="list" title="History">
					<Item slotBefore={<Icon>playcircle</Icon>}>Single Item</Item>
				</Tab>
				<Tab icon="profile" title="login"> 
					<Account />
				</Tab>
				<Tab icon="wisa" title="ResourceUsage" >
					<SystemState />
				</Tab>
			</TabLayout>
		</Panel>
	);
};

export default Main;
export {imagePaths};