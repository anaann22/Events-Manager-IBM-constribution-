import { useEffect, useState } from 'react';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAdminUser = localStorage.getItem("isAdmin") === 'true';
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(!isAdminUser);
    if (!isAdminUser) {
      setTimeout(() => {
        setOpen(false);
        navigate('/user');
      }, 1000);
    }
  }, [isAdminUser, navigate]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  if (!isAdminUser) {
    return (
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ top: 50 }}
      >
        <Alert onClose={handleClose} severity="error">
          Accesul la această pagină este restricționat.
        </Alert>
      </Snackbar>
    );
  }

  return children;
};

export default ProtectedRoute;
