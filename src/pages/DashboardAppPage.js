import { Helmet } from 'react-helmet-async';
import React, { useState } from 'react';
import FilesDashboard from '../components/filesLibary/FilesDashboard.jsx';


// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Typography,  } from '@mui/material';
import { FilesStateProvider } from '../utils/filesState.jsx';

// components

// sections


// ----------------------------------------------------------------------

export default function DashboardAppPage(props) {
  const theme = useTheme();



  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>
      <FilesStateProvider>
        <Container maxWidth="xl">


          <Typography variant="h4" sx={{ mb: 5 }}>
          Unleash Your Files: Free Storage for All!
          </Typography>
          <Typography variant="p1" sx={{ mb: 5 }}>
          "Welcome to our public storage community - please be mindful of sensitive files and delete them once no longer needed."
          </Typography>
          <FilesDashboard />
        </Container>
      </FilesStateProvider>

    </>
  );
}
