// This is subscribe APIs.
import {useEffect, useRef, useState} from 'react';

import debugLog from '../libs/log';
import {getMemoryInfo, getCpuInfo} from '../libs/services';
import RenderingGraph from './RenderingGraph';
import BodyText from '@enact/sandstone/BodyText';
import RenderingLoading from './RenderingLoading';

const USER = 0;
const NICE = 1;
const SYSTEM = 2;
const IDLE = 3;

// let usage = [];

const SystemState = () => {
	const cpuRef = useRef(null);
	const memRef = useRef(null);
	const [cur, setCur] = useState([]);
	const [loading, setLoading] = useState(true); // 사용량 알 수 있을 때까지 1초 기다린 뒤, true로 set 됨

	const [count, setCount] = useState(0);

	const [cpuStat, setCpuStat] = useState({stat: [], returnValue: false});
	const memStat = useRef({returnValue: false});
	const prev = useRef([]);
	const saveCnt = useRef(0);
	let usage = [];
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

		let newCur = cpuStat.stat.slice(0, 5).map((element, index) => {
			return element.split(/\s+/).slice(1, 5);
		});

		setCur(newCur); // cur 상태 업데이트

		return () => {
			if (cpuRef.current) {
				cpuRef.current.cancel();
				cpuRef.current = null;
			}
		};
	}, [cpuStat]);

	//console.log(cpuStat);
	return (
		<div>
			{/*loading ? <RenderingLoading /> : <RenderingGraph cpuUsage={usage} memoryUsage = {[memStat.current.usable_memory, memStat.current.swapUsed]}/>*/}
			<div className="text-red-500">{JSON.stringify(cpuStat)}</div>
			<div className="text-green-500">{cpuStat.stat}</div>
			<div className="text-blue-500">{cpuStat.stat[0]}</div>
			<div className="text-purple-500">{cpuStat.stat[1]}</div>
			<div className="text-red-500">{cpuStat.stat[2]}</div>
			<div className="text-green-500">{cur}</div>
			<div className="text-green-100">TTT</div>
		</div>
	);
};

export default SystemState;
