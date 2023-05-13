import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/Pages/LoginPage';
import RegisterPage from './Components/Pages/RegisterPage';
import UserPage from './Components/Pages/UserPage';
import './Style/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserPage />} />

        {/* <Route path="/" element={<LoginPage />} /> */} 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
