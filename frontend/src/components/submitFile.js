import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import FileUpload from './uploadedFile';

export default function UploadButtons() {
  const [uploaded, setUploaded] = useState(null);

  const handleUploaded = ({ target: { files } }) => {
    const [file] = files;
    setUploaded(file);
  };

  const handleDelete = () => {
    setUploaded(null);
  };
  return (
    <Stack direction='column' spacing={4}>
      <FileUpload file={uploaded} handleDelete={handleDelete} />
      <Grid sx={{ width: 'auto' }} align='center'>
        <Button variant='contained' component='label' sx={{ width: 'auto' }}>
          Submit file
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
