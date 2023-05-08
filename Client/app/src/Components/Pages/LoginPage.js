import React, { useState } from 'react';
import { Container, TextField, Button, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ParticleBackground from '../Atoms/ParticleBackground';
import ViewPassword from '../Molecules/ViewPassword';
import '../../Style/Login.css';

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
        <Box className = "box"
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
            <ViewPassword password={password} />
            
            <Button className='button'
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, 
                borderRadius: '10px',
                backgroundColor: '#000000', 
                '&:hover': { backgroundColor: '#9F9F9F' } 
              }}
            >
              Login
            </Button>

            <Link to="/register" sx={{ textDecoration: 'none', mt: 2 }}>
<<<<<<< HEAD
              <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
=======
              <Typography className = "link" variant="body2" align="center" marginTop="1rem">
>>>>>>> e908649f84f9fd56f5e727e968334f10cebb6bfa
                Nu ai un cont? Înregistrează-te
              </Typography>
            </Link>
          </form>
        </Box>
      </Container>
    </>);

};

export default LoginPage;
