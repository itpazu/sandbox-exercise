import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadButton from './components/upload';
import Results from './components/results';
import SubmitFile from './components/submitFile';
import BreadCrumbs from './components/breadcrumbs';
import ResultsDataTable from './components/table';

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
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
        <Route path='send' element={<Results />} />
        <Route path='table' element={<ResultsDataTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
