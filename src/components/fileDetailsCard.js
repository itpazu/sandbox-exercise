import React from 'react';
import { Card, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';

export default function FileDetailsCard({ fileSize, fileName }) {
  const fileSizekB = `${Math.floor(fileSize * 0.001)} KB`;
  const formattedName = fileName.split('.')[0];
  const formattedType = fileName.split('.')[1];

  return (
    <Card
      sx={{
        width: 'fit-content',
        maxWidth: 500,
        ml: 2,
        textAlign: 'center',
        mt: 1,
        '@media screen and (max-width: 1460px)': {
          maxWidth: '20%',
        },
        '@media screen and (max-width: 1045px)': {
          maxWidth: '15%',
        },
        '@media screen and (max-width: 550px)': {
          display: 'none',
        },
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          component='div'
          color='text.secondary'
          gutterBottom
        >
          File Name: {formattedName} [{formattedType}, {fileSizekB}]
        </Typography>
      </CardContent>
    </Card>
  );
}
