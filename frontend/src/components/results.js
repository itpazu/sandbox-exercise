import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import Counter from './stopwatch';
import { uploadFileToSever, scanFile } from '../api/fetchResults';
import EngineResultModel from '../data_models/fileAnalysisModel';
import { defaultErrorMessage } from '../data_models/helper';
import BoxItem from '../theme/BoxItem';
import CounterContext from '../context/counterContext';

//work with mock
// import data from '../mockResponse.json';
// const rows = EngineResultModel.createTableData(data);

//errors logging on screen, pause timer and remove it to the side
const position = {
  topPosition: '50%',
  leftPosition: '50%',
  fontSize: '30px',
};
const Results = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [fetchError, setFetchError] = useState(null);
  const [start, setStart] = useState(true);
  const [fetchDuration, setFetchDuration] = useState(null);
  const isRendered = useRef(false);
  const timer = useRef(null);

  useEffect(() => {
    // in strict mode useEffect runs twice - the line below prevents duplicated api calls
    // navigate('/table', { state: rows }); // development mock
    if (isRendered.current) return;
    if (!state?.file) {
      navigate('/');
      return;
    }
    handleSubmitFile();
    isRendered.current = !isRendered.current;
    return () => clearTimeout(timer.current);
  });

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  const toggleStart = () => {
    setStart((prevState) => {
      return !prevState;
    });
  };
  const handleSubmitFile = async () => {
    const { file } = state;
    const data = new FormData();
    data.append('file', file, file?.name);
    try {
      const fileId = await uploadFileToSever({ file: data });
      submitScanFile(fileId);
    } catch (err) {
      toggleStart();
      setFetchError({ ...(err.response.data = defaultErrorMessage) });
    }
  };

  const submitScanFile = async ({ id }) => {
    const { status, data } = await scanFile(id);
    if (status === 201) {
      timer.current = setTimeout(() => {
        submitScanFile({ id });
      }, 15000);
      return;
    }
    toggleStart();
    const rows = EngineResultModel.createTableData(data);
    navigate('/table', { state: { rows, fetchDuration } });

    return;
  };

  return (
    <>
      {!!state?.file && (
        <CounterContext.Provider
          value={{
            fetchDuration,
            setFetchDuration,
          }}
        >
          <BoxItem {...position}>
            <Counter
              start={start}
              getFinalTime={(duration) => {
                console.log(duration);
                setFetchDuration(duration);
              }}
            />
            {fetchError && (
              <Alert severity='error'>
                Error {fetchError.type}: {fetchError.message}
              </Alert>
            )}
          </BoxItem>
        </CounterContext.Provider>
      )}
    </>
  );
};
export default Results;
