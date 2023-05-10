import React, { useState } from 'react';

import Header from '../Organisms/Header';
import Footer from '../Organisms/Footer';
import Sidebar from '../Organisms/Sidebar';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import '../../Style/UserPage.css';


const UserPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };

    return (
    <>
        <main>
            <Header />
            <button className={`rotate-button ${sidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}><ArrowForwardIcon></ArrowForwardIcon></button>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <Footer/>
        </main>
        </>
    );
}

export default UserPage;

