import React, { useState } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Header from '../Organisms/Header';
import Footer from '../Organisms/Footer';
import EventDetailsCard from '../Organisms/EventDetailsCard';
import CustomSidebar from '../Organisms/CustomSidebar';

const EventM = () => {
 
  return (
    <ProSidebarProvider>
      <div className="user-page-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flexGrow: 1, display: 'flex'}}>
          <CustomSidebar />
          <main style={{ flexGrow: 1, overflowY: 'auto', padding: '20px' }}>
          <EventDetailsCard/>
          </main>
        </div>
        <Footer />
      </div>
    </ProSidebarProvider>
  );
};

export default EventM;
