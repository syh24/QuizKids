import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
// import {faker} from '@faker-js/faker';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const optionsForCpu = {
	responsive: true,
	scales: {
		y: {
			max: 100 // y축의 최대값을 100으로 설정
		}
	},
	plugins: {
		legend: {
			position: 'top'
		},
		title: {
			display: true
			//text: 'System Resource Usage',
		}
	}
};

const optionsForMemory = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top'
		},
		title: {
			display: true
		}
	}
};

const labelsForCpu = ['Total Cpu', 'Cpu0', 'Cpu1', 'Cpu2', 'Cpu3'];
const labelsForMemory = ['Available Memory', 'SwapUsed'];

function RenderingGraph({cpuUsage, memoryUsage}) {
	//console.log('usage', resourceUsage);
	const dataForCpu = {
		labels: labelsForCpu,
		datasets: [
			{
				label: 'CpuUsage(%)',
				data: labelsForCpu.map((elem, index) => cpuUsage[index]),
				backgroundColor: 'rgba(255, 215, 0, 0.7)'
			}
		]
	};

	const data = {
		labels: labelsForMemory,
		datasets: [
			{
				label: 'Memory Usage(K)',
				data: labelsForMemory.map((elem, index) => memoryUsage[index]),
				backgroundColor: 'rgba(255, 127, 0, 0.7)'
			}
		]
	};

	return (
		<div className="flex flex-col w-full h-full ml-10">
			<div className="flex flex-col items-center justify-center sm:w-1/2 p-4 h-auto w-auto">
				<Bar options={optionsForCpu} data={dataForCpu} />
			</div>
			<div className="flex flex-col items-center justify-center sm:w-1/2 p-4 h-auto w-auto">
				<Bar options={optionsForMemory} data={data} />
			</div>
		</div>
	);
}

export default RenderingGraph;
