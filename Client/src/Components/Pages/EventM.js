import React, { useState } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Header from '../Organisms/Header';
import Footer from '../Organisms/Footer';
import AddEventCard from '../Organisms/AddEventCard';
import '../../Style/UserPage.css';
import CustomSidebar from '../Organisms/CustomSidebar';

const EventM = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  
  const handleEventSubmit = (e) => {
    e.preventDefault();
    console.log({
      eventName,
      eventDate,
      eventDetails,
    });
  };

  return (
    <ProSidebarProvider>
      <div className="user-page-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flexGrow: 1, display: 'flex'}}>
          <CustomSidebar />
          <main style={{ flexGrow: 1, overflowY: 'auto', padding: '20px' }}>
           <AddEventCard />
          </main>
        </div>
        <Footer />
      </div>
    </ProSidebarProvider>
  );
};

export default EventM;
