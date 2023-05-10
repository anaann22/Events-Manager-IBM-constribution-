import React, { useState } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Header from '../Organisms/Header';
import Footer from '../Organisms/Footer';

import '../../Style/UserPage.css';
import CustomSidebar from '../Organisms/CustomSidebar';

const UserPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ProSidebarProvider>
      <div className="user-page-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flexGrow: 1, display: 'flex', paddingBottom: '5.1rem' }}> {/* paddingBottom added */}
          <CustomSidebar />
          <main style={{ flexGrow: 1, overflowY: 'auto' }}> {/* overflowY added */}
            {/* Add your content here */}
          </main>
        </div>
        <Footer />
      </div>
    </ProSidebarProvider>
  );
};

export default UserPage;
