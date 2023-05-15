import React, { useState } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Header from '../Organisms/Header';
import Footer from '../Organisms/Footer';
import back from '../../Images/wallp.png'
import '../../Style/UserPage.css';
import CustomSidebar from '../Organisms/CustomSidebar';

const UserPage = () => {
  
  return (
    <ProSidebarProvider>
      <div className="user-page-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flexGrow: 1, display: 'flex'}}> {/* paddingBottom added */}
          <CustomSidebar />
          <main style={{ flexGrow: 1, overflowY: 'auto', 
          backgroundImage: `url(${back})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', }}> {/* overflowY added */}
          </main>
        </div>
        <Footer />
      </div>
    </ProSidebarProvider>
  );
};

export default UserPage;
