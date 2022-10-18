import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
// eslint-disable-next-line
import { Chart as ChartJs } from 'chart.js/auto';
import BoxItem from '../theme/BoxItem';
import { useLocation, useNavigate } from 'react-router-dom';

function DougnutChart() {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) navigate('/');
  });
  const isDetected = state?.chartData?.isThreatDetected;
  const position = {
    leftPosition: 'clamp(200px, 50%, 1200px)',
    topPosition: 'clamp(250px, 60vh,  700px)',
    minWidth: '250px',
  };
  return (
    <>
      {!!state?.chartData && (
        <BoxItem {...position}>
          <div
            style={{
              position: 'relative',
              margin: 'auto',
              height: '62vh',
              width: '50vw',
              minHeight: '280px',
              maxHeight: '500px',
              minWidth: '330px',
            }}
          >
            <Doughnut
              data={state?.chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,

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
          </div>
        </BoxItem>
      )}
    </>
  );
}
export default DougnutChart;
