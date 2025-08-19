import React from 'react';
import '../../styles/Navbar.css';
import { NavLink ,useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/ReduxController/loginSlice';
const Navbar = ({ userType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = () => {
localStorage.clear()
dispatch(logout());
setTimeout(()=>{
   navigate('/');
},100)
   
  }
  const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

  const data=localStorage.getItem('userType');

  return (
    <nav className="navbar">
      <div className="nav-brand">Task Manager</div>
      <div className="nav-user">
        {data ? (
          <>
            <span className="nav-user__type"> {capitalize(data)}</span>
          </>
        ) : (
          <span className="nav-user__name">Guest</span>
        )}
        </div>
      <div className="nav-links">
        {data&&data === 'admin' ? (
          <>
            <NavLink to="/dashboard" style={({ isActive }) => ({
    color: isActive ? "#64FFDA" : "white"
  })}>Dashboard</NavLink>
            <NavLink to="/employees" style={({ isActive }) => ({
    color: isActive ? "#64FFDA" : "white"
  })}>Employees</NavLink>
            <NavLink to="/tasks" style={({ isActive }) => ({
    color: isActive ? "#64FFDA" : "white"
  })}>Tasks</NavLink>
            <NavLink to="/analytics" style={({ isActive }) => ({
    color: isActive ? "#64FFDA" : "white"
  })}>Analytics</NavLink>
          </>
        ) :data==="manager"? (
          <>
            <NavLink to="/dashboard" style={({ isActive }) => ({
    color: isActive ? "#64FFDA" : "white"
  })}>Dashboard</NavLink>
            <NavLink to="/tasks" style={({ isActive }) => ({
    color: isActive ? "#64FFDA" : "white"
  })}>My Tasks</NavLink>
            <NavLink to="/employees" style={({ isActive }) => ({
    color: isActive ? "#64FFDA" : "white"
  })}>My Employees</NavLink>
            <NavLink to="/analytics" style={({ isActive }) => ({
    color: isActive ? "#64FFDA" : "white"
  })}>My Analytics</NavLink>
          </>
        ): (
          <>
            <NavLink to="/dashboard" style={({ isActive }) => ({
    color: isActive ? "#64FFDA" : "white"
  })}>Dashboard</NavLink>
            <NavLink to="/tasks" style={({ isActive }) => ({
    color: isActive ? "#64FFDA" : "white"
  })}>My Tasks</NavLink>
            <NavLink to="/analytics" style={({ isActive }) => ({
    color: isActive ? "#64FFDA" : "white"
  })}>My Analytics</NavLink>
          </>
        )}
        <img
          src="https://png.pngtree.com/png-vector/20250514/ourlarge/pngtree-3d-profile-icon-png-image_16279302.png"
          alt="Profile"
          className="nav-profile-img"
          onClick={() => navigate('/profile')}
        />
        <button onClick={handleLogOut} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;

