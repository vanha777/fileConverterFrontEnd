
import React, { useState, useEffect } from 'react';
import Files from './Files.jsx';
import FilesController from './FilesController.jsx';


// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Paper, Card, CardContent, Box } from '@mui/material';
import { useFilesState } from '../../utils/filesState.jsx';
// components

// sections


// ----------------------------------------------------------------------

export default function DashboardAppPage(props) {
    const theme = useTheme();
    const { filesState, updateFilesState } = useFilesState();

    //getting files infos
    useEffect(() => {
        fetch("http://localhost:777/files", {
            method: "GET",
        }).then((result) => result.json()).then((result)=>{
            console.log(result);
            updateFilesState(result);
        }).catch((err) => { console.log(err) });
        
    }
, []);
    //end.


    //test
    useEffect(() => {
        console.log('updating filesState')
    }, [filesState]);
    //end.



    return (


        <Card style={{ padding: 20 }} elevation={3} square>


            <Card>
                <FilesController />


            </Card>

            <CardContent style={{ maxHeight: '65vh', overflowY: 'auto' }}>
                {filesState == undefined
                    ? (null)
                    : (<Files />)
                }
            </CardContent>

        </Card>





    );
}
