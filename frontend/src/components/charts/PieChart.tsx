import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface PieChartProps {
  series: number[];
  labels: string[];
  title: string;
}

const PieChart: React.FC<PieChartProps> = ({ series, labels, title }) => {
  const options: ApexOptions = {
    colors: ['#3C50E0', '#80CAEE', '#FF4560', '#00E396', '#FEB019'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'pie',
      height: 335,
    },
    labels: labels,
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',
      markers: {
        radius: 99,
      },
    },
    responsive: [
      {
        breakpoint: 1536,
        options: {
          chart: {
            width: 380,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options}
            series={series}
            type="pie"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default PieChart;