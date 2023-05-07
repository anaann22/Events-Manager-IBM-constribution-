import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import ParticleBackground from '../Atoms/ParticleBackground';
import PasswordCheck from '../Molecules/PasswordCheck';
import '../../Style/Login.css';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform registration request here using email, password and confirmPassword
    };

    return (
        <Container maxWidth="xs">
            <ParticleBackground/>
            <Box className = "box"

                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"s
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Înregistrare
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
                    <PasswordCheck password={password} />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Confirmă parola"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, 
                            backgroundColor: '#000000', 
                            '&:hover': { backgroundColor: '#9F9F9F' }, 
                            borderRadius: '10px'
                        }}
                    >
                        Înregistrează-te
                    </Button>
                </form>
                <Link to="/login" sx={{ textDecoration: 'none', mt: 2 }}>
                    <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                        Ai deja un cont? Autentifică-te
                    </Typography>
                </Link>
            </Box>
        </Container>
    );
};

export default RegisterPage;
