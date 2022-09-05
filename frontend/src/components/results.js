import React, { useEffect, useRef } from 'react';
import Counter from './stopwatch';
import { useLocation } from 'react-router-dom';
import { uploadFileToSever, scanFile } from '../api/fetchResults';

const Results = ({ start, toggleStart }) => {
  const { state } = useLocation();
  console.log(useLocation());
  const isRendered = useRef(false);
  const timer = useRef(null);

  useEffect(() => {
    //todo - redirect to file upload
    // in strict mode useEffect runs twice - the line below prevents duplicated api calls
    if (isRendered.current) return;
    handleSubmitFile();
    isRendered.current = true;
    return () => clearTimeout(timer.current);
  });

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  const handleSubmitFile = async () => {
    const { file } = state ?? {}; // can remove after handling redirect
    const data = new FormData();
    data.append('file', file, file?.name);
    try {
      const fileId = await uploadFileToSever({ file: data });
      submitScanFile(fileId);
    } catch (err) {
      console.log('logging error', err);
    }
  };

  const submitScanFile = async ({ id }) => {
    const { status, data } = await scanFile(id);
    if (status === 201) {
      console.log(id);
      timer.current = setTimeout(() => {
        submitScanFile({ id });
      }, 15000);
      return;
    }
    //call function to present data
    console.log('data==>', data);
    return data;
  };

  return <Counter start={start} toggleStart={toggleStart} />;
};
export default Results;
