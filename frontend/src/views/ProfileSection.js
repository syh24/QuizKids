import Popup from '@enact/sandstone/Popup';
import ImageItem from '@enact/sandstone/ImageItem';
import imgsrc_0 from './cat_1.png';
import imgsrc_1 from './cat_2.png';
import imgsrc_2 from './penguin.png';
import imgsrc_3 from './dog.png';
import imgsrc_4 from './dog_1.png';
import { imagePaths } from './Main';
import Spottable from '@enact/spotlight/Spottable';

const ProfileSelection = ({onClose, setIdx}) => {
    
    const onClick = (event) => {
        console.log('event', event);
        console.log('event.target.innerHTML', event.target.lastElementChild.innerHTML);
        console.log('event.type', event.type);
        let srcValue = '';

        if(event.type === "click"){
            srcValue = event.target.lastElementChild.currentSrc;
        }

        if(event.type === "keyup" || srcValue === undefined){
            let regex = /https:\/\/[^"\']+\.jpg/g;
            srcValue = event.target.lastElementChild.innerHTML.match(regex)[0];
        }

        console.log(srcValue);
        
        const index = imagePaths.indexOf(srcValue);
        if(index === -1){
            onClose();
            return;
        }

        setIdx(index)
        onClose();
    };

    return (
        <div className="Spottable">
            <Popup
                open={true}
                onClose={onClose}
                title="Create New Quiz Question"
                className="backdrop-blur-md Spottable"
            >
                <div className="flex justify-between Spottable">
                    {imagePaths.map((src, index) => (
                        <ImageItem
                            key={index}
                            onClick={onClick}
                            src={src}
                            style={{
                                height: '13.25rem',
                                width: '50rem'
                            }}
                            className="Spottable h-20"
                        />
					))}
                </div>
            </Popup>
        </div>
    )
}

export default ProfileSelection;