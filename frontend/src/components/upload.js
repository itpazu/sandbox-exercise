import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import DriveFolderUploadSharpIcon from '@mui/icons-material/DriveFolderUploadSharp';
import BoxItem from '../theme/BoxItem';

export default function UploadButtons() {
  const navigate = useNavigate();

  const handleUploaded = ({ target: { files } }) => {
    const [file] = files;
    navigate('/submit', { state: { file } });
  };

  return (
    <BoxItem>
      <Grid container direction='column'>
        <Grid
          sx={{
            width: 'auto',
          }}
          align='center'
        >
          <DriveFolderUploadSharpIcon sx={{ fontSize: 90 }} color='primary' />
        </Grid>
        <Grid sx={{ width: 'auto' }} align='center'>
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
    </BoxItem>
  );
}
