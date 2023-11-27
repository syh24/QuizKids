import Button from '@enact/sandstone/Button';
import Icon from '@enact/sandstone/Icon';
import React, {useState, useEffect} from 'react';
import Input from '@enact/sandstone/Input';
import BodyText from '@enact/ui/BodyText';
import ProfileSelection from './ProfileSection';

const Profile = ({imgSrc, nickName, sex, userAge, setProfile}) => {
    const [showProfileSelection, setShowProfileSelection] = useState(false);
    const [userName, setUserName] = useState(nickName);
    const [gender, setGender] = useState(sex);
    const [age, setAge] = useState(parseInt(userAge, 10));

    const ageTypes = [
        '5살보다 어려요.',
        '5살에서 7살 사이에요.',
        '초등학교 저학년이에요.',
        '초등학교 고학년이에요.',
        '중학생이에요.',
        '고등학생이에요.',
        '성인이에요.'
    ];

    const onComplete= (event) => {
        setUserName(event.value);
    };

    const handleGenderButton = (event) => {
        (event.target.outerText === "남성") ? setGender("M") : setGender("F");
        console.log(gender);
    }

    const handleAgeButton = (event) => {
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
                            invalidMessage="This is a bad value"
                            onBeforeChange={function noRefCheck(){}}
                            onChange={function noRefCheck(){}}
                            onClose={function noRefCheck(){}}
                            onComplete={onComplete}
                            onOpenPopup={function noRefCheck(){}}
                            placeholder={userName}
                            popupType="fullscreen"
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
                    <Button color={gender === 'M' ? "yellow" : null} onClick={handleGenderButton} className = "Spottable" size="small">남성</Button>
                    <Button color={gender === 'F' ? "yellow" : null} onClick={handleGenderButton} className = "Spottable" size="small">여성</Button>
                </div>
                <div className="mt-8 ml-32 ">
                    <BodyText className="mx-11" size="large">
                        나이
                    </BodyText>
                    {ageTypes.map((ageType, index) => (
                        <Button color = {index === age ? "yellow" : null } size="small" key={index} onClick={handleAgeButton}>
                            {ageType}
                        </Button>
                    ))}
                </div>

                {showProfileSelection ? <ProfileSelection onClose={toggleProfileSelection} setProfile={setProfile} /> : null }
        </div>        
    )
}

export default Profile;