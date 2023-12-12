import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import {Bar, Doughnut} from 'react-chartjs-2';
// import {faker} from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
};

const labelsForCpu = ['Total Cpu', 'Cpu 0', 'Cpu 1', 'Cpu 2', 'Cpu 3'];
const cpuSegment = ['User', 'Nice', 'System', 'Idle'];
const labelsForMemory = ['Available Memory', 'SwapUsed'];

function RenderingGraph({cpuUsage}) {
    //console.log('usage', resourceUsage);
    return (
		<div className="flex" style={{ height: '50vh', display: 'flex', flexWrap: 'wrap' }}>
		  {cpuUsage.map((chartData, index) => (
			<div
			  key={index}
			  style={{
				width: index===0 ? '150px' : '100px',
				height: index===0 ? '150px' : '100px',
				margin: '10px',
				flex: index === 0 ? '0 0 66%' : '0 0 33%',
				marginTop: index===0 ? '50px' : '15px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center', // 가운데 정렬을 위해 추가
				justifyContent: index === 0 ? 'center' : 'flex-start', // index가 0일 때만 화면 가운데 정렬
			  }}
			>
			  <Doughnut
				data={{
				  labels: cpuSegment,
				  datasets: [
					{
					  data: chartData,
					  backgroundColor: ['yellow', 'blue', 'green', 'red'],
					},
				  ],
				}}
				options={chartOptions}
			  />
			  <h6 style={{ fontSize: '20px', fontWeight: 'bold' }}>{labelsForCpu[index]}</h6>
			</div>
		  ))}
		</div>
	  );
};

export default RenderingGraph;

