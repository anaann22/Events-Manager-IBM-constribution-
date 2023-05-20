import '../../Style/Profile.css';
import calendar from '../../Images/calendar.png';
import React, { useState, useEffect } from 'react';
import '../../Style/AddEventCard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Persons from '../Molecules/Persons';


const ProfileCard = () => {
  const [title, setEventName] = useState("");
  const [startdate, setEventstartDate] = useState("");
  const [enddate, setEventendDate] = useState("");
  const [details, setEventDetails] = useState("");
  const [person, setEventPerson] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [personsDialogOpen, personsSetDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handlePersonsDialogClose = () => {
    personsSetDialogOpen(false);
  }

  const handlePersonsOpenDialog = () => {
    personsSetDialogOpen(true);
  };

  const handleDialogConfirm = async () => {
    setDialogOpen(false);
    try {
      const response = await axios.post('http://localhost:4444/event/create', {
        title,
        startdate,
        enddate,
        details,
        person,
      });
      navigate('/calendar');
    } catch (error) {
      console.error(error);
      const backendErrorMessage = error.response?.data?.message;
      setErrorMessage(backendErrorMessage || 'Eroare nu e adaugat event');
      setSnackbarMessage(backendErrorMessage || 'Eroare nu e adaugat event');
      setSnackbarOpen(true);
    }
  };

  const handleEmails = (emails) => {
    console.log(emails);
    const emailsArray = emails.split('\n');  // transformă stringul într-o listă de email-uri
    setEventPerson(emailsArray);  // setează lista de email-uri
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setWarningMessage('');

    if (!title || !startdate || !enddate || !details || !person) {
      setErrorMessage('Toate câmpurile sunt obligatorii.');
      setSnackbarMessage('Toate câmpurile sunt obligatorii.');
      setSnackbarOpen(true);
      return;
    }

    const startDate = new Date(startdate);
    const endDate = new Date(enddate);

    if (endDate < startDate) {
      setErrorMessage('Data de sfârșit nu poate fi înainte de data de început.');
      setSnackbarMessage('Data de sfârșit nu poate fi înainte de data de început.');
      setSnackbarOpen(true);
      return;
    }

    if (endDate < new Date()) {
      setErrorMessage('Data de sfârșit nu poate fi în trecut.');
      setSnackbarMessage('Data de sfârșit nu poate fi în trecut.');
      setSnackbarOpen(true);
      return;
    }

    if (startDate < new Date()) {
      setWarningMessage('Data de inceput este in trecut.');
      setSnackbarMessage('Data de inceput este in trecut.');
      setSnackbarOpen(true);
      setWarningMessage('Evenimentul este programat pentru o dată din trecut. Ești sigur că vrei să continui?');
      setDialogOpen(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:4444/event/create', {
        title,
        startdate,
        enddate,
        details,
        person,
      });
      navigate('/calendar');
    } catch (error) {
      console.error(error);
      const backendErrorMessage = error.response?.data?.message;
      setErrorMessage(backendErrorMessage || 'Eroare nu e adaugat event');
      setSnackbarMessage(backendErrorMessage || 'Eroare nu e adaugat event');
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Add Event</h2>
      </div>
      <Snackbar open={snackbarOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleSnackbarClose}>
        <Alert variant="filled" onClose={handleSnackbarClose} severity={errorMessage ? "error" : "warning"} sx={{ width: '100%' }}>
          {errorMessage || warningMessage}
        </Alert>
      </Snackbar>
      <Persons open={personsDialogOpen} handleClose={handlePersonsDialogClose} handleEmails={handleEmails} />
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Avertisment"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {warningMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Nu
          </Button>
          <Button onClick={handleDialogConfirm} color="primary" autoFocus>
            Da
          </Button>
        </DialogActions>
      </Dialog>
      <div className="card-body">
        <img src={calendar} alt="Profile Picture" className="profile-add" />
        <div className="profile-det">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="eventName">Name:</label>
              <input
                type="text"
                className="form-control input-field"
                id="titlu"
                placeholder="Enter event name"
                value={title}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventDate">Start Date:</label>
              <input
                type="datetime-local"
                className="form-control input-field"
                id="startdate"
                placeholder="Enter event start date"
                value={startdate}
                onChange={(e) => setEventstartDate(e.target.value)}
              />
            </div>


            <div className="form-group">
              <label htmlFor="eventDate">End Date:</label>
              <input
                type="datetime-local"
                className="form-control input-field"
                id="enddate"
                placeholder="Enter event end date"
                value={enddate}
                onChange={(e) => setEventendDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventDetails">Event Details:</label>
              <textarea
                className="form-control input-field"
                id="details"
                rows="3"
                placeholder="Enter event details"
                value={details}
                onChange={(e) => setEventDetails(e.target.value)}
              />
            </div>
            <div className="form-group">
              <Button onClick={handlePersonsOpenDialog}>Selectează adrese de e-mail</Button>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
