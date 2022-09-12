import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadButton from './components/upload';
import ResultsFetcher from './components/resultsFetcher';
import SubmitFile from './components/submitFile';
import BreadCrumbs from './components/breadcrumbs';
import ResultsDataTable from './components/table';
import DougnutChart from './components/dougnutChart';
import ResultsParent from './components/resultsParent';
import EmailRequest from './components/emailRequest';

function App() {
  return (
    <BrowserRouter>
      <BreadCrumbs />
      <Routes>
        <Route path='/' element={<UploadButton />} />
        <Route path='submit' element={<SubmitFile />} />
        <Route
          path='*'
          element={
            <main style={{ padding: '2rem' }}>
              <p>Page does not exist...</p>
            </main>
          }
        />
        <Route path='send' element={<ResultsFetcher />} />
        <Route path='results' element={<ResultsParent />}>
          <Route index element={<DougnutChart />} />
          <Route path='table' element={<ResultsDataTable />} />
          <Route path='doughnut' element={<DougnutChart />} />
          <Route path='email' element={<EmailRequest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
