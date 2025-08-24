import { useDispatch, useSelector } from "react-redux";
import "../../styles/EmployeeDashboard.css";
import HeartLoading from "../common/HeartLoading";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getEmployee } from "../../services/ReduxController/employeeSlice";
import { WidgetStatsAExample, WidgetStatsBExample } from "../common/TaskSummary";
import { getStatsById } from "../../services/ReduxController/OtherSlices";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";
import { addComment, getAllTask, setsuccessTask, updateTask } from "../../services/ReduxController/taskSlice";


const ManagerDashboard=()=>{

  const dispatch=useDispatch();
  const taskdispatch=useDispatch();
  const [employee,setEmployee]=useState([]);
  const {employees,error,loading}=useSelector((state)=>state.employeeDetails)
  const {data,stateError,stateLoading}=useSelector((state)=>state.other)
  const {tasks,taskloading,taskerror,updatetaskloading,updatetaskerror,addcommentloading,addcommenterror}=useSelector((state)=>state.task)

  const handleTaskUpdate = async (taskId, newStatus) => {
   
  }


useEffect(()=>{
  
dispatch(getEmployee())
 dispatch(getStatsById({token:localStorage.getItem("token"),id:localStorage.getItem("userId")}));
},[dispatch])
  
console.log(employees)

useEffect(()=>{
  taskdispatch(getAllTask());
},[taskdispatch])


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
        <h2>My Activity</h2>
        <div className="emp-states">
        <WidgetStatsBExample states={data.states}/>
        <WidgetStatsAExample/>
         
        </div>
      </div>

      <div className="emp-current-tasks">
        <h2>My Recent Tasks</h2>
        <div className="emp-task-list">
         {tasks && tasks.length > 0 ? (
          tasks.slice().reverse().map((task, index) =>{ 
           return (index<3?<TaskCard key={task.task.taskId || index} task={task} />:<></>)
             
  }
)
        ) : (
          <p className="emp-no-tasks">No tasks assigned</p>
        )
  }
          
         
        </div>
      </div>
    </div>
  );
}
return <h1>No data found</h1>
}
  
  export default ManagerDashboard;



  // const TaskCard=({task})=>{


  //   return (
  //              <div  className="emp-task-item">
  //               <div className="emp-task-header">
  //                 <h3>{task.Title}</h3>
  //                 <span className={`emp-task-priority low`}>
  //                  {task.Priority} Priority
  //                 </span>
  //               </div>
  //               <p className="emp-task-description">{task.Description}</p>
  //               <div className="emp-task-meta">
  //                 <div className="emp-task-dates">
  //                   <span><strong>Start:</strong> {new Date(task.StartDate).toLocaleDateString()} </span><br />
  //                   <span><strong>Due:</strong> {task.Deadline==null?"NA":task.Deadline} </span>
  //                 </div>
  //                 <span className='emp-task-status pending'>
  //                   {task.Status}
  //                 </span>
  //               </div>
  //               <div className="emp-task-actions">
                 
  //                {
  //                 task.Status!="pending"?(<><button
  //                       className="emp-accept-btn"
  //                       onClick={() => handleTaskUpdate()}
  //                     >
  //                       Accept Task
  //                     </button>
  //                     <button
  //                       className="emp-reject-btn"
  //                       onClick={() => handleTaskUpdate()}
  //                     >
  //                       Reject Task
  //                     </button></>):(
  //                   <button
  //                     className="emp-complete-btn"
  //                     onClick={() => handleTaskUpdate()}
  //                   >
  //                     Complete
  //                   </button>)

  //                }

  //                 <button className="emp-details-btn">
  //                   View Details
  //                 </button>
  //               </div>
  //             </div>
  //           )
  // }



  
  const TaskCard = ({ task }) => {
    const userId = localStorage.getItem("userId");
    const managerId = localStorage.getItem("userId");
    const comment=useRef("");
    const {addcommentloading,addcommenterror}=useSelector((state)=>state.task)
    const [showDetails, setShowDetails] = useState(false);
  const updatetaskdispatch=useDispatch();
  const addcommentdispatch=useDispatch();
    const handleViewDetails = () => {
      setShowDetails(true);
    };
    const states=useSelector((state)=>state.other.data.states)||{};
  console.log(task)
    const handleTaskUpdate=(id)=>{
      updatetaskdispatch(setsuccessTask())
  updatetaskdispatch(updateTask({id:id,data:{Status:"in-progress"}}))
    }
    const handleTaskRejectUpdate=(id)=>{
  updatetaskdispatch(setsuccessTask())
  updatetaskdispatch(updateTask({id:id,data:{Status:"rejected"}}))
    }
    const handleTaskCompletedUpdate=(id)=>{
  updatetaskdispatch(setsuccessTask())
  updatetaskdispatch(updateTask({id:id,data:{Status:"completed"}}))
    }
    const handleComment=(e)=>{
      e.preventDefault()
      console.log("Comment=",comment.current.value);
      const data={
    "taskId": task.task.TaskID,
    "userId": localStorage.getItem("userId"),
    "comment": comment.current.value
  }
      addcommentdispatch(addComment(data));
      comment.current.value="";
  
    }

  const filterTasks = (status, active = false) =>
    managedEmployees.flatMap(
      (emp) =>
        states.tasks?.filter(
          (task) =>
            (active ? task.IsActive === true : status ? task.Status === status : true) &&
            (task.AssignedBy === emp.userId || task.AssignedTo === emp.userId)
        ) || []
    );
  const managedEmployees =
    userId === managerId
      ? states.employees?.filter((emp) => emp.manager === managerId) || []
      : states.employees?.filter((emp) => emp.userId === userId) || [];


      const ActiveTask = filterTasks(null, true);
  const PendingTask = filterTasks("pending");
  const CompletedTask = filterTasks("completed");
  const InProgressTask = filterTasks("in-progress");

console.log("ActiveTask",ActiveTask)
console.log("Pending",PendingTask)
console.log("Complete",CompletedTask)
console.log("InProgress",InProgressTask)

  // console.log("TASKS",task.assignedTo[0].name)
    return (
      <div className="emp-task-list">
        <div className="emp-task-item">
          <div className="emp-task-header">
            <h3>{task.task.Title}</h3>
            <span
              className={`emp-task-priority ${task.task.Priority.toLowerCase()}`}
            >
              {task.task.Priority}
            </span>
          </div>
          <p className="emp-task-description">By: {task?.assignedBy[0]?.name}</p>
          <p className="emp-task-description">To: {task?.assignedTo[0]?.name}</p>
        
          <div className="emp-task-meta">
            <div className="emp-task-dates">
              <span>
                <strong>
                  Start: {new Date(task.task.StartDate).toLocaleDateString()}
                </strong>
              </span>
              <br />
              <span>
                <strong>
                  Due: {new Date(task.task.Deadline).toLocaleDateString()}
                </strong>
              </span>
            </div>
            <span className={`emp-task-status pending ${task.task.Status.toLowerCase()}`}>{task.task.Status}</span>
          </div>
        
          <div className="emp-task-actions emp-task-actions1">
            <div className="emp-task-actions">
            {task.task.Status == "pending" ? (
              <>
                {" "}
                <button
                  className="emp-accept-btn"
                  onClick={() => handleTaskUpdate(task.task.TaskID)}
                >
                  Accept Task
                </button>
                <button
                  className="emp-reject-btn"
                  onClick={() => handleTaskRejectUpdate(task.task.TaskID)}
                >
                  Reject Task
                </button>
              </>
            ) : (
              task.task.Status!="completed"?
              <button
                className="emp-complete-btn"
                onClick={() => handleTaskCompletedUpdate(task.task.TaskID)}
              >
                Complete
              </button>:<></>
            )}
    
  
            <button className="emp-details-btn" onClick={handleViewDetails}>View Details</button>
            </div>
            <form onSubmit={(e)=>handleComment(e)} className="commentSection">
              <input type="search" name="comment" ref={comment} placeholder="Comment" />
              <button type="submit" disabled={addcommentloading} className="emp-accept-btn">Send</button>
            </form>
          </div>
        </div>
  
        <CModal 
          visible={showDetails} 
          onClose={() => setShowDetails(false)}
          dark
          size="lg"
        >
          <CModalHeader>
            <CModalTitle>
              <div className="modal-title-container">
                <h3>{task.task.Title}</h3>
                <span className={`emp-task-priority ${task.task.Priority.toLowerCase()}`}>
                  {task.task.Priority}
                </span>
              </div>
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="task-details-modal">
              {/* Task Basic Information */}
              <div className="detail-section">
                <h4 className="section-title">Task Information</h4>
                <div className="detail-row">
                  <strong>Description:</strong>
                  <p>{task.task.Description}</p>
                </div>
                <div className="detail-grid">
                  <div className="detail-column">
                    <strong>Status:</strong>
                    <span className={`emp-task-status ${task.task.Status.toLowerCase()}`}>
                      {task.task.Status}
                    </span>
                  </div>
                  <div className="detail-column">
                    <strong>Active:</strong>
                    <span className={`task-active-status ${task.task.IsActive ? 'active' : 'inactive'}`}>
                      {task.task.IsActive ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
  
              {/* Assignment Information */}
              <div className="detail-section">
                <h4 className="section-title">Assignment Details</h4>
                <div className="detail-grid">
                  <div className="detail-column">
                    <strong>Assigned To:</strong>
                    <div className="user-info">
                      <span className="user-name">{task?.assignedTo[0]?.name || 'Not assigned'}</span>
                      {task.assignedTo[0]?.email && (
                        <span className="user-email">{task.assignedTo[0].email}</span>
                      )}
                     {task.assignedTo[0]?.userType && (
                        <span className="user-role">{task.assignedTo[0]?.userType}</span>
                      )}
                     
                    </div>
                  </div>
                  <div className="detail-column">
                    <strong>Assigned By:</strong>
                    <div className="user-info">
                      <span className="user-name">{task.assignedBy[0]?.name || 'Unknown'}</span>
                      {task.assignedBy[0]?.email && (
                        <span className="user-email">{task.assignedBy[0].email}</span>
                      )}
                      {task.assignedBy[0]?.userType && (
                        <span className="user-role">{task.assignedBy[0]?.userType}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Timeline Information */}
              <div className="detail-section">
                <h4 className="section-title">Timeline</h4>
                <div className="detail-grid">
                  <div className="detail-column">
                    <strong>Start Date:</strong>
                    <span>{new Date(task.task.StartDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="detail-column">
                    <strong>Deadline:</strong>
                    <span>{new Date(task.task.Deadline).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                </div>
                <div className="detail-row">
                  <strong>Time Remaining:</strong>
                  <span className="time-remaining">
                    {(() => {
                      const deadline = new Date(task.task.Deadline);
                      const today = new Date();
                      const diffTime = deadline - today;
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                      
                      if (diffDays < 0) {
                        return <span className="overdue">Overdue by {Math.abs(diffDays)} days</span>;
                      } else if (diffDays === 0) {
                        return <span className="due-today">Due Today</span>;
                      } else {
                        return <span className="remaining">{diffDays} days remaining</span>;
                      }
                    })()}
                  </span>
                </div>
              </div>
  
              {/* Task Progress */}
              <div className="detail-section">
                <h4 className="section-title">Progress Tracking</h4>
                <div className="detail-row">
                  <strong>Progress Status:</strong>
                  <div className="progress-bar-container">
                    <div 
                      className={`progress-bar ${task.task.Status.toLowerCase()}`}
                      style={{
                        width: (() => {
                          switch(task.task.Status.toLowerCase()) {
                            case 'completed': return '100%';
                            case 'in-progress': return '50%';
                            case 'on-hold': return '25%';
                            default: return '0%';
                          }
                        })()
                      }}
                    />
                  </div>
                </div>
              </div>
  
              {/* Additional Details */}
              <div className="detail-section detail-section-comment">
                  <h4 className="section-title">Comments</h4>
              {task.comments && (
                task.comments?.map((comment)=>{
  
                  return(
                  <div className=".detail-row detail-row-comment">
                    <p>{comment.comment}</p>
                    <div style={{borderLeft:"1px solid",paddingLeft:"10px"}}>
                    <p>{comment.commentedBy}</p>
                    <p style={{color:comment.userType=="admin"?"red":comment.userType=="manager"?"yellow":"green"}}>{comment.userType}</p>
                    </div>
                  </div>
                  )
  
                })
                
              )}
              </div>
            </div>
          </CModalBody>
          <CModalFooter>
            {task.task.Status === 'pending' && (
              <>
                <CButton color="success" onClick={() => handleTaskUpdate(task.task.TaskID)}>
                  Accept Task
                </CButton>
                <CButton color="danger" onClick={() => handleTaskRejectUpdate(task.task.TaskID)}>
                  Reject Task
                </CButton>
              </>
            )}
            <CButton color="secondary" onClick={() => setShowDetails(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      </div>
    );
  };
  