import React from 'react';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeIcon from '@mui/icons-material/Home';
import EditCalendar from "@mui/icons-material/EditCalendar";
import Groups from "@mui/icons-material/Group";
import { useNavigate } from 'react-router-dom';

const CustomSidebar = () => {
  const { collapseSidebar } = useProSidebar();
  const navigate = useNavigate();

  const navigateTo = (route) => {
    navigate(route);
    collapseSidebar();
  };

  return (
    <Sidebar defaultCollapsed>
      <Menu>
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            collapseSidebar();
          }}
          style={{ textAlign: 'center' }}
        >
          {' '}
          <h2>Navigation</h2>
        </MenuItem>

        <MenuItem icon={<HomeIcon />} onClick={() => navigateTo("/user")}>
          Home
        </MenuItem>

        <MenuItem icon={<EditCalendar />} onClick={() => navigateTo("/event-management")}>
          Event manager
        </MenuItem>

        <MenuItem icon={<CalendarTodayOutlinedIcon />} onClick={() => navigateTo("/calendar")}>
          Calendar
        </MenuItem>
        <MenuItem icon={<Groups />} onClick={() => navigateTo("/groups")}>
          Groups
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default CustomSidebar;
