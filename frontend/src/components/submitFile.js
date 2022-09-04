import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import FileUpload from './uploadedFile';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SubmitFile({ toggleStart }) {
  const [uploaded, setUploaded] = useState(null);
  const { state } = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    setUploaded(state?.file);
  }, [state]);

  const handleDelete = () => {
    setUploaded(null);
    navigate(-1);
  };
  return (
    <Stack direction='column' spacing={4}>
      {uploaded && <FileUpload file={uploaded} handleDelete={handleDelete} />}
      <Grid sx={{ width: 'auto' }} align='center'>
        <Button
          variant='contained'
          component='label'
          sx={{ width: 'auto' }}
          onClick={() => {
            toggleStart(true);
            navigate('/send');
          }}
        >
          Submit file
        </Button>
      </Grid>
    </Stack>
  );
}
