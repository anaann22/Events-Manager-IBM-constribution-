import React, { useState } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Header from '../Organisms/Header';
import Footer from '../Organisms/Footer';
import CustomSidebar from '../Organisms/CustomSidebar';
import MyCalendar from '../Molecules/MyCalendar';

const CalendarPage = () => {

  return (
    <ProSidebarProvider>
      <div className="user-page-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flexGrow: 1, display: 'flex'}}>
          <CustomSidebar />
          <main style={{ flexGrow: 1, overflowY: 'auto' }}>
          <MyCalendar/>
          </main>
        </div>
        <Footer />
      </div>
    </ProSidebarProvider>
  );
  };

export default CalendarPage;
