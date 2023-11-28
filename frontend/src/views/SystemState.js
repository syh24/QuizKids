// This is subscribe APIs.
import {useEffect, useRef, useState} from 'react';

import debugLog from '../libs/log';
import {getSystemInfo, getMemoryInfo, getCpuInfo} from '../libs/services';

export const SystemState = () => {
	const ref1 = useRef(null);
	const ref2 = useRef(null);
	const [value1, setValue1] = useState({returnValue: false});
	const [value2, setValue2] = useState({returnValue: false});
	useEffect(() => {
		if (!ref1.current) {
			debugLog('GET_CONFIGS[R]', {});
			ref1.current = getMemoryInfo({
				parameters: {
					subscribe: true,
				},
				onSuccess: res => {
					debugLog('GET_CONFIGS[S]', res);
					setValue1(res);
				},
				onFailure: err => {
					debugLog('GET_CONFIGS[F]', err);
				}
			});
		}

		return () => {
			if (ref1.current) {
				ref1.current.cancel();
				ref1.current = null;
			}
		};
	}, []);

    console.log('mem', value1);

	// cpu
	useEffect(() => {
		if (!ref2.current) {
			debugLog('GET_CONFIGS[R]', {});
			ref2.current = getCpuInfo({
				parameters: {
					subscribe: true,
				},
				onSuccess: res => {
					debugLog('GET_CONFIGS[S]', res);
					setValue2(res);
				},
				onFailure: err => {
					debugLog('GET_CONFIGS[F]', err);
				}
			});
		}

		return () => {
			if (ref2.current) {
				ref2.current.cancel();
				ref2.current = null;
			}
		};
	}, []);

    console.log('cpu', value2);

	return (
        <div>
            <h1>test</h1>
        </div>
    );
};

export default SystemState;