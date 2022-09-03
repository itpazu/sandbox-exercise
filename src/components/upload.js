import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FileUpload from './uploadedFile';

export default function UploadButtons() {
  const [uploaded, setUploaded] = useState('');

  const handleUploaded = ({ target: { files } }) => {
    const [file] = files;
    setUploaded(file.name);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Stack direction='column' spacing={2}>
        <FileUpload file={uploaded} />
        <Button variant='contained' component='label'>
          Upload
          <input
            hidden
            accept='*/*'
            multiple
            type='file'
            onInput={handleUploaded}
          />
        </Button>
      </Stack>
    </Box>
  );
}
