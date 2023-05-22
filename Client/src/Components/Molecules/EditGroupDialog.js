import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Grid, Paper, List, ListItem, ListItemIcon, Checkbox, ListItemText, Snackbar, Alert } from '@mui/material';

const EditGroupDialog = ({ open, groupId, handleClose }) => {
    const [group, setGroup] = useState(null);
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [groupEmails, setGroupEmails] = useState([]);
    const [databaseEmails, setDatabaseEmails] = useState([]);
    const [checked, setChecked] = useState([]);
    const [leftFilter, setLeftFilter] = useState('');
    const [rightFilter, setRightFilter] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const left = filterEmails(databaseEmails, leftFilter);  // emails from the database not in group
    const right = filterEmails(groupEmails, rightFilter);    // emails in the group

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    useEffect(() => {
        const fetchGroup = async () => {
            if (groupId) {
                try {
                    console.log('groupId', groupId);
                    const groupResponse = await axios.get(`http://localhost:4444/group/${groupId}`);
                    const emailsResponse = await axios.get('http://localhost:4444/emails');
                    setGroup(groupResponse.data);
                    setGroupName(groupResponse.data.groupName);
                    setGroupDescription(groupResponse.data.description);
                    setGroupEmails(groupResponse.data.emails);
                    setDatabaseEmails(not(emailsResponse.data, groupResponse.data.emails));
                } catch (error) {
                    console.error('Error fetching group or emails:', error);
                }
            }
        };

        fetchGroup();
    }, [groupId]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleCheckedRight = () => {
        setGroupEmails(right.concat(leftChecked));
        setDatabaseEmails(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setDatabaseEmails(left.concat(rightChecked));
        setGroupEmails(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllRight = () => {
        const filteredLeft = filterEmails(databaseEmails, leftFilter);
        const remainingLeft = not(databaseEmails, filteredLeft);
        setGroupEmails(right.concat(filteredLeft));
        setDatabaseEmails(remainingLeft);
      };
      
      const handleAllLeft = () => {
        const filteredRight = filterEmails(groupEmails, rightFilter);
        const remainingRight = not(groupEmails, filteredRight);
        setDatabaseEmails(left.concat(filteredRight));
        setGroupEmails(remainingRight);
      };
      




    const customList = (items, filter, setFilter) => (
        <Paper style={{ overflow: 'auto', maxHeight: 300 }}>
            <TextField
                margin="dense"
                label="Filter"
                type="text"
                fullWidth
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value}-label`;

                    return (
                        <ListItem
                            key={value}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ "aria-labelledby": labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value}`} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );


    const handleEditGroup = async () => {
        const editedGroup = {
            groupName,
            description: groupDescription,
            emails: groupEmails,
        };

        try {
            await axios.patch(`http://localhost:4444/group/${groupId}`, editedGroup);
            setSuccessMessage('Group edited successfully.');
            setSnackbarOpen(true);
            handleClose();
        } catch (error) {
            console.error('Error editing group:', error);
            setErrorMessage('This group already exists.');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setSuccessMessage('');
        setErrorMessage('');
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Edit Group</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Group Name"
                    type="text"
                    fullWidth
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Group Description"
                    type="text"
                    fullWidth
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                />
                <Grid container spacing={2} justify="center" alignItems="center">
                    <Grid item>{customList(left, leftFilter, setLeftFilter)}</Grid>
                    <Grid item>
                        <Grid container direction="column" alignItems="center">
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleAllRight}
                                disabled={left.length === 0}
                                aria-label="move all right"
                            >
                                ≫
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedRight}
                                disabled={leftChecked.length === 0}
                                aria-label="move selected right"
                            >
                                &gt;
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedLeft}
                                disabled={rightChecked.length === 0}
                                aria-label="move selected left"
                            >
                                &lt;
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleAllLeft}
                                disabled={right.length === 0}
                                aria-label="move all left"
                            >
                                ≪
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>{customList(right, rightFilter, setRightFilter)}</Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleEditGroup}>Save</Button>
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

const not = (a, b) => {
    return a.filter(value => b.indexOf(value) === -1);
};

const intersection = (a, b) => {
    return a.filter(value => b.indexOf(value) !== -1);
};

const filterEmails = (emails, filter) => {
    return emails.filter(email => email.includes(filter));
};

export default EditGroupDialog;
