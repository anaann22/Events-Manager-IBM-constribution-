import React, { useState } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Header from '../Organisms/Header';
import Footer from '../Organisms/Footer';
import '../../Style/UserPage.css';
import CustomSidebar from '../Organisms/CustomSidebar';
import Calendar from 'reactjs-availability-calendar';
import '../../Style/Calendar.css'


const CalendarPage = () => {

  const bookings = [
    {
      from: new Date('01-16-2022'),
      to: new Date('01-27-2022'),
      middayCheckout: true,
    },
    {
      from: '06-25-2022',
      to: '07-03-2022',
      middayCheckout: false,
    },
  ]

  return (
    <ProSidebarProvider>
      <div className="user-page-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flexGrow: 1, display: 'flex'}}>
          <CustomSidebar />
          <main style={{ flexGrow: 1, overflowY: 'auto' }}>
          <Calendar bookings={bookings} />
          </main>
        </div>
        <Footer />
      </div>
    </ProSidebarProvider>
  );
  };

export default CalendarPage;
