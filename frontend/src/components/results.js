import React, { useEffect, useRef, useState } from 'react';
import Counter from './stopwatch';
import { useLocation } from 'react-router-dom';
import { uploadFileToSever, scanFile } from '../api/fetchResults';
import ResultsDataTable from './table';
import EngineResultModel from '../models/fileAnalysisModel';
import Alert from '@mui/material/Alert';

//work with mock
// import data from '../mockResponse.json';
// const rows = EngineResultModel.createTableData(data);
//errors logging on screen, pause timer and remove it to the side

const Results = () => {
  const { state } = useLocation();
  const [fileScanResults, setFileScanResults] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const isRendered = useRef(false);
  const timer = useRef(null);
  const [start, setStart] = useState(true);

  useEffect(() => {
    //todo - redirect to file upload for direact access to the url
    // in strict mode useEffect runs twice - the line below prevents duplicated api calls
    if (isRendered.current) return;
    handleSubmitFile();
    isRendered.current = true;
    return () => clearTimeout(timer.current);
  });

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  const toggleStart = (bool) => {
    setStart(bool);
  };
  const handleSubmitFile = async () => {
    const { file } = state ?? {}; // can remove after handling redirect
    const data = new FormData();
    data.append('file', file, file?.name);
    try {
      const fileId = await uploadFileToSever({ file: data });
      submitScanFile(fileId);
    } catch (err) {
      // if(err.statusCode)
      setFetchError(err.response.data);
    }
  };

  const submitScanFile = async ({ id }) => {
    try {
      const { status, data } = await scanFile(id);
      if (status === 201) {
        timer.current = setTimeout(() => {
          submitScanFile({ id });
        }, 15000);
        return;
      }
      toggleStart(false);
      const modeledData = EngineResultModel.createTableData(data);
      setFileScanResults(modeledData);
      return;
    } catch (err) {
      setFetchError(err.response.data);
    }
  };

  return (
    <>
      <ResultsDataTable rows={fileScanResults} />
      <Counter start={start} toggleStart={toggleStart} />
      {fetchError && (
        <Alert severity='error'>Error: {fetchError.message}</Alert>
      )}
    </>
  );
};
export default Results;
