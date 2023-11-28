// This is subscribe APIs.
import {useEffect, useRef, useState} from 'react';

import debugLog from '../libs/log';
import {getSystemInfo, getMemoryInfo, getCpuInfo} from '../libs/services';

export const SystemState = () => {
	const ref = useRef(null);
	const [value, setValue] = useState({returnValue: false});

	useEffect(() => {
		if (!ref.current) {
			debugLog('GET_CONFIGS[R]', {});
			ref.current = getMemoryInfo({
				parameters: {
					subscribe: true,
				},
				onSuccess: res => {
					debugLog('GET_CONFIGS[S]', res);
					setValue(res);
				},
				onFailure: err => {
					debugLog('GET_CONFIGS[F]', err);
				}
			});
		}

		return () => {
			if (ref.current) {
				ref.current.cancel();
				ref.current = null;
			}
		};
	}, []);

    console.log(value);
	return (
        <div>
            <h1>test</h1>
        </div>
    );
};

export default SystemState;