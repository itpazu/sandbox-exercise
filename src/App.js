import React, { useState } from 'react';
import './App.css';
import UploadButton from './components/upload';
import Results from './components/results';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BreadCrumbs from './components/breadcrumbs';
import BoxItem from './theme/BoxItem';
import SubmitFile from './components/submitFile';

function App() {
  const [start, setStart] = useState(true);

  const toggleStart = (bool) => {
    setStart(bool);
  };
  return (
    <BrowserRouter>
      <BoxItem topPosition={'15%'} leftPosition={'50%'}>
        <BreadCrumbs />
      </BoxItem>
      <BoxItem topPosition={'50%'} leftPosition={'50%'}>
        <Routes>
          <Route path='/' element={<UploadButton />} />
          <Route
            path='submit'
            element={<SubmitFile toggleStart={toggleStart} />}
          />
          <Route
            path='send'
            element={<Results start={start} toggleStart={toggleStart} />}
          />
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
