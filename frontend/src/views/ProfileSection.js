import Popup from '@enact/sandstone/Popup';
import ImageItem from '@enact/sandstone/ImageItem';
import imgsrc_0 from './cat_1.png';
import imgsrc_1 from './cat_2.png';
import imgsrc_2 from './penguin.png';
import imgsrc_3 from './dog.png';
import imgsrc_4 from './dog_1.png';
import { imagePaths } from './Main';

const ProfileSelection = ({onClose, setIdx}) => {
    
    const onClick = (event) => {
        const srcValue = event.target.lastElementChild.currentSrc;
        console.log(srcValue);
        const index = imagePaths.indexOf(srcValue);
        setIdx(index)
        onClose();
    };

    return (
        <div>
            <Popup
                open={true}
                onClose={onClose}
                title="Create New Quiz Question"
                className="backdrop-blur-md Slottable"
            >
                <div className="flex Slottable justify-between">
                    {imagePaths.map((src, index) => (
                        <ImageItem
                            key={index}
                            onClick={onClick}
                            src={src}
                            style={{
                                height: '13.25rem',
                                width: '13rem'
                            }}
                            className="Slottable"
                        />
					))}
                </div>
            </Popup>
        </div>
    )
}

export default ProfileSelection;