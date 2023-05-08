import React, { useState, useEffect } from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';

export default function FileCopy(props) {

    if (props.filesCopy == true) {
        return (
            <Snackbar style={{ zIndex: 9999 }} anchorOrigin={{ vertical: '', horizontal: 'center' }} key={'top' + 'center'} open={true} autoHideDuration={6000} onClose={false}>
                <Alert onClose={false} severity="success" sx={{ width: '100%', zIndex: 9999 }}>
                    Copy URL successful.
                </Alert>
            </Snackbar>
        )
    }
    if (props.filesCopy == false) {
        return (
            <Snackbar style={{ zIndex: 9999 }} anchorOrigin={{ vertical: '', horizontal: 'center' }} key={'top' + 'center'} open={true} autoHideDuration={6000} onClose={false}>
                <Alert onClose={false} severity="error" sx={{ width: '100%', zIndex: 9999 }}>
                    Please only share one file at a time.
                </Alert>
            </Snackbar>
        )
    }
    if (props.filesCopy == null) {
        return null;
    }

}