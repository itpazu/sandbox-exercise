import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import validate from 'validate.js';
import { TextField, Button, Stack, Alert } from '@mui/material';
import BoxItem from '../theme/BoxItem';
import { sendEmailToUser } from '../api/fetchResults';

const EmailRequest = () => {
  const location = useLocation();
  const [formState, setFormState] = useState({
    email: null,
    isValid: false,
    errors: [],
    touched: false,
  });

  const [disabledButton, toggleDisabledButton] = useState(false);
  const [sendResults, setSendResults] = useState({ showAlert: false });
  const { state } = location;

  useEffect(() => {
    const errors = validate.single(formState.email, {
      presence: { allowEmpty: false },
      email: true,
    });

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || [],
    }));
  }, [formState.email]);

  const handleChange = (event) => {
    event.persist();
    const { target } = event;
    setFormState((formState) => ({
      ...formState,
      [target.name]: target.value,
      touched: true,
    }));
  };
  const handleSubmit = async () => {
    const { email: emailAddress } = formState;

    setSendResults((prev) => ({ ...prev, showAlert: false }));
    let fetchResults;
    toggleDisabledButton((disabledButton) => !disabledButton);
    try {
      if (!formState.isValid) {
        throw new Error(formState.errors[0]);
      }
      setFormState({
        isValid: true,

        email: emailAddress,
        touched: false,
        errors: [],
      });
      const results = await sendEmailToUser({ ...state, emailAddress });

      fetchResults = {
        showAlert: true,
        message: results.data.message,
        type: 'success',
      };
    } catch (error) {
      fetchResults = {
        showAlert: true,
        message: error.response
          ? error.response.data.message + ' ' + error.response.data.type
          : error?.message || 'something went wrong...',
        type: 'error',
      };
    }
    toggleDisabledButton(false);
    setSendResults(fetchResults);
  };
  const hasError = () => (formState.touched && formState.errors ? true : false);
  return (
    <>
      <BoxItem leftPosition={'50vw'} topPosition={'45vh'} width={'40vw'}>
        <Stack>
          <TextField
            onChange={handleChange}
            error={hasError('email')}
            helperText={hasError('email') ? formState.errors[0] : null}
            fullWidth
            label='Email address'
            id='fullWidth'
            name='email'
            value={formState.email || ''}
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
