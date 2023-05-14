import userp from '../../Images/user.png';
import edit from '../../Images/edit.png';
import settings from '../../Images/settings.png';
import logout from '../../Images/logout.png';
import '../../Style/UserDD.css';

import { Link } from 'react-router-dom';
import React, {useState, useEffect, useRef} from 'react';

function UserDropDown() {

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        console.log(menuRef.current);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

  useEffect(() => {
    // Încarcă datele utilizatorului din local storage la montarea componentei
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="App">
      <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
          <img src={userp}></img>
        </div>

        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <h3>{user ? `${user.fullName}` : "no name"}<br/><span></span></h3>
          <ul>
          <Link to="/profile"> 
                <DropdownItem img = {userp} text = {"My profile"}/>
            </Link>
            <DropdownItem img = {edit} text = {"Edit Profile"}/>
            <DropdownItem img = {settings} text = {"Settings"}/>
            <Link to="/"> 
                <DropdownItem img = {logout} text = {"Logout"}/>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

function DropdownItem(props){
  return(
    <li className = 'dropdownItem'>
      <img src={props.img}></img>
      <span> {props.text} </span>
    </li>
  );
}

export default UserDropDown;