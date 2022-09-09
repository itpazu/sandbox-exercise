import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadButton from './components/upload';
import Results from './components/results';
import SubmitFile from './components/submitFile';
import BreadCrumbs from './components/breadcrumbs';
import ResultsDataTable from './components/table';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { useTheme } from '@mui/material/styles';
import chartData from './data_models/summaryModal';
import Mock from './mockResponse.json';
import BoxedItem from './theme/BoxItem';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ArcElement);
Chart.register(ChartDataLabels);

function App() {
  const muiTheme = useTheme();
  const dataSet = new chartData(Mock, muiTheme);
  console.log(dataSet);
  const position = {
    topPosition: '50%',
    leftPosition: '50%',
    fontSize: '30px',
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
              <Doughnut data={dataSet} />
            </BoxedItem>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
