import React from 'react';
import { Card, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';

export default function FileDetailsCard({ fileSize, fileName, rows }) {
  const fileSizekB = `${Math.floor(fileSize * 0.001)} KB`;
  const formattedName = fileName.split('.')[0];
  const formattedType = fileName.split('.')[1];

  return (
    <Card
      sx={{
        minWidth: 250,
        maxWidth: 500,
        ml: 2,
        textAlign: 'center',
        mt: 1,
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
