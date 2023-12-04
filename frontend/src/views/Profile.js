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
    const [isInProperLength, setIsInProperLength] = useState(false);
    const [isInProperChar, setIsInProperChar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userName, setUserName] = useState('');
    
    useEffect(() => {
        setUserName(nickName);
    }, [nickName]);

    const ageTypes = [
        '5살보다 어려요.',
        '5살에서 7살 사이에요.',
        '초등학교 저학년이에요.',
        '초등학교 고학년이에요.',
        '중학생이에요.',
        '고등학생이에요.',
        '성인이에요.'
    ];

    const handleUserName = async () => {
        // 닉네임 길이 추가
        if(userName.length < 2 || userName.length > 10){
            setIsInProperLength(true);
            setErrorMessage("닉네임 길이는 2-10자 사이여야 합니다.");
            return;     
        }

        // 특수문자 거르기
        const hasSpecialChars = /[\/\*\&]/.test(userName);
        if(hasSpecialChars){
            setIsInProperChar(true);
            setErrorMessage("[ / , & , * ]는 사용할 수 없습니다.");
            return;
        }

        try { 
          const success = await setName(userName, true);
          setIsInProperLength(false);
          setIsInProperChar(false);
          console.log(success);
      
          if (success) {
            setIsDuplicateNickName(false);
          } else {
            setIsDuplicateNickName(true);
            setErrorMessage("이미 사용중인 닉네임입니다.");
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

    const onChange = (event) => {
        console.log(event.value);
        setUserName(event.value);
    }
    
    return (
        <div>
                <div className="flex">
                    <img 
                        src={imgSrc}
                        className="ml-24 w-44 h-50 rounded-full"
                    />
                    <div className="mt-16 ml-10">
                        <InputField
                            autoFocus={true}
                            invalid={isDuplicateNickname || isInProperLength || isInProperChar}
                            invalidMessage={errorMessage} 
                            onChange={onChange}
                            placeholder="닉네임을 입력하세요."
                            value={userName}
                            onActivate={() => console.log('activate')}
                            onDeactivate={() => {console.log('deactivate')}}
                            size="small"
                            type="text"
                        />
                        <Button icon='edit' onClick = {handleUserName} />
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