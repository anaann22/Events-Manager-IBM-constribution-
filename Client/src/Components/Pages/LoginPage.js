import React, { useState } from 'react';
import { Container, TextField, Button, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ParticleBackground from '../Atoms/ParticleBackground';
import ViewPassword from '../Molecules/ViewPassword';
import '../../Style/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Adaugă această linie

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform login request here using email and password
    console.log(email, password);
    try {
      const response = await axios.post('http://localhost:4444/auth/login', {
        email,
        password,
      });

      // If login is successful, save the token and user data to local storage or a state management library
      const { token, ...user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect the user to a protected page, if login is successful
      navigate('/user'); // Adaugă această linie
    } catch (error) {
      console.error("Error during login:", error.response.data.message);
      // Handle errors during login, e.g., show an error message to the user
    }
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
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
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
                Nu ai un cont? Înregistrează-te
              </Typography>
            </Link>
          </form>
        </Box>
      </Container>
    </>);

};

export default LoginPage;
