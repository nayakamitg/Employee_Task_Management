import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getStats } from '../../services/ReduxController/OtherSlices';
import { toast } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner';
import { SimpleLineChart } from '../admin/Analytics';

export const EmployeeAnalytics = () => {
   

  return (
    <div className="analytics">
      <h1 className="analytics-title">Analytics Dashboard</h1>
     <EmpAnalyticsDetails/>
    </div>
  );
}

export default EmployeeAnalytics

export const EmpAnalyticsDetails=({userId})=>{

 if(!userId)
     userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const {data,loading,error} = useSelector((state)=>state.other);
  var states=data.states;
  const tasks=states?.tasks?.filter((task)=>(task.AssignedTo==userId) || (task.AssignedBy==userId))
  console.log(tasks)
  useEffect(()=>{
    dispatch(getStats());
  },[dispatch])
console.log()
  useEffect(()=>{
    if(error)
    {
      toast.error("Error to fetch Stats");
    }
  },[])

  if(loading){
    return <InfinitySpin/>
  }


return(
  <>
    <div className="metrics-grid">
      
         <div className="metric-card">
          <h3>Total Tasks</h3>
          <div className="metric-value">{states?.tasks?.filter((task)=>(task.AssignedTo==userId) || (task.AssignedBy==userId)).length}</div>
        </div>
        
        <div className="metric-card">
          <h3>Total Active Tasks</h3>
          <div className="metric-value">{states?.tasks?.filter((task)=>(task?.IsActive==true) && (task?.AssignedTo==userId) || (task?.AssignedBy==userId)).length}</div>
        </div>
        
        <div className="metric-card">
          <h3>Total Compleated Tasks</h3>
          <div className="metric-value">{states?.tasks?.filter((task)=>(task?.Status=="completed") && (task?.AssignedTo==userId) || (task?.AssignedBy==userId)).length}</div>
        </div>
        
        <div className="metric-card">
          <h3>Total In Progress Tasks</h3>
          <div className="metric-value">{states?.tasks?.filter((task)=>(task?.Status=="in-progress") && (task?.AssignedTo==userId) || (task?.AssignedBy==userId)).length}</div>
        </div>

      </div>


        <div className="analytics-details">
        <div className="performance-trends">
          <h2>Departments</h2>
            <SimpleLineChart task={tasks}/>
        </div>
        </div>

  </>
)
}
