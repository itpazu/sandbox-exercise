import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadButton from './components/upload';
import Results from './components/results';
import SubmitFile from './components/submitFile';
import BreadCrumbs from './components/breadcrumbs';
import ResultsDataTable from './components/table';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';
import chartData from './data_models/summaryModal';
import Mock from './mockResponse.json';
import BoxedItem from './theme/BoxItem';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js/auto';
// Chart.register(ArcElement);
// Chart.register(ChartDataLabels);

function App() {
  const muiTheme = useTheme();
  const dataSet = new chartData(Mock, muiTheme);
  const threatIndices = dataSet.labels.reduce((obj, label) => {
    obj[label] = dataSet.datasets[0].data[dataSet.labels.indexOf(label)];
    return obj;
  }, {});
  const isUndetcted =
    threatIndices['malicious'] + threatIndices['suspicious'] > 0;

  const position = {
    topPosition: '28vh',
    leftPosition: '25vh',
  };

  return (
    <BrowserRouter>
      <BreadCrumbs />
      <Routes>
        <Route path='/' element={<UploadButton />} />
        <Route path='submit' element={<SubmitFile />} />
        <Route
          path='*'
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
        <Route path='send' element={<Results />} />
        <Route path='table' element={<ResultsDataTable />} />
        <Route
          path='/doughnut'
          element={
            <BoxedItem {...position}>
              <Doughnut
                data={dataSet}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: `Scan Summary: Threat ${
                        isUndetcted ? 'Suspicious' : 'Undetected'
                      }`,
                      size: '15px',
                      color: isUndetcted ? 'red' : 'green',
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
            </BoxedItem>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
