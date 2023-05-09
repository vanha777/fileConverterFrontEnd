import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@mui/material/IconButton';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/GetApp';
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@mui/material/Box';
import { useFilesState } from '../../utils/filesState.jsx';
import FilesCopy from './filesCopy.jsx';

const FileControlCard = () => {
    const { filesSelected, updateFilesSelected } = useFilesState();
    const { updateFilesState } = useFilesState();
    const [filesCopy, setFilesCopy] = useState(null);

    useEffect(() => {
        if (filesCopy == null) {
            return;
        }
        setTimeout(() => {
            setFilesCopy(null);
        }, 5000);
    }, [filesCopy]);




    const handleFileNameChange = () => {
        console.log('chaning name')
        console.log(filesSelected)
    };

    const handleFileDownload = () => {
        //A Blob (Binary Large Object) is a type of object used in JavaScript 
        //to represent binary data,
        // such as files, images, or multimedia content. 
        //A Blob object represents an immutable, raw data file-like object,
        // which can be used to store and manipulate binary data.
        const downLoad = (files) => {
            fetch(files.previewUrl)
                .then((response) => response.blob())
                .then((blob) => {
                    const blobURL = window.URL.createObjectURL(new Blob([blob]))
                    const aTag = document.createElement("a");
                    aTag.href = blobURL;
                    aTag.setAttribute("download", files.key);
                    document.body.appendChild(aTag)
                    aTag.click();
                    aTag.remove();
                });
        }
        filesSelected.map((files) => { downLoad(files) });
    }

    const handleFileShare = async () => {

        if (filesSelected.length > 1) {
            console.warn('Please Select One Files At A Times');
            setFilesCopy(false);
            return;
        }
        const link = filesSelected[0];
        console.log(link)
        const copyLink = () => {
            navigator.clipboard.writeText(link.previewUrl);
        };
        console.log('sharing files')
        if (navigator.share) {
            try {
                await navigator.share({
                    title: link.key,
                    text: "Files Converter Created By Van Jiro",
                    url: link.previewUrl,
                });
                console.log("Shared successfully");
            } catch (error) {
                console.error("Error sharing:", error);
                copyLink(); // If sharing fails, provide a fallback option to copy the link
                //setFilesCopy(true);
            }
        } else {
            console.warn("Web Share API not supported on this browser");
            copyLink(); // If Web Share API is not supported, provide a fallback option to copy the link
            setFilesCopy(true);
        }
    };

    const handleFileDelete = () => {
        let deleteFiles = [];
        filesSelected.map((files) => { deleteFiles.push({ Key: files.key }) })
        const restart = () => {
            fetch("https://salty-reef-01562.herokuapp.com/files", {
                method: "GET",
            }).then((result) => result.json()).then((result) => {
                updateFilesState(result);
                updateFilesSelected([]);
            }).catch((err) => { console.log(err) });
        }
        const deleteObjects = () => {
            //const requestBody = { filesSelected: filesSelected };
            fetch("https://salty-reef-01562.herokuapp.com/filesDelete", {
                method: "POST",
                body: JSON.stringify(deleteFiles),
                headers: { "Content-Type": "application/json" }
            })
                .then((response) => {
                    console.log(response.status);
                    if (response.status !== 200) {
                        return;
                    }
                    restart();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        deleteObjects();
    };

    return (


        <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
            <Box sx={{ margin: '16px', display: 'flex', flexDirection: 'row' }}>
                {filesSelected.length > 0
                    ? (<PhotoLibraryIcon color="primary" />)
                    : (<ImageNotSupportedIcon />)
                }
                <Typography variant="h6" component="p">
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
                    <FilesCopy filesCopy={filesCopy} />
                </IconButton>
                <IconButton onClick={() => handleFileDelete()}>
                    <DeleteIcon style={{ color: '#FFC107' }} />
                </IconButton>
            </Box>

        </Box>

    );
};

export default FileControlCard;