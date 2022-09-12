import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import FileUpload from './uploadedFile';
import { useLocation, useNavigate } from 'react-router-dom';
import BoxItem from '../theme/BoxItem';

export default function SubmitFile() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.file) navigate('/');
  });

  const handleDelete = () => {
    state.file = null;
    navigate(-1);
  };
  return (
    <BoxItem topPosition={'50%'} leftPosition={'50%'}>
      <Stack direction='column' spacing={2}>
        <Grid align='center'>
          {state.file && (
            <FileUpload file={state.file} handleDelete={handleDelete} />
          )}
        </Grid>
        <Grid sx={{ width: 'auto' }} align='center'>
          <Button
            variant='contained'
            component='label'
            onClick={() => {
              navigate('/send', { state });
            }}
          >
            Submit file
          </Button>
        </Grid>
      </Stack>
    </BoxItem>
  );
}
