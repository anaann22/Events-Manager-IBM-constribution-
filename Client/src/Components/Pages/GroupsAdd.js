import React, { useState } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Header from '../Organisms/Header';
import Footer from '../Organisms/Footer';
import CustomSidebar from '../Organisms/CustomSidebar';
import GroupsHandler from '../Organisms/GroupsHandler';

const CalendarPage = () => {

  return (
    <ProSidebarProvider>
      <div className="user-page-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flexGrow: 1, display: 'flex'}}>
          <CustomSidebar />
          <main style={{ flexGrow: 1, overflowY: 'auto' }}>
         <GroupsHandler/>
          </main>
        </div>
        <Footer />
      </div>
    </ProSidebarProvider>
  );
  };

export default CalendarPage;
