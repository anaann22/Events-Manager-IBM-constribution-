import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Checkbox,
    FormControlLabel,
    TextField,
    Button,
    Typography,
    Snackbar,
    Alert,
} from '@mui/material';
import axios from 'axios';

const Persons = ({ open, handleClose, handleEmails }) => {
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [emailInput, setEmailInput] = useState('');
    const [emailFilter, setEmailFilter] = useState('');
    const [databaseEmails, setDatabaseEmails] = useState(['john.doe@example.com']);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await axios.get('http://localhost:4444/emails');
                const emails = response.data;
                setDatabaseEmails(emails);
            } catch (error) {
                console.error('Error fetching emails:', error);
            }
        };

        fetchEmails();
    }, []);

    const handleEmailToggle = (email) => {
        const selectedIndex = selectedEmails.indexOf(email);
        let newSelectedEmails = [];

        if (selectedIndex === -1) {
            newSelectedEmails = newSelectedEmails.concat(selectedEmails, email);
        } else {
            newSelectedEmails = selectedEmails.filter((selectedEmail) => selectedEmail !== email);
        }

        setSelectedEmails(newSelectedEmails);
    };

    const handleEmailInputChange = (event) => {
        setEmailInput(event.target.value);
    };

    const handleEmailFilterChange = (event) => {
        setEmailFilter(event.target.value);
    };

    const handleAddEmail = () => {
        if (emailInput.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
            if (emailRegex.test(emailInput.trim())) {
                if (!databaseEmails.includes(emailInput.trim())) {
                    setDatabaseEmails([...databaseEmails, emailInput.trim()]);
                    setSelectedEmails([...selectedEmails, emailInput.trim()]);
                    setSuccessMessage('Adresa de e-mail a fost adăugată cu succes.');
                    setErrorMessage('');
                } else {
                    setErrorMessage('Adresa de e-mail este deja în listă.');
                }
                setSnackbarOpen(true);
            } else {
                setErrorMessage('Introduceți o adresă de e-mail validă.');
                setSuccessMessage('');
                setSnackbarOpen(true);
            }
        }
    };
    

    const handleRemoveEmail = () => {
        setSelectedEmails([]);
    };

    const handleSelectAllEmails = () => {
        setSelectedEmails(databaseEmails);
    };

    const filteredEmails = databaseEmails.filter((email) => email.includes(emailFilter));

    const handleSendEmails = () => {
        handleEmails(selectedEmails.join('\n'));
        handleClose();
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Selectează adresele de e-mail</DialogTitle>
            <DialogContent>
                <div style={{ display: 'flex' }}>
                    <div
                        style={{
                            flex: '1',
                            overflowY: 'auto',
                            maxHeight: '500px',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <TextField
                            placeholder="Filtrează adresele de e-mail..."
                            onChange={handleEmailFilterChange}
                            variant="outlined"
                            fullWidth
                            style={{ marginBottom: '10px' }}
                        />
                        {filteredEmails.map((email) => (
                            <FormControlLabel
                                key={email}
                                control={
                                    <Checkbox
                                        checked={selectedEmails.indexOf(email) !== -1}
                                        onChange={() => handleEmailToggle(email)}
                                    />
                                }
                                label={email}
                            />
                        ))}
                    </div>
                    <div style={{ flex: '1', marginLeft: '20px' }}>
                        <Typography variant="subtitle1">Adresele de e-mail selectate:</Typography>
                        <TextField
                            value={selectedEmails.join('\n')}
                            variant="outlined"
                            multiline
                            rows={10}
                            fullWidth
                            disabled
                            style={{ marginTop: '10px' }}
                        />
                        <Typography variant="subtitle1" style={{ marginTop: '20px' }}>
                            Adaugă o nouă adresă de e-mail:
                        </Typography>
                        <TextField
                            value={emailInput}
                            onChange={handleEmailInputChange}
                            variant="outlined"
                            fullWidth
                            autoComplete="off"
                        />

                        <Button onClick={handleAddEmail} variant="contained" color="primary" style={{ marginTop: '10px' }}>
                            Adaugă e-mail
                        </Button>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Anulează</Button>
                <Button onClick={handleSelectAllEmails} color="primary">
                    Selectează toate adresele
                </Button>
                <Button onClick={handleRemoveEmail} color="secondary">
                    Șterge toate
                </Button>
                <Button onClick={handleSendEmails} color="primary">
                    Salveaza e-mailurile
                </Button>
            </DialogActions>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={handleSnackbarClose}
            >
                <Alert variant="filled" onClose={handleSnackbarClose} severity={successMessage ? 'success' : 'error'} sx={{ width: '100%' }}>
                    {successMessage || errorMessage}
                </Alert>

            </Snackbar>
        </Dialog>
    );
};

export default Persons;
