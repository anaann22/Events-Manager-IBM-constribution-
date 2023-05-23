import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Snackbar,
    Alert,
} from '@mui/material';
import axios from 'axios';

const EventDet = ({ open, handleClose, event }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Event details</DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1">Name: {event && event.eventName}</Typography>
                <Typography variant="subtitle1">Date: {event && event.stratDate}</Typography>
                <Typography variant="subtitle1">Location: {event && event.endDate}</Typography>
                {/* Add more details as needed */}
            </DialogContent>


            <DialogActions>
                <Button onClick={handleClose} variant="outlined">
                    Close
                </Button>
            </DialogActions>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                {errorMessage !== '' ? (
                    <Alert onClose={handleSnackbarClose} severity="error">
                        {errorMessage}
                    </Alert>
                ) : (
                    <Alert onClose={handleSnackbarClose} severity="success">
                        {successMessage}
                    </Alert>
                )}
            </Snackbar>
        </Dialog>
    );
};

export default EventDet;
