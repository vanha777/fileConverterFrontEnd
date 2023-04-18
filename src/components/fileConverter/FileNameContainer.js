import React from 'react';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Stack, Typography, Button, TextField, Box, IconButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PictureAsPdfSharpIcon from '@mui/icons-material/PictureAsPdfSharp';
import CloudSyncSharpIcon from '@mui/icons-material/CloudSyncSharp';

function FileNameDisplay({ name}/*loading*/) {
  const [loading,setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false)
  }, 3000);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Typography sx={{ m: 1 }}>{name}</Typography>
        {loading === true ? (
          <CircularProgress sx={{ m: 1 }} color="secondary" size={30} thickness={2} />
        ) : (
          <CheckCircleIcon sx={{ color: 'green', fontSize: 30 }} />

        )}
      </Box>
    </Box>
  );
}

export default function FileNameContainer({ fileName }) {
  if (fileName.length === 0) {
    return (
      <div sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography>{/*No Files Selected*/}Không Tìm Thấy File</Typography>
      </div>
    );
  }

  const fileNames = fileName.flat();

  

  const fileNamesToDisplay = fileNames.map((file) => {
    return <FileNameDisplay key={file.name} name={file.name} /*loading={file.loading}*/ />;
  });

  return <div>{fileNamesToDisplay}</div>;
}

FileNameContainer.propTypes = {
  fileName: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    loading: PropTypes.number.isRequired
  }))).isRequired
};  
