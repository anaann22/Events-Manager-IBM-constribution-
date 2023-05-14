import React from 'react';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeIcon from "@mui/icons-material/Home";
import { Link } from 'react-router-dom';

const CustomSidebar = () => {
  const { collapseSidebar } = useProSidebar();

  return (
    <Sidebar>
      <Menu>
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            collapseSidebar();
          }}
          style={{ textAlign: 'center' }}
        >
          {' '}
          <h2>Navigate</h2>
        </MenuItem>

        <Link to="/user" style={{ color: '#000000' }}>
          <MenuItem icon={<HomeIcon />}>Home</MenuItem>
        </Link> 
        <MenuItem icon={<PeopleOutlinedIcon />}>Groups</MenuItem>
        
        <Link to="/calendar" style={{ color: '#000000' }}>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
        </Link> 
      </Menu>
    </Sidebar>
  );
};

export default CustomSidebar;
