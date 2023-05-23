import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import moment from 'moment';
import poza from '../../Images/corporate_pic.png'
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

    const { title, start, end, details } = event || {};

    const formattedStart = start ? moment(start).format('DD/MM/YYYY h:mm a') : '';
    const formattedEnd = end ? moment(end).format('DD/MM/YYYY h:mm a') : '';
  

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>Event details</DialogTitle>
            <DialogContent>
            <div style={{ display: 'flex'}}>
                <div
                        style={{
                            flex: '1',
                            overflowY: 'auto',
                            maxHeight: '500px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                    <Typography variant="subtitle1">Event name: {title}</Typography>
                    <Typography variant="subtitle1">Start date: {formattedStart}</Typography>
                    <Typography variant="subtitle1">End date: {formattedEnd}</Typography>
                    <Typography variant="subtitle1">Description: {details}</Typography>
                    <Typography variant="subtitle1">Persons that are attending the event:</Typography>
                    <div style={{
                            height: '100px', 
                            display: 'block',
                            overflowY: 'auto',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            backgroundColor: '#f9f9f9',
                            marginTop: '10px'
                        }}>
                        {event && event.person && event.person.map((email, index) => (
                            <Typography key={index} variant="subtitle1">{email}</Typography>
                        ))}
                     </div>
                </div>
                <div style={{ flex: '1', marginLeft: '20px' }}>
                    <img src={poza} alt="poza" style={{width: '420px', height: '280px', borderRadius: '2em'}}/>
                </div>
            </div>
                
            </DialogContent>


            <DialogActions>
                <Button onClick={handleClose} variant="outlined">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EventDet;
