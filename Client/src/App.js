import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/Pages/LoginPage';
import RegisterPage from './Components/Pages/RegisterPage';
import UserPage from './Components/Pages/UserPage';
import CalendarPage from './Components/Pages/CalendarPage';
import ProfilePage from './Components/Pages/MyProfile';
import IntroPage from './Components/Pages/Intro';
import EventM from './Components/Pages/EventM';
import './Style/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        {/* <Route path="/login" element={<LoginPage />} />  */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/event-management" element={<EventM />} />
      </Routes>
    </Router>
  );
}

export default App;
