import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Stack, Alert } from '@mui/material';
import BoxItem from '../theme/BoxItem';
import { sendEmailToUser } from '../api/fetchResults';

const EmailRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState('');
  const [disabledButton, toggleDisabledButton] = useState(false);
  const [sendResults, setSendResults] = useState({ showAlert: false });

  if (!location.state) navigate('/');
  const { state } = location;

  const handleSubmit = async () => {
    setSendResults((prev) => ({ ...prev, showAlert: false }));

    let fetchResults;
    try {
      toggleDisabledButton((disabledButton) => !disabledButton);
      const results = await sendEmailToUser({ ...state, input });

      fetchResults = {
        showAlert: true,
        message: results.message,
        type: 'success',
      };
    } catch (error) {
      fetchResults = {
        showAlert: true,
        message: error.response.data.message + ' ' + error.response.data.type,
        type: 'error',
      };
    }
    setSendResults(fetchResults);
    toggleDisabledButton((prev) => !prev);
  };
  return (
    <>
      <BoxItem leftPosition={'50vw'} topPosition={'45vh'} width={'40vw'}>
        <Stack>
          <TextField
            onChange={({ target: { value } }) => setInput(value)}
            fullWidth
            label='Email address'
            id='fullWidth'
          />
          <Button disabled={disabledButton} onClick={handleSubmit}>
            SEND EMAIL
          </Button>
          {sendResults.showAlert && (
            <Alert severity={sendResults.type}>{sendResults.message}</Alert>
          )}
        </Stack>
      </BoxItem>
    </>
  );
};

export default EmailRequest;
