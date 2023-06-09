import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function FileNameDisplay({ name }/*loading*/) {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false)
  }, 3000);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', width: '100%' }}>
        {loading === true ? (
          <CircularProgress sx={{ m: 1 }} color="secondary" size={30} thickness={2} />
        ) : (
          <CheckCircleIcon sx={{ color: 'green', fontSize: 30 }} />
        )}
        <Typography sx={{ m: 1 }}>{name}</Typography>
      </Box>
    </Box>
  );
}

export default function FileNameContainer({ fileName }) {
  if (fileName.length === 0) {
    return (
      <div sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography>No Files Selected</Typography>
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
