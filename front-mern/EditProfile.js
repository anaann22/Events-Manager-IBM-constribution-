import React, { useState , useEffect} from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Header from '../Client/src/Components/Organisms/Header';
import Footer from '../Client/src/Components/Organisms/Footer';
import CustomSidebar from '../Client/src/Components/Organisms/CustomSidebar';
import Card from '../Organisms/EditProfileCard';

const EditProfile = () => {

  return (
    <ProSidebarProvider>
      <div className="user-page-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flexGrow: 1, display: 'flex'}}> {/* paddingBottom added */}
          <CustomSidebar />
          <main style={{ flexGrow: 1, overflowY: 'auto', paddingTop: '60px'}}> {/* overflowY added */}
          <Card />
          </main>
        </div>
        <Footer />
      </div>
    </ProSidebarProvider>
  );
};

export default EditProfile;