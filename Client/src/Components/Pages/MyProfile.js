import React, { useState , useEffect} from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Header from '../Organisms/Header';
import Footer from '../Organisms/Footer';
import back from '../../Images/wallp.png'
import '../../Style/UserPage.css';
import CustomSidebar from '../Organisms/CustomSidebar';
import Card from '../Organisms/Card';
import axios from 'axios';

const MyProfile = () => {

  return (
    <ProSidebarProvider>
      <div className="user-page-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flexGrow: 1, display: 'flex'}}> {/* paddingBottom added */}
          <CustomSidebar />
          <main style={{ flexGrow: 1, overflowY: 'auto'}}> {/* overflowY added */}
          <Card />
          </main>
        </div>
        <Footer />
      </div>
    </ProSidebarProvider>
  );
};

export default MyProfile;
