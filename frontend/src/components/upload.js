import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

export default function UploadButtons() {
  const navigate = useNavigate();

  const handleUploaded = ({ target: { files } }) => {
    const [file] = files;
    navigate('/submit', { state: { file } });
  };

  return (
    <Stack direction='column' spacing={4}>
      <Grid sx={{ width: 'auto' }} align='center'>
        <Button variant='outlined' component='label' sx={{ width: 'auto' }}>
          Upload File
          <input
            hidden
            accept='*/*'
            multiple
            type='file'
            onInput={handleUploaded}
          />
        </Button>
      </Grid>
    </Stack>
  );
}
