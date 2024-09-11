import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import "./Piechart.css";

// Register the necessary components for Chart.js and the data labels plugin
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ChartDataLabels);

const BarChart = () => {
  // Sample data
  const data = {
    labels: ['BSCIT', 'BSC CS', 'MCA', 'BBA', 'MBA', 'BSC CT'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: ['#6705AD', '#F339D5', '#C339F3', '#F33966', '#F99420'],
        barThickness: 35,
        color:"black",
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Student Progress Data',
      },
      datalabels: {
        color: '#000', // Color of the labels
        display: true, // Display the labels
        anchor: 'end', // Position the labels at the end of the bars
        align: 'end', // Align the labels at the end of the bars
        formatter: (value) => value, // Format the labels to show the value
        font: {
          weight: 'bold', // Font weight of the labels
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Department',
          font: {
            weight: 'bold', // Font weight of the labels
          },
          color:'#6705AD', // Label for the x-axis
        },
        grid: {
          display: false, // Remove grid lines on the x-axis
        },
      },
      y: {
        grid: {
          display: false, // Remove grid lines on the y-axis
        },
      },
    },
  };

  return(
    <div className='barchartpart mx-2'>
<Bar data={data} options={options} style={{ maxWidth: '600px', maxHeight: '800px' }} />
</div>
  ) 
};

export default BarChart;
