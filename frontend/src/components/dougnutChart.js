import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJs } from 'chart.js/auto';
import BoxItem from '../theme/BoxItem';
import { useLocation, useNavigate } from 'react-router-dom';

function DougnutChart() {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state?.chartData);

  useEffect(() => {
    if (!state) navigate('/');
  });
  const isDetected = state?.chartData?.isThreatDetected;
  const position = {
    topPosition: '63%',
    leftPosition: '50%',
    width: '40vw',
    minWidth: '250px',
  };

  return (
    <>
      {!!state?.chartData && (
        <BoxItem {...position}>
          <Doughnut
            data={state?.chartData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: `Scan Summary: Threat ${
                    isDetected ? 'Suspicious' : 'Undetected'
                  }`,
                  size: '15px',
                  color: isDetected ? 'red' : 'green',
                  font: { weight: 'bold', size: '25px' },
                },
                legend: {
                  display: true,
                  position: 'left',
                  align: 'left',
                  labels: {
                    color: 'black',
                    font: { weight: 'bold', size: '12px' },
                  },
                },
              },
            }}
          />
        </BoxItem>
      )}
    </>
  );
}
export default DougnutChart;
