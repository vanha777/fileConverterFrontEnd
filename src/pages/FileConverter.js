import { Helmet } from 'react-helmet-async';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Card, Container, Stack, Typography, Button, TextField, Box, IconButton } from '@mui/material';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded.js';


import CloudUploadIcon from '@mui/icons-material/CloudUpload.js';
import CheckCircleIcon from '@mui/icons-material/CheckCircle.js';
import PictureAsPdfSharpIcon from '@mui/icons-material/PictureAsPdfSharp.js';
import CloudSyncSharpIcon from '@mui/icons-material/CloudSyncSharp.js';
import FileNameContainer from '../components/fileConverter/FileNameContainer.js'
import { ConstructionOutlined, UploadFile } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download.js';
import LinearWithValueLabel from '../components/fileConverter/ProgressBar.js'

const formData = new FormData();

const upLoadFile = (file, uploadUrl, destinationUrl) => {
    console.log('we are logging in uploadFile')
    console.log(uploadUrl);
    console.log(file.type);
    fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-type': file.type, 'x-amz-acl': 'public-read' },
        body: file
    })
        .then((res) => res.json()).then((res) => console.log(res))
        .catch((err) => console.log(`Front-end failed to upload File, ${err}`));
    //end.
}

// ----------------------------------------------------------------------

export default function FileConverter() {
    const [file, setFile] = useState("");
    const fileInput = useRef();
    const [fileName, setFileName] = useState([]);
    const fileName2 = [];
    const [loading, setLoading] = useState(true);


    const getSignedRes = (fileName) => {
        fetch('http://localhost:777/getSignedRequest', {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8', },
            body: JSON.stringify({
                file: fileName.flat()
            })
        })
            .then((res) => res.json()).then((res) => {
                console.log('uploading file')
                upLoadFile(fileInput.current.files[0], res.signedRequest, res.url);
            })
            .catch((err) => console.log(`Front-end failed to send Request, ${err}`));
        //end.
    }

    const handleClear = () => {
        window.location.reload();
      };

    const handleSubmit = async (e) => {
        if (fileName.length > 0) {
            setLoading(null);
            fetch("http://localhost:777/upLoad", {
                method: "POST",
                body: formData,
            })
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.status);
                    }

                    return response.json();
                })
                .then((data) => {
                    setLoading(false)
                    setFile(data);
                })
                .catch((error) => {
                    console.error(error);
                });

            /*console.log(fileName2)
            const file = fileName[0];
            const formData = new FormData();
            formData.append("file", file)*/
        }

    };

    const handleFileChange = (event) => {

        for (let i = 0; i < event.target.files.length; i++) {
            fileName2.push({
                name: event.target.files[i].name,
                loading: 0,
                type: event.target.files[i].type
            });

            formData.append("files", event.target.files[i])


        }

        setFileName([...fileName, fileName2])








    }




    return (
        <>
            <Helmet>
                <title> Dashboard: File Converter | Minimal UI </title>
            </Helmet>

            <Container sx={{ display: 'block', height: '100%' }}>
                <Box sx={{ display: 'flex' }}>
                    <Typography variant="h4" >
                        {/*File Converter*/}
                        Ghép Hình Thành PDF
                    </Typography>
                    < PictureAsPdfSharpIcon sx={{ ml: 'auto' }} color="primary" />
                </Box>

                <Box sx={{ display: 'flex', height: '70%', justifyContent: 'center', alignItems: 'center' }}>

                    <Card sx={{ display: 'block', minWidth: '50%', minHeight: '50%', textAlign: "center", backgroundColor: 'white', m: 1 }} >
                        { fileName.length > 0 ? (
                        <Box sx={{display:'flex',justifyContent: 'flex-end'}}>
                        <Button sx={{ m: 1 }} size="small" variant="outlined" color="error" component="label" onClick={handleClear} startIcon={<CloseRoundedIcon />}>Xóa</Button>
                        </Box>
                        ):null}
                        <Typography variant="h6" sx={{ p: 2 }}>{/*Upload Your Files*/} Xin Đính Kèm File</Typography>

                        <Box component="main" sx={{ overflowY: 'auto', flexGrow: 1, display: 'block', p: 2, border: '1px dashed grey', m: 2, maxHeight: 170 }}>
                            <FileNameContainer fileName={fileName} />
                        </Box>

                        <Box sx={{ display: 'flex', p: 2, m: 2, justifyContent: 'center' }}>

                            {loading === true ?
                                (
                                    <Box sx={{ display: 'flex' }} >
                                        <Button sx={{ m: 1 }} variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
                                            {/*Upload*/}
                                            Tải Lên
                                            <input hidden accept="image/*" multiple type="file" ref={fileInput} onChange={handleFileChange} />
                                        </Button>
                                        <Button sx={{ m: 1 }} variant="contained" component="label" startIcon={<CloudSyncSharpIcon />} onClick={handleSubmit}>
                                            {/*Submit*/}
                                            Ghép File
                                        </Button>
                                    </Box>
                                )
                                : loading === false ?
                                    (
                                        <Button sx={{ m: 1 }} variant="contained" color="success" component="a" href={file} startIcon={<DownloadIcon />} >
                                            {/*Open File*/}
                                            Xem Kết Quả
                                        </Button>
                                    )
                                    : (
                                        <LinearWithValueLabel />
                                    )
                            }
                        </Box>

                    </Card >
                </Box >

                {/*<Box sx={{ display: 'flex', width: '100%', height: '100px', justifyContent: 'center', backgroundColor: 'black' }}>
                    <Typography>hello</Typography>
                                </Box>*/}
            </Container >
        </>
    );
}
