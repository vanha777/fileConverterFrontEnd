import React, {} from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';

export default function FileCopy(props) {

    if (props.filesCopy === true) {
        return (
            <Snackbar anchorOrigin={{ vertical: '', horizontal: 'center' }} key={'top' + 'center'} open={true}  >
                <Alert severity="success" >
                    Copy URL successful.
                </Alert>
            </Snackbar>
        )
    }
    if (props.filesCopy === false) {
        return (
            <Snackbar anchorOrigin={{ vertical: '', horizontal: 'center' }} key={'top' + 'center'} open={true}  >
                <Alert severity="error" >
                    Please only share one file at a time.
                </Alert>
            </Snackbar>
        )
    }
    if (props.filesCopy === null) {
        return null;
    }

}