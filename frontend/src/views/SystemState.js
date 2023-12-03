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

const SystemState = () => {
    const cpuRef = useRef(null);
    const memRef = useRef(null);
    
    const [loading, setLoading] = useState(true); // 사용량 알 수 있을 때까지 1초 기다린 뒤, true로 set 됨
    const [cpuStat, setCpuStat] = useState({'stat': []});
    const [memoryStat, setMemoryStat] = useState({returnValue: false});

    const [count, setCount] = useState(0);
    const prev = useRef([]);
    const curr = useRef([]);
    const usage = useRef([]); // 각 cpu별 usage저장

    useEffect(() => {
        // 설정된 시간 간격마다 setInterval 콜백이 실행된다. 
        const id = setInterval(() => {
            // 타이머 숫자가 하나씩 줄어들도록
            setCount((current) => current + 1);
            if (!cpuRef.current) {
                //debugLog('GET_CONFIGS[R]', {});
                cpuRef.current = getCpuInfo({
                    parameters: {
                        subscribe: true,
                    },
                    onSuccess: res => {
                        setCpuStat(res);
                    },
                    onFailure: err => {
                        debugLog('GET_CONFIGS[F]', err);
                    }
                });
            }

            if (!memRef.current) {
                //debugLog('GET_CONFIGS[R]', {});
                memRef.current = getMemoryInfo({
                    parameters: {
                        subscribe: true,
                    },
                    onSuccess: res => {
                        setMemoryStat(res);
                    },
                    onFailure: err => {
                        debugLog('GET_CONFIGS[F]', err);
                    }
                });
            }
        }, 1000);
    
        
        console.log(count);

        if(count === 1){
			// initial cpu usage
            cpuStat.stat.slice(0,5).map((element, index) => {
                prev.current[index] = element.split(/\s+/).slice(1, 5);
            });
            console.log('prev', prev);
        }
    
        // cpu usage calculate, set loading as true
        else{
			usage.current = [];
			// current cpu usage
            cpuStat.stat.slice(0,5).map((element, index) => {
                curr.current[index] = element.split(/\s+/).slice(1, 5);
            });

            console.log('curr', curr);
            // 각 cpu 별로 체크
            for(let i=0; i<curr.current.length; i++){
                const tmpCur  = curr.current[i];
                const tmpPrev = prev.current[i];
                let Total = 0;
                let idle;
                //console.log(tmpCur, tmpPrev);
                //console.log(tmpCur[0]);
                for(let j=0; j<tmpCur.length; j++){
                    let pad = tmpCur[j] - tmpPrev[j];
                    Total += pad;
                    if(j === IDLE) idle = pad;
                }
                
                Total = 100;
                idle = 5;
                //console.log('Total', Total)
                //console.log('idle', idle);
                idle = idle + 0.0; // make idle floating point
                usage.current[i] = (1 - idle / Total) * 100;
                setLoading(false);
            }       
			
			//usage.current.push(memoryStat.usable_memory);
            prev.current = curr.current;
            console.log(usage);
        }

        return () => {
            clearInterval(id);
            if (cpuRef.current) {
                cpuRef.current.cancel();
                cpuRef.current = null;
            }

            if (memRef.current) {
                memRef.current.cancel();
                memRef.current = null;
            }
        }
    }, [count, cpuStat, memoryStat]);

    return (
        <div>
            {loading ? <RenderingLoading /> : <RenderingGraph cpuUsage={usage.current} memoryUsage = {[memoryStat.usable_memory, memoryStat.swapUsed]}/>}
        </div>
    );
};

export default SystemState;
