import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Alert } from '@mui/material';
import CounterUi from './counterUi';
import { uploadFileToSever, scanFile } from '../api/fetchResults';
import EngineResultModel from '../data_models/fileAnalysisModel';
import { defaultErrorMessage } from '../data_models/helper';
import BoxItem from '../theme/BoxItem';
import useCounter from '../hooks/useCounter';
import ChartData from '../data_models/summaryModal';

//work with mock
// import Mockdata from '../mockResponse.json';

//errors logging on screen, pause timer and remove it to the side
const position = {
  topPosition: '50%',
  leftPosition: '50%',
  fontSize: '30px',
};
const Results = () => {
  const [timePassed, toggleStart] = useCounter(true);
  const navigate = useNavigate();
  const { state } = useLocation();
  const muiTheme = useTheme();
  const [fetchError, setFetchError] = useState(null);
  const [rows, setRows] = useState(null);
  const [chartData, setChartData] = useState(null);
  const isRendered = useRef(false);
  const timer = useRef(null);

  useEffect(() => {
    if (rows) {
      const {
        file: { name, size, type },
      } = state;
      navigate('/results', {
        state: { timePassed, rows, chartData, name, size, type },
      });
      return;
    }
    // in strict mode useEffect runs twice - the line below prevents duplicated api calls
    if (isRendered.current) return;
    //navigate upon update of rows
    //prevents direct access to /send
    if (!state?.file) {
      navigate('/');
      return;
    }
    handleSubmitFile();
    isRendered.current = !isRendered.current;
    //clears timer when unmounting
    return () => clearTimeout(timer.current);
  });

  const handleSubmitFile = async () => {
    const { file } = state;
    const data = new FormData();
    data.append('file', file, file?.name);
    try {
      //comment out to mock
      const fileId = await uploadFileToSever({ file: data });
      // const fileId = await new Promise((r) => setTimeout(() => r('123'), 2000)); //mock
      submitScanFile(fileId);
    } catch (err) {
      toggleStart();
      setFetchError({ ...(err.response.data = defaultErrorMessage) });
    }
  };

  const submitScanFile = async ({ id }) => {
    //uncomment real serever --
    const { status, data } = await scanFile(id);
    if (status === 201) {
      timer.current = setTimeout(() => {
        submitScanFile({ id });
      }, 15000);
      return;
    }
    // -- uncommnet
    toggleStart();
    //--mock
    // const data = await new Promise((r) => setTimeout(() => r(Mockdata), 2000));
    // mock --
    const rows = EngineResultModel.createTableData(data);
    const dataSet = new ChartData(data, muiTheme);

    setRows(rows);
    setChartData(dataSet);
  };

  return (
    <>
      {!!state?.file && (
        <BoxItem {...position}>
          <CounterUi timePassed={timePassed} toggleStart={toggleStart} />
          {fetchError && (
            <Alert severity='error'>
              Error {fetchError.type}: {fetchError.message}
            </Alert>
          )}
        </BoxItem>
      )}
    </>
  );
};
export default Results;
