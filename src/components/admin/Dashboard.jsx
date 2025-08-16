import React, { useEffect } from 'react';
import '../../styles/Dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmin } from '../../services/ReduxController/adminSlice';
import HeartLoading from '../common/HeartLoading';
import { toast } from 'react-toastify';
import { getStats } from '../../services/ReduxController/OtherSlices';


const AdminDashboard = () => {
const dispatch=useDispatch();
const {loading,error,data}=useSelector((state)=>state.admin);

const states=useSelector((state)=>state.other)
  useEffect(()=>{
    dispatch(getAdmin(localStorage.getItem("token")));
    dispatch(getStats(localStorage.getItem("token")));
  },[dispatch])


  useEffect(()=>{
    console.log("Admin",data)
    console.log("States",states.data)
  },[data,states.data])


useEffect(()=>{
  if(error){
  toast.error(error);
}
  if(states.error){
  toast.error(states.error);
}
},[error,states.error])

if(loading){
  return <HeartLoading/>
}
if(states.loading){
  return <HeartLoading/>
}

  return (
    <div className="dashboard1">
      <h1 className="dashboard-title1">Admin Dashboard</h1>
      <div className="stats-container1">
        <div className="stat-card1">
          <h3>Total Employees</h3>
          <p className="stat-number1">{(states.data && states.data.states.totalEmployees)?states.data.states.totalEmployees:0}</p>
        </div>
        <div className="stat-card1">
          <h3>Active Tasks</h3>
          <p className="stat-number1">{(states.data && states.data.states.totalActiveTasks)?states.data.states.totalActiveTasks:0}</p>
        </div>
        <div className="stat-card1">
          <h3>Completed Tasks</h3>
          <p className="stat-number1">{(states.data && states.data.states.totalCompletedTasks)?states.data.states.totalCompletedTasks:0}</p>
        </div>
        <div className="stat-card1">
          <h3>Pending Tasks</h3>
          <p className="stat-number1">{(states.data && states.data.states.totalPendingTasks)?states.data.states.totalPendingTasks:0}</p>
        </div>
      </div>
      
      <div className="recent-activity1">
        <h2>Recent Activity</h2>
        <div className="activity-list1">
          {/* Activity items would be mapped here */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
