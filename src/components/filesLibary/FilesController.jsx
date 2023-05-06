import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@mui/material/IconButton';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/GetApp';
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@mui/material/Box';
import { grey, pink } from '@mui/material/colors';
import { useFilesState } from '../../utils/filesState.jsx';

const FileControlCard = () => {
    const { filesSelected, updateFilesSelected } = useFilesState();
    const { filesState, updateFilesState } = useFilesState();


    const handleFileNameChange = () => {
        // TODO: Implement file name change logic
    };

    const handleFileDownload = () => {
        // TODO: Implement file download logic
    };

    const handleFileShare = () => {
        // TODO: Implement file share logic
    };

    const handleFileDelete = () => {
        // TODO: Implement file delete logic
    };

    return (


        <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
            <Box sx={{ margin: '16px', display: 'flex', flexDirection: 'row' }}>
                {filesSelected.length > 0
                    ? (<PhotoLibraryIcon color="primary" />)
                    : (<ImageNotSupportedIcon />)
                }
                <Typography variant="h7" component="p">
                    {filesSelected.length} selected
                </Typography>
            </Box>

            <Box>
                <IconButton onClick={() => handleFileNameChange()}>
                    <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => handleFileDownload()}>
                    <DownloadIcon style={{ color: '#8BC34A' }} />
                </IconButton>
                <IconButton onClick={() => handleFileShare()}>
                    <ShareIcon color="secondary" />
                </IconButton>
                <IconButton onClick={() => handleFileDelete()}>
                    <DeleteIcon style={{ color: '#FFC107' }} />
                </IconButton>
            </Box>

        </Box>

    );
};

export default FileControlCard;