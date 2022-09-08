import React, { useEffect, useRef, useState } from 'react';
import Counter from './stopwatch';
import { useLocation, useNavigate } from 'react-router-dom';
import { uploadFileToSever, scanFile } from '../api/fetchResults';
import EngineResultModel from '../data_models/fileAnalysisModel';
import Alert from '@mui/material/Alert';
import BoxItem from '../theme/BoxItem';

//work with mock
import data from '../mockResponse.json';
const rows = EngineResultModel.createTableData(data);

//errors logging on screen, pause timer and remove it to the side

const defaultErrorMessage = { type: '500', message: 'serverFailed' };

const Results = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [fetchError, setFetchError] = useState(null);
  const isRendered = useRef(false);
  const timer = useRef(null);
  const [start, setStart] = useState(true);

  useEffect(() => {
    console.log(rows);
    // in strict mode useEffect runs twice - the line below prevents duplicated api calls
    navigate('/table', { state: rows }); // development mock
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
    navigate('/table', { state: rows });

    return;
  };
  // <BoxItem
  //   topPosition={position.topPosition}
  //   leftPosition={position.leftPosition}
  // ></BoxItem>;
  return (
    <>
      {!!state?.file && (
        <BoxItem>
          <Counter start={start} toggleStart={toggleStart} />
          {fetchError && (
            <Alert severity='error'>
              {' '}
              Error {fetchError.type}: {fetchError.message}
            </Alert>
          )}
        </BoxItem>
      )}
    </>
  );
};
export default Results;
