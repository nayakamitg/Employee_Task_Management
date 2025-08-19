import React, { useEffect } from 'react';
import '../../styles/Profile.css';
import { useNavigate, useParams } from 'react-router-dom';
import '/profileImage.avif';
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from '../../services/ReduxController/profileSlice';
import { toast } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner';
import {FaArrowLeft } from 'react-icons/fa';


const Profile = () => {
const {profile,loading,error}=useSelector((state)=>state.profile)
const dispatch=useDispatch();
  // Dummy data for demonstration
const navigate=useNavigate();

  useEffect(()=>{
    const id=localStorage.getItem("userId");
    dispatch(getProfile(id));
  },[dispatch])
  const user = profile.employee;
  console.log(user)
  useEffect(()=>{
    if(error){
      toast.error(error)
    }
  },[error])

if(loading){
  return <InfinitySpin/>
}
  // const user = {
  //   UserID: 'EMP123',
  //   Name: 'John Doe',
  //   Email: 'john.doe@example.com',
  //   UserType: 'manager',
  //   PhoneNumber: '+1 (555) 123-4567',
  //   Location: 'New York, USA',
  //   ProfileImage: 'https://img.freepik.com/premium-photo/3d-cartoon-avatar-man-minimal-3d-character-avatar-profile_652053-2078.jpg',
  //   JobTitle: 'Senior Project Manager',
  //   JoinDate: '2023-01-15',
  //   RoleLevel: 'Senior Level',
  //   Manager: 'Jane Smith',
  //   Salary: '85000',
  //   DepartmentID: 'DEP001',
  //   DepartmentName: 'Engineering',
  //   CreatedAt: '2023-01-15T09:00:00',
  //   UpdatedAt: '2023-08-18T14:30:00',
  //   LastLoginAt: '2023-08-18T08:00:00',
  //   IsActive: true,
  //   employeeId: 'E12345',
  //   department: 'Human Resources',
  //   joiningDate: '2023-01-15',
  //   avatar: 'https://img.freepik.com/premium-photo/3d-cartoon-avatar-man-minimal-3d-character-avatar-profile_652053-2078.jpg',
  // };

// return(
//   <h1>hello</h1>
// );
  return (
    <div className="profile-container">
      
      
      <div className="back_btn" onClick={()=>{
        navigate(-1);
      }}>{<FaArrowLeft/>} Back</div>
     {/* //className="profile-card" vvvvvvvvv */}
      <div >
        <div className="profile-header">
          <div className="profile-avatar" >
          {user?.ProfileImage ? (
            <img src={user?.ProfileImage} alt={user?.Name} />
          ) : (
            <img src="profileImage.avif" alt={user?.Name} />
            
          )}
          </div>
          <div className="profile-header-info">
            <span className="profile-name">{user?.Name} </span>
           
            <p className="profile-department">{user?.JobTitle}</p>
          
          
          </div>
        
        <div className='Active-empty-section'>
           <span className={`status-badge ${user?.IsActive ? 'active' : 'inactive'}`}>
               {user?.IsActive ? 'Active' : 'Inactive'}
            </span>
        </div>
        </div>

        <div className="profile-body">
          {/* Personal Information */}
          <div className="profile-section ">
            <h3 className="section-title profile_container">Personal Information</h3>
            <div className="info-grid">
              <div className="profile-info-item">
                <strong>Employee ID:</strong>
                <span> {user?.UserID}</span>
              </div>
              <div className="profile-info-item">
                <strong>Full Name:</strong>
                <span> {user?.Name}</span>
              </div>
              <div className="profile-info-item">
                <strong>Email:</strong>
                <span> {user?.Email}</span>
              </div>
              <div className="profile-info-item">
                <strong>Phone:</strong>
                <span> {user?.PhoneNumber || 'Not provided'}</span>
              </div>
              <div className="profile-info-item">
                <strong>Location:</strong>
                <span> {user?.Location || 'Not provided'}</span>
              </div>
            </div>
          </div>

          {/* Employment Information */}
          <div className="profile-section">
            <h3 className="section-title">Employment Details</h3>
            <div className="info-grid">
              <div className="profile-info-item">
                <strong>Position:</strong>
                <span> {user?.JobTitle}</span>
              </div>
              <div className="profile-info-item">
                <strong>Department:</strong>
                <span> {user?.DepartmentName}</span>
              </div>
              <div className="profile-info-item">
                <strong>Role Level:</strong>
                <span> {user?.RoleLevel}</span>
              </div>
              <div className="profile-info-item">
                <strong>Role Type:</strong>
                <span className="user-type-badge"> {user?.UserType.toUpperCase()}</span>
              </div>
              <div className="profile-info-item">
                <strong>Reports To:</strong>
                <span> {user?.Manager || 'N/A'}</span>
              </div>
              {user?.Salary && (
                <div className="profile-info-item">
                  <strong>Annual Salary:</strong>
                  <span> {user?.Salary}</span>
                </div>
              )}
            </div>
          </div>

          {/* Timeline Information */}
          <div className="profile-section">
            <h3 className="section-title">Timeline & Activity</h3>
            <div className="info-grid">
              <div className="profile-info-item">
                <strong>Join Date:</strong>
                <span> {new Date(user?.JoinDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="profile-info-item">
                <strong>Account Created:</strong>
                <span> {new Date(user?.CreatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="profile-info-item">
                <strong>Last Updated:</strong>
                <span> {new Date(user?.UpdatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
              <div className="profile-info-item">
                <strong>Last Login:</strong>
                <span> {new Date(user?.LastLoginAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            </div>
          </div>
         
          </div>
        </div>
        
      </div>
          
  );
};

export default Profile;
