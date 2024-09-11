// import React from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
// import "./Piechart.css";

// // Register the necessary components for Chart.js
// ChartJS.register(ArcElement, Tooltip, Legend, Title);

// const DoughnutChart = () => {
//   // Sample data
//   const data = {
//     labels: ['BSC IT', 'BSC CS', 'BBA', 'MCA', 'MBA', 'BCOM CA'],
//     datasets: [
//       {
//         label: 'Dataset',
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: [
//           '#FF6384',
//           '#36A2EB',
//           '#FFCE56',
//           '#4BC0C0',
//           '#9966FF',
//           '#FF9F40'
//         ],
//         borderColor: [
//           '#FF6384',
//           '#36A2EB',
//           '#FFCE56',
//           '#4BC0C0',
//           '#9966FF',
//           '#FF9F40'
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Options for the chart
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Doughnut Chart Example',
//       },
//     },
//   };

//   return (
//     <div className='chart-container'>
//  <Doughnut data={data} options={options} />
//     </div>
 
//   );
// };

// export default DoughnutChart;


import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import './Piechart.css'; // Import the CSS file

// Register the necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = () => {
  // Sample data
  const data = {
    labels: ['BBA', 'BSC IT', 'BCOM', 'MBA', 'MSC CS', 'BSC CS'],
    datasets: [
      {
        label: 'Dataset',
        data: [12, 17, 3, 5, 2, 3],
        backgroundColor: [
          '#F33966',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        borderColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        borderWidth: 1,
        color:"black",
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 20, // Set box width for legend items
          padding: 20, // Set padding between legend items
        },
      },
      title: {
        display: true,
        text: 'Course Progress',
        color:"black",

      },
    },
  };

  return <div className="chart-container"><Doughnut data={data} options={options} /></div>
};

export default DoughnutChart;
