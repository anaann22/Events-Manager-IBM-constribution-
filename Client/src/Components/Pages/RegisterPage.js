import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import ParticleBackground from '../Atoms/ParticleBackground';
import PasswordCheck from '../Molecules/PasswordCheck';
import '../../Style/Login.css';
import axios from 'axios';

function RegisterPage() {
    const [fullName, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordValid, setPasswordValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log(password);
    }, [password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (!isPasswordValid) {
            setErrorMessage(
                'The password must contain at least 8 characters, an uppercase letter, a lowercase letter and a number.'
            );
            return;
        }
    
        if (password !== confirmPassword) {
            setErrorMessage('The passwords do not match.');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:4444/auth/register', {
                fullName,
                email,
                password,
            });
    
            navigate('/login');
            console.log("ceva");
        } catch (error) {
            console.error(error);
            const backendErrorMessage = error.response?.data?.message;
            setErrorMessage(backendErrorMessage || 'An error occurred during registration. Try again.');
        }
    };

    return (
        <Container maxWidth="xs">
            <ParticleBackground />
            <Box
                className="box"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <div className='textTitlu'>Register</div>
                <form onSubmit={handleSubmit}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Full Name"
                        value={fullName}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <PasswordCheck
                        onPasswordChange={(e) => setPassword(e.target.value)}
                        onPasswordValidation={(isValid) => setPasswordValid(isValid)}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Confirm password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errorMessage && (
                        <Typography variant="body2" color="error">
                            {errorMessage}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{
                            mt: 3,
                            backgroundColor: '#000000',
                            '&:hover': { backgroundColor: '#9F9F9F' },
                            borderRadius: '10px',
                        }}
                    >
                        Register
                    </Button>
                </form>
                <Link to="/login" sx={{ textDecoration: 'none', mt: 2 }}>
                    <Typography variant="body2" align="center" marginTop="1rem">
                        Do you have an account? Sign in
                    </Typography>
                </Link>
            </Box>
        </Container>
    );
};

export default RegisterPage;