import { Helmet } from 'react-helmet-async';
import React, { useState } from 'react';
import Files from '../components/filesLibary/Files.jsx';
import FilesDashboard from '../components/filesLibary/FilesDashboard.jsx';


// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Paper, Card, CardContent } from '@mui/material';
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
            {/*Hi, Welcome back*/}
            Xin Chào Bình Bụng Bự
          </Typography>
          <FilesDashboard />

        </Container>
      </FilesStateProvider>

    </>
  );
}
