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
                <Typography variant="subtitle1">Name: {event && event.title}</Typography>
                <Typography variant="subtitle1">Start Date: {event && event.startDate}</Typography>
                <Typography variant="subtitle1">End Date: {event && event.endDate}</Typography>

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
