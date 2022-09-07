import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import DriveFolderUploadSharpIcon from '@mui/icons-material/DriveFolderUploadSharp';

export default function UploadButtons() {
  const navigate = useNavigate();

  const handleUploaded = ({ target: { files } }) => {
    const [file] = files;
    navigate('/submit', { state: { file } });
  };

  return (
    <Grid container direction='column'>
      <Grid
        sx={{
          width: 'auto',
          justifyContent: 'center',
        }}
        align='center'
      >
        <DriveFolderUploadSharpIcon sx={{ fontSize: 90 }} color='primary' />
      </Grid>
      <Grid sx={{ width: 'auto' }}>
        <Button variant='outlined' component='label'>
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
    </Grid>
  );
}
