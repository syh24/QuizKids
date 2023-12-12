import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
      barThickness: 5,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
    },
  },
};

const labelsForMemory = ['Available Memory', 'SwapUsed'];

const RenderingMemoryGraph = ({memoryUsage}) => {
    const data = {
        labels: labelsForMemory,
        datasets: [
            {
                label: 'Memory Usage',
                data: labelsForMemory.map((elem, index) => memoryUsage[index]),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <div className="h-auto ml-10 mt-9" style={{ width: '50%' }}>
            <Bar options={options} data={data} />
        </div>
    );
}

export default RenderingMemoryGraph;
