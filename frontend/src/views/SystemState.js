// This is subscribe APIs.
import {useEffect, useRef, useState} from 'react';

import debugLog from '../libs/log';
import {getMemoryInfo, getCpuInfo} from '../libs/services';
import RenderingGraph from './RenderingGraph';
import BodyText from '@enact/sandstone/BodyText';
import RenderingLoading from './RenderingLoading';
import RenderingMemoryGraph from './RenderingMemoryGraph';

const USER = 0;
const NICE = 1;
const SYSTEM = 2;
const IDLE = 3;

// let usage = [];

const SystemState = () => {
	const cpuRef = useRef(null);
	const memRef = useRef(null);
	const [curCpu, setCurCpu] = useState([]);
    const [curMem, setCurMem] = useState([]);
	const [loading, setLoading] = useState(true); // 사용량 알 수 있을 때까지 1초 기다린 뒤, true로 set 됨

	const [cpuStat, setCpuStat] = useState({stat: [], returnValue: false});
    const [memoryStat, setMemoryStat] = useState({returnValue: false});

	useEffect(() => {
		if (!cpuRef.current) {
			debugLog('GET_CONFIGS[R]', {});
			cpuRef.current = getCpuInfo({
				parameters: {
					subscribe: true
				},
				onSuccess: res => {
					debugLog('GET_CONFIGS[S]', res);
					//cpuStat.current = res;
					setCpuStat(res);
				},
				onFailure: err => {
					debugLog('GET_CONFIGS[F]', err);
				}
			});
		}

        if (!memRef.current) {
			debugLog('GET_CONFIGS[R]', {});
			memRef.current = getMemoryInfo({
				parameters: {
					subscribe: true
				},
				onSuccess: res => {
					debugLog('GET_CONFIGS[S]', res);
					//cpuStat.current = res;
					setMemoryStat(res);
				},
				onFailure: err => {
					debugLog('GET_CONFIGS[F]', err);
				}
			});
		}

		let newCur = cpuStat.stat.slice(0, 5).map((element, index) => {
			return element.split(/\s+/).slice(1, 5);
		});

		setCurCpu(newCur); // cur 상태 업데이트
        setCurMem([memoryStat.usable_memory, memoryStat.swapUsed]);

		return () => {
			if (cpuRef.current) {
				cpuRef.current.cancel();
				cpuRef.current = null;
			}

            if (memRef.current) {
				memRef.current.cancel();
				memRef.current = null;
			}
		};
	}, [cpuStat, memoryStat]);

	console.log(curCpu);
    console.log(curMem);

	return (
		<div>
			{/*loading ? <RenderingLoading /> : <RenderingGraph cpuUsage={usage} memoryUsage = {[memStat.current.usable_memory, memStat.current.swapUsed]}/>*/}
			<RenderingGraph cpuUsage={curCpu} />
            <RenderingMemoryGraph memoryUsage={curMem} />
		</div>
	);
};

export default SystemState;
