import React from 'react';
import './App.css';
import UploadButton from './components/upload';
import Counter from './components/stopwatch';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BreadCrumbs from './components/breadcrumbs';
import BoxItem from './components/BoxItem';
import SubmitFile from './components/submitFile';

function App() {
  return (
    <BrowserRouter>
      <BoxItem topPosition={'25%'} leftPosition={'50%'}>
        <BreadCrumbs />
      </BoxItem>
      <BoxItem topPosition={'50%'} leftPosition={'50%'}>
        <Routes>
          <Route path='/' element={<UploadButton />} />
          <Route path='submit' element={<SubmitFile />} />
          <Route path='results' element={<Counter />} />
          <Route
            path='*'
            element={
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BoxItem>
    </BrowserRouter>
  );
}

export default App;
