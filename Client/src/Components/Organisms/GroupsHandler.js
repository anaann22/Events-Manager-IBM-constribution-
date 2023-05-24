import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditGroupDialog from '../Molecules/EditGroupDialog';
import {
  Container,
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Fab,
  useScrollTrigger,
  Zoom,
  Snackbar,
  Alert,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Persons from '../Molecules/Persons';

const ScrollTop = (props) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" {...props}>
        {props.children}
      </div>
    </Zoom>
  );
};

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [personsDialogOpen, setPersonsDialogOpen] = useState(false);
  const [groupEmails, setGroupEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editGroupId, setEditGroupId] = useState(null); // Id-ul grupului pentru editare
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const isAdminUser = localStorage.getItem("isAdmin") === 'true';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4444/groups');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4444/groups');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchData();
  }, [groups]); // Adăugați groups ca dependență

  const handleEditGroup = (groupId) => {
    if(!isAdminUser)
    {
      setErrorMessage('You are not an admin user.');
      setSuccessMessage('');
      setSnackbarOpen(true);
      return;
    }
    setEditGroupId(groupId);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditGroupId(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleGroupDescriptionChange = (event) => {
    setGroupDescription(event.target.value);
  };

  const handleOpenPersonsDialog = () => {
    if(!isAdminUser)
    {
      setErrorMessage('You are not an admin user.');
      setSuccessMessage('');
      setSnackbarOpen(true);
      return;
    }
    setPersonsDialogOpen(true);
  };

  const handleClosePersonsDialog = () => {
    setPersonsDialogOpen(false);
  };

  const handleGroupEmails = (emails) => {
    setGroupEmails(emails.split('\n'));
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const createGroup = async () => {
    if(!isAdminUser)
    {
      setErrorMessage('You are not an admin user.');
      setSuccessMessage('');
      setSnackbarOpen(true);
      return;
    }
    if (groupName.trim() === '' || groupDescription.trim() === '' || groupEmails.length === 0) {
      setErrorMessage('All fields are required.');
      setSuccessMessage('');
      setSnackbarOpen(true);
      return;
    }

    const newGroup = {
      groupName: groupName,
      description: groupDescription,
      emails: groupEmails,
    };

    try {
      const response = await axios.post('http://localhost:4444/group/create', newGroup);
      setGroups([...groups, response.data]);
      setGroupName('');
      setGroupDescription('');
      setGroupEmails([]);
      setSuccessMessage('The group has been created successfully.');
      setErrorMessage('');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('error creating group.');
      setSuccessMessage('');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    if(!isAdminUser)
    {
      setErrorMessage('You are not an admin user.');
      setSuccessMessage('');
      setSnackbarOpen(true);
      return;
    }
    const confirmDelete = window.confirm('Are you sure you want to delete this group?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4444/group/${groupId}`);
        setSuccessMessage('The group has been deleted successfully.');
        setErrorMessage('');
        setSnackbarOpen(true);
        setGroups(groups.filter((group) => group._id !== groupId)); // Actualizați lista de grupuri
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('error deleting group.');
        setSuccessMessage('');
        setSnackbarOpen(true);
      }
    }
  };

  const filteredGroups = groups.filter((group) => {
    const groupNameMatch = group.groupName.toLowerCase().includes(searchTerm.toLowerCase());
    const descriptionMatch = group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = group.emails.some((email) => email.toLowerCase().includes(searchTerm.toLowerCase()));

    return groupNameMatch || descriptionMatch || emailMatch;
  });

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Group List
      </Typography>

      <Box display="flex" flexDirection="column" alignItems="center" gap={2} marginBottom={4}>
        <Box display="flex" gap={2}>
          <TextField
            value={groupName}
            onChange={handleGroupNameChange}
            placeholder="Group Name"
            variant="outlined"
          />
          <TextField
            value={groupDescription}
            onChange={handleGroupDescriptionChange}
            placeholder="Group Description"
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={handleOpenPersonsDialog}>
            Select emails
          </Button>
          <Button variant="contained" color="secondary" onClick={createGroup}>
            Create group
          </Button>
        </Box>
      </Box>

      <TextField
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder="Caută grupuri"
        variant="outlined"
        fullWidth
        style={{ marginBottom: '20px' }}
      />

      <div id="back-to-top-anchor" />

      {filteredGroups.map((group, index) => (
        <Paper elevation={3} key={index} style={{ margin: '20px', padding: '20px' }}>
          <Typography variant="h5">{group.groupName}</Typography>
          <Typography variant="subtitle1">Description: {group.description}</Typography>
          <Typography variant="body2">Emails: {group.emails.join(', ')}</Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleEditGroup(group._id)}
            style={{ marginRight: '10px' }}
          >
            Edit
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => handleDeleteGroup(group._id)}>
            Delete
          </Button>
        </Paper>
      ))}

      <ScrollTop>
        <Fab
          color="primary"
          size="small"
          aria-label="scroll back to top"
          style={{ position: 'fixed', right: '20px', bottom: '20px', zIndex: '100' }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>

      <EditGroupDialog open={editDialogOpen} groupId={editGroupId} handleClose={handleCloseEditDialog} />

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
      <Persons
        open={personsDialogOpen}
        handleClose={handleClosePersonsDialog}
        handleEmails={handleGroupEmails}
        showEmailInput={false}
      />
    </Container>
  );
};

export default GroupList;
