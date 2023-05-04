import React, { useState } from 'react';
import { Container, TextField, Button, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ParticleBackground from '../Atoms/ParticleBackground';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login request here using email and password
  };

  return (
    <>
      <ParticleBackground />
      <Container maxWidth="xs">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
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
            <TextField
              required
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Login
            </Button>

            <Link to="/register" sx={{ textDecoration: 'none', mt: 2 }}>
              <Typography variant="body2" align="center">
                Nu ai un cont? Înregistrează-te
              </Typography>
            </Link>
          </form>
        </Box>
      </Container>
    </>);

};

export default LoginPage;
