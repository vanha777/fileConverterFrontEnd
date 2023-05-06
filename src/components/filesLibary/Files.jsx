import { Grid, Container, Typography, Paper, Card, CardContent, CardHeader, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useFilesState } from '../../utils/filesState.jsx';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Checkbox from '@material-ui/core/Checkbox';
import { useMediaQuery } from '@material-ui/core';



const FileComponent = (props) => {
    const isDesktop = useMediaQuery('(min-width:600px)');
    const theme = useTheme();
    const [clicked, setClicked] = useState(false);
    const files = props.files;
    const { filesSelected, updateFilesSelected } = useFilesState();
    //test
    useEffect(() => {
        // console.log(filesSelected)
    }, [filesSelected]);
    //end.


    const addFilesSelected = (files) => {
        updateFilesSelected([...filesSelected, files.key]);
    }
    const removeFilesSeleced = (files) => {
        const updatedFiles = filesSelected.filter(item => item !== files.key);
        updateFilesSelected(updatedFiles);
    }
    const handleClick = (files) => {
        setClicked(!clicked)

    }
    useEffect(() => {
        if (clicked === false) {
            removeFilesSeleced(files);
            return;
        }
        addFilesSelected(files);
    }, [clicked]);

    return (
        <Card style={{ padding: 20 }} elevation={3} square sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'background-color 0.2s', backgroundColor: clicked ? "#DCE7F9" : '#e6e6e6',
            '&:hover': { backgroundColor: clicked ? "#DCE7F9" : '#B8B8B8' }
        }} onClick={handleClick}>

            <CardHeader sx={{
                display: 'flex', flexDirection: isDesktop ? 'row' : 'column', justifyContent: 'center', textAlign: 'center'
            }} title={files.key}
                subheader={`Date: ${files.lastModified}`}
                avatar={
                    clicked ? (
                        <CheckBoxIcon />

                    ) : (
                        <CheckBoxOutlineBlankIcon />
                    )
                } />


            <CardContent sx={{ alignItems: 'center' }}>
                <iframe src={files.previewUrl} style={{ width: 200, height: 250 }}></iframe>
                {/*<img src='/aiProfile.jpg' style={{ width: 200, height: 250 }} />*/}
            </CardContent>

        </Card>
    )
}

export default function Files() {
    const { filesState, updateFilesState } = useFilesState();


    return (
        <Grid container spacing={3}>
            {filesState.map((file, index) => (
                <Grid item xs={12} md={6} lg={4}>
                    <FileComponent files={file} />
                </Grid>
            ))
            }
        </Grid>

    )
}