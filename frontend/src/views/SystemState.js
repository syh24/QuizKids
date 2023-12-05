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

let usage = [];

const SystemState = () => {
    const cpuRef = useRef(null);
    const memRef = useRef(null);
    
    const [loading, setLoading] = useState(true); // 사용량 알 수 있을 때까지 1초 기다린 뒤, true로 set 됨

    const [count, setCount] = useState(0);

    const cpuStat = useRef({stat: [], returnValue: false});
    const memStat = useRef({returnValue : false});
    const prev = useRef([]);
    const curr = useRef([]);
    const saveCnt = useRef(0);

    useEffect(() => {
        // 설정된 시간 간격마다 setInterval 콜백이 실행된다. 
        const id = setInterval(() => {
            // 타이머 숫자가 하나씩 줄어들도록
            setCount((current) => current + 1);
            saveCnt.current = saveCnt.current+1;

            if (!cpuRef.current) {
                //debugLog('GET_CONFIGS[R]', {});
                cpuRef.current = getCpuInfo({
                    parameters: {
                        subscribe: true,
                    },
                    onSuccess: res => {
                        //setCpuStat(res);
                        //test_cpu = res;
                        cpuStat.current = res;
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
                        //setMemoryStat(res);
                        //test_mem = res;
                        memStat.current = res;
                    },
                    onFailure: err => {
                        debugLog('GET_CONFIGS[F]', err);
                    }
                });
            }

            console.log(saveCnt.current);
            //console.log('cpu', cpuStat.current.stat);
            //console.log('mem', memStat.current.returnValue);

            //prev 계산
            if(saveCnt.current === 1){
                cpuStat.current.stat.slice(0,5).map((element, index) => {
                    prev.current[index] = element.split(/\s+/).slice(1, 5);
                }); 
                console.log('prev', prev);
            }

            else{
                usage = [];

                cpuStat.current.stat.slice(0,5).map((element, index) => {
                    curr.current[index] = element.split(/\s+/).slice(1, 5);
                });

                console.log('curr', curr);
                
                // 모든 cpu의 usage를 계산.
                for(let i=0; i<curr.current.length; i++){
                    const tmpCur = curr.current[i];
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

                    //Total = 100;    // dummy

                    idle = idle + 0.0; //+ Math.min(saveCnt.current, 99); // make idle floating point
                    console.log('idle', idle);
                    usage[i] = (1 - idle / Total) * 100;
                    //console.log(`usage ${i}`, usage.current[i]);
                }       

                console.log('usage', usage);
                if(saveCnt.current === 2) setLoading(false);
                prev.current = curr.current; 
            }
        }, 1000);

        return () => {
            clearInterval(id); // 자원 낭비 방지
            // check
            if (cpuRef.current) {
                cpuRef.current.cancel(); 
                cpuRef.current = null;
            }

            if (memRef.current) {
                memRef.current.cancel();
                memRef.current = null;
            }
        }
    }, [count]);

    //console.log(cpuStat);
    return (
        <div>
            {loading ? <RenderingLoading /> : <RenderingGraph cpuUsage={usage} memoryUsage = {[memStat.current.usable_memory, memStat.current.swapUsed]}/>}
        </div>
    );
};

export default SystemState;
