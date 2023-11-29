import {useState, useEffect} from 'react';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Panels from '@enact/sandstone/Panels';
import Main from '../views/Main';
import {useBackHandler, useCloseHandler, useDocumentEvent} from './AppState';
import {isDevServe} from '../libs/utils';
import Skinnable from '@enact/sandstone/Skinnable';

import FullScreenLogin from '../views/FullScreenLogin';

/* istanbul ignore next*/
if (isDevServe()) {
	window.webOSSystem = {
		highContrast: 'off',
		close: () => {},
		platformBack: () => {},
		PmLogString: () => {},
		screenOrientation: 'landscape',
		setWindowOrientation: () => {}
	};
}

const App = props => {
	const [skinVariants, setSkinVariants] = useState({highContrast: false});
	const handleBack = useBackHandler();
	const handleClose = useCloseHandler();
	useDocumentEvent(setSkinVariants);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogin = () => {
		// 로그인 로직 구현
		setIsLoggedIn(true);
	};

	const handleRegister = () => {
		// 회원가입 로직 구현
	};

	return (
		<div>
			{!isLoggedIn && (
				<FullScreenLogin onLogin={handleLogin} onRegister={handleRegister} />
			)}
			{isLoggedIn && (
				<Panels
					{...props}
					skinVariants={skinVariants}
					onBack={handleBack}
					onClose={handleClose}
					// className="bg-white text-black"
					skin="light"
				>
					<Main skin="light" user_id={2} />
				</Panels>
			)}
		</div>
	);
};

export default ThemeDecorator(App);
