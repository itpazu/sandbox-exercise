import React, { useState } from 'react';
import './App.css';
import UploadButton from './components/upload';
import Button from '@mui/material/Button';
import Counter from './components/stopwatch';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BreadCrumbs from './components/breadcrumbs';
import BoxItem from './components/BoxItem';

function App() {
  const [start, setStart] = useState(true);
  return (
    <BrowserRouter>
      <BoxItem topPosition={'25%'} leftPosition={'50%'}>
        <BreadCrumbs />
      </BoxItem>
      <BoxItem topPosition={'50%'} leftPosition={'50%'}>
        <Routes>
          <Route path='/' element={<UploadButton />} />
          <Route path='counter' element={<Counter start={start} />} />
          <Route
            path='*'
            element={
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
        <Button onClick={() => setStart(false)}>stop</Button>
      </BoxItem>
    </BrowserRouter>
  );
}

export default App;
