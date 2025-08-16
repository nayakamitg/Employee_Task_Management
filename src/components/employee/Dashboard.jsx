import { useDispatch, useSelector } from "react-redux";
import "../../styles/EmployeeDashboard.css";
import HeartLoading from "../common/HeartLoading";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getEmployee } from "../../services/ReduxController/employeeSlice";


const EmployeeDashboard=()=>{

  const dispatch=useDispatch();
  const [employee,setEmployee]=useState([]);
  const {employees,error,loading}=useSelector((state)=>state.employeeDetails)

  const handleTaskUpdate = async (taskId, newStatus) => {
   
  }


useEffect(()=>{
  
dispatch(getEmployee())
},[dispatch])
  
console.log(employees)

useEffect(()=>{
if(!loading && employees){
  const userId=localStorage.getItem("userId");
  setEmployee(employees?.find((item)=>item.employee.UserID==userId));
}

},[employees,loading])



  if(loading)
  {
    return <HeartLoading/>
  }
  if(employee){
  return (
    <div className="employee-dashboard">
      <h1 className="dashboard-title1">My Dashboard</h1>

      <div className="emp-current-tasks">
        <h2>My Recent Tasks</h2>
        <div className="emp-task-list">
          {
            employee?.tasks?.length>0?employee?.tasks?.map((task,index)=> <TaskCard key={index} task={task.task}/>):
            <p className="emp-no-tasks">No tasks assigned</p>
        
       }
          
         
        </div>
      </div>
    </div>
  );
}
return <h1>No data found</h1>
}
  
  export default EmployeeDashboard;



  const TaskCard=({task})=>{


    return (
               <div  className="emp-task-item">
                <div className="emp-task-header">
                  <h3>{task.Title}</h3>
                  <span className={`emp-task-priority low`}>
                   {task.Priority} Priority
                  </span>
                </div>
                <p className="emp-task-description">{task.Description}</p>
                <div className="emp-task-meta">
                  <div className="emp-task-dates">
                    <span><strong>Start:</strong> {new Date(task.StartDate).toLocaleDateString()} </span><br />
                    <span><strong>Due:</strong> {task.Deadline==null?"NA":task.Deadline} </span>
                  </div>
                  <span className='emp-task-status pending'>
                    {task.Status}
                  </span>
                </div>
                <div className="emp-task-actions">
                 
                 {
                  task.Status!="pending"?(<><button
                        className="emp-accept-btn"
                        onClick={() => handleTaskUpdate()}
                      >
                        Accept Task
                      </button>
                      <button
                        className="emp-reject-btn"
                        onClick={() => handleTaskUpdate()}
                      >
                        Reject Task
                      </button></>):(
                    <button
                      className="emp-complete-btn"
                      onClick={() => handleTaskUpdate()}
                    >
                      Complete
                    </button>)

                 }

                  <button className="emp-details-btn">
                    View Details
                  </button>
                </div>
              </div>
            )
  }