import React, { useState } from 'react';
import { Container, TextField, Button, Box, Snackbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ParticleBackground from '../Atoms/ParticleBackground';
import ViewPassword from '../Molecules/ViewPassword';
import '../../Style/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const response = await axios.post('http://localhost:4444/auth/login', {
        email,
        password,
      });

      if (response && response.data) {
        const { token, ...user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setSuccessMessage("Login successful");
        setSnackbarOpen(true);

        navigate('/user');
      } else {
        setErrorMessage("Response or response data is undefined");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : error.message);
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <ParticleBackground />
      <Container maxWidth="xs">
        <Box className="box"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <div className='textTitlu'>Login</div>

          <form onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              margin="normal"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <ViewPassword
              password={password}
              onPasswordChange={(e) => setPassword(e.target.value)}
            />

            <Button className='button'
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                borderRadius: '10px',
                backgroundColor: '#000000',
                '&:hover': { backgroundColor: '#9F9F9F' }
              }}
            >
              Login
            </Button>

            <Link to="/register" sx={{ textDecoration: 'none', mt: 2 }}>
              <Typography className="link" variant="body2" align="center" marginTop="1rem">
                Don't you have an account? Sign up
              </Typography>
            </Link>
          </form>
        </Box>
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
      </Container>
    </>
  );
};

export default LoginPage;
