import Button from '@enact/sandstone/Button';
import Icon from '@enact/sandstone/Icon';
import React, {useState, useEffect} from 'react';
import Popup from '@enact/sandstone/Popup';
import {InputField, Input} from '@enact/sandstone/Input';
import BodyText from '@enact/ui/BodyText';
import ProfileSelection from './ProfileSection';

const Profile = ({imgSrc, nickName, sex, age, setName, setAge, setSex, setImgIdx}) => {
    const [showProfileSelection, setShowProfileSelection] = useState(false);
    const [isDuplicateNickname, setIsDuplicateNickName] = useState(false);
    const [openFlag, setOpenFlag] = useState(false);

    const ageTypes = [
        '5살보다 어려요.',
        '5살에서 7살 사이에요.',
        '초등학교 저학년이에요.',
        '초등학교 고학년이에요.',
        '중학생이에요.',
        '고등학생이에요.',
        '성인이에요.'
    ];

    const handleUserName = async (event) => {
        try {
          const success = await setName(event.value, true);
          console.log(success);
      
          if (success) {
            setIsDuplicateNickName(false);
          } else {
            setIsDuplicateNickName(true);
          }
        } catch (error) {
          console.error('에러 발생:', error);
          // 에러 처리 로직 추가
        }
    };

    const handleUserSex = (event) => {
        (event.target.outerText === "남성") ? setSex("M") : setSex("F");
    }

    const handleUserAge = (event) => {
        const clickedButton = event.target.innerText;
        const index = ageTypes.indexOf(clickedButton);
        setAge(index);
    }

    const toggleProfileSelection = () => {
        setShowProfileSelection(current => !current);
    }

    return (
        <div>
                <div className="flex">
                    <img 
                        src={imgSrc}
                        className="ml-24 w-44 h-50 rounded-full"
                    />
                    <div className="mt-16 ml-10">
                        <Input
                            onClick = {() => {setOpenFlag(true);}}
                            invalidMessage="죄송합니다. 해당 닉네임은 이미 다른 사용자가 사용 중입니다. 다른 닉네임을 입력해주세요."
                            onBeforeChange={function noRefCheck(){}}
                            onChange={function noRefCheck(){}}
                            onClose={function noRefCheck(){}}
                            onComplete={handleUserName}
                            onOpenPopup={function noRefCheck(){}}
                            popupType="fullscreen"
                            placeholder={nickName}
                            value={nickName}
                            size="small"
                            title="Enter new NickName"
                            type="text"
                        />
                        <Icon>
                            edit
                        </Icon>
                    </div>
                </div>

                <div className="ml-32" >
                    <Button 
                        onClick = {toggleProfileSelection}
                        size="small"
                        backgroundOpacity="transparent"
                    >
                        변경
                    </Button>
                </div>
                
                <div className="ml-32">
                    <BodyText className="ml-11" size="large">
                        성별
                    </BodyText>
                    <Button color={sex === 'M' ? "yellow" : null} onClick={handleUserSex} className = "Spottable" size="small">남성</Button>
                    <Button color={sex === 'F' ? "yellow" : null} onClick={handleUserSex} className = "Spottable" size="small">여성</Button>
                </div>
                <div className="mt-8 ml-32 ">
                    <BodyText className="mx-11" size="large">
                        나이
                    </BodyText>
                    {ageTypes.map((ageType, index) => (
                        <Button color = {index === age ? "yellow" : null } size="small" key={index} onClick={handleUserAge}>
                            {ageType}
                        </Button>
                    ))}
                </div>

                {showProfileSelection ? <ProfileSelection onClose={toggleProfileSelection} setIdx={setImgIdx} /> : null }
        </div>        
    )
}

export default Profile;