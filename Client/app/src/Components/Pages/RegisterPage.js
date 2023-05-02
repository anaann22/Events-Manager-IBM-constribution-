import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';


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
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
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
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Parola"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
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
                        sx={{ mt: 3 }}
                    >
                        Înregistrează-te
                    </Button>
                </form>
                <Link to="/login" sx={{ textDecoration: 'none', mt: 2 }}>
                    <Typography variant="body2" align="center">
                        Ai deja un cont? Autentifică-te
                    </Typography>
                </Link>
            </Box>
        </Container>
    );
};

export default RegisterPage;