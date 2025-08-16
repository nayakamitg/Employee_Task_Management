import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../../styles/EmployeeDetail.css';
import { useDispatch,useSelector } from 'react-redux';
import HeartLoading from '../common/HeartLoading';
import { toast } from 'react-toastify';

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, loading, error } = useSelector((state) => state.employees);
  const [employee, setEmployee] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees());
  }, []); // Only dispatch on mount

  useEffect(() => {
    if (employees) {
      setEmployee(employees.find((emp) => emp.employee.UserID === id));
    }
  }, [employees, id]);

  if (loading) {
    return <HeartLoading />;
  }

  if (!employee) {
    return (
      <div className="employee-detail">
        <div className="detail-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back to Employees
          </button>
        </div>
        <div className="profile-section">
          <h2>Employee not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-detail">
      <div className="detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to Employees
        </button>
        <button className="edit-profile-btn">Edit Profile</button>
      </div>

      <div className="profile-section">
        <div className="profile-header">
          <div className="profile-avatar">
            <img src={"https://localhost:7155/"+employee.employee.ProfileImage} alt="" />
          </div>
          <div className="profile-info">
            <h1>{employee.employee.FirstName+" "+employee.employee.LastName}</h1>
            <p className="job-title">{employee.employee.JobTitle}</p>
            <p className="department">{employee.employee.DepartmentName} Department</p>
          </div>
          {
            employee.employee.IsActive?
            <div className="profile-status active">Active</div>:<div className="profile-status passive">Not Active</div>
          }
          
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h3>Contact Information</h3>
            <div className="info-content">
              <p><span>Email:</span> {employee.employee.Email}</p>
              <p><span>Phone:</span> +91 {employee.employee.PhoneNumber}</p>
              <p><span>Location:</span> {employee.employee.Location??"NA"}</p>
            </div>
          </div>

          <div className="info-card">
            <h3>Employment Details</h3>
            <div className="info-content">
              <p><span>Employee ID:</span> {employee.employee.UserID}</p>
              <p><span>Join Date:</span> {(employee.employee.JoinDate)}</p>
              <p><span>Role Level:</span> {employee.employee.RoleLevel}</p>
            </div>
          </div>

          <div className="info-card">
            <h3>Performance Metrics</h3>
            <div className="info-content">
              <p><span>Tasks Completed:</span> {employee.tasks.filter(
                (task) => task.task.Status === "Completed"
              ).length}</p>
              <p><span>Active Tasks:</span> {employee.tasks.filter(
                (task) => task.task.Status === "In-progress"
              ).length}</p>
              <p><span>Performance Score:</span> 4.8/5.0</p>
            </div>
          </div>

          <div className="info-card">
            <h3>Team & Projects</h3>
            <div className="info-content">
              <p><span>Team:</span> Frontend Development</p>
              <p><span>Current Projects:</span> 2</p>
              <p><span>Team Lead:</span> Yes</p>
            </div>
          </div>
        </div>

        <div className="detail-sections">
          <div className="current-tasks">
            <h2>Current Tasks</h2>
            <div className="task-list1">
{

  employee.tasks.length === 0 ? <h3 style={{textAlign:"center", color:"rgba(255, 255, 255, 0.7)"}}>No Tasks</h3> :
  employee.tasks.map((task)=>{
   
     return <TaskList key={task.TaskID} task={task}/>

  })
} 


            </div>
          </div>

          <div className="performance-history">
            <h2>Performance History</h2>
            <div className="chart-container">
              {/* Performance chart would go here */}
              <div className="placeholder-chart"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;


const TaskList = ({ task }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(task.comments || []);
  const commentsListRef = React.useRef(null);
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.employees);
  
 const handleAddComment = async (e) => {
  e.preventDefault();

  if (!newComment.trim()) return;

  const commentData = {
    taskId: task.task.TaskID,
    userId: JSON.parse(localStorage.getItem('userData')).user.UserID,
    comment: newComment,
    commentedBy: "admin"
  };

  try {
    await dispatch(addComments(commentData));

    const newCommentObj = {
      commentId: Date.now(), // Temporary ID
      userId: commentData.userId,
      comment: newComment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      commentedBy: "admin"
    };

    toast.success("Successfully added comment");
    setComments([...comments, newCommentObj]);
    setNewComment('');
  } catch (err) {
    toast.error("Failed to add comment");
  }
  setShowComments(true);
};


  useEffect(() => {
    if (error) {
      toast.error("Comment not added");
    }
    
  }, [error]);

  useEffect(() => {
    if (showComments && commentsListRef.current) {
      commentsListRef.current.scrollTop = commentsListRef.current.scrollHeight;
    }
  }, [showComments]);

  return (
    <div className="task-item">
     
      <div className="task-header">
        <h4>{task.task.Title}</h4>
        {
          task.task.Priority === "Low" 
            ? <span className="task-priority low">{task.task.Priority}</span>
            : task.task.Priority === "Medium"
              ? <span className="task-priority medium">{task.task.Priority}</span>
              : <span className="task-priority high">{task.task.Priority}</span>
        }
      </div>
      <p>{task.task.Description}</p>
      <div className="task-meta">
        <span>
          <span style={{color:"#325fff"}}>Due: </span> 
          {(task.task.Deadline).toString().split("T")[0]}
        </span>
        <span className="status">{task.task.Status}</span>
      </div>

      <div className="task-comments">
        {comments.length > 0 && (
          <div className="latest-comment">
            <div>
            <p>{comments[comments.length - 1].comment}</p>
            <small>{new Date(comments[comments.length - 1].createdAt).toLocaleString()}</small>
         </div>
        { (comments[comments.length - 1].commentedBy=="admin")?<span className="task-priority medium commented-by">Admin</span>:
          <span className="task-priority low commented-by">Employee</span>
        }
          </div>
        )}
        <button 
          className="comments-btn"
          onClick={() => setShowComments(true)}
        >
          {comments.length > 0 ? `View All Comments (${comments.length})` : "Add Comment"}
        </button>
      </div>

      {showComments && (
        <div className="comments-overlay">
          <div className="comments-modal">
            <div className="comments-header">
              <h3>Task Comments</h3>
              <button 
                className="close-btn"
                onClick={() => setShowComments(false)}
              >
                ×
              </button>
            </div>

            <div className="comments-list" ref={commentsListRef}>
              {comments.length === 0 ? (
                <p className="no-comments">No comments yet</p>
              ) : (
                comments.map((comment, index) => (
                  <div key={index} className="comment-item">
                    
                    <div className="comment-meta">
                      <p>{comment.comment}</p>
                      <div className='date-and-button'>
                      {
                        (comments[comments.length - 1].commentedBy=="admin")?<span className="task-priority medium commented-by">Admin</span>:
          <span className="task-priority low commented-by">Employee</span>
                      }
                      <span>{new Date(comment.createdAt).toLocaleString()}</span>
                       </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="add-comment">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                disabled={isLoading}
              />
             <button
  onClick={handleAddComment}
  disabled={isLoading || !newComment.trim()}
  className={isLoading ? 'loading' : ''}
>
  {isLoading ? 'Adding...' : 'Add Comment'}
</button>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}



// This is employees date from employeeSlice

// [
//     {
//         "employee": {
//             "EmployeeID": 1,
//             "UserID": "Rahul53841",
//             "DepartmentID": "Web_Developer54479",
//             "JobTitle": "Frontend Developer",
//             "JoinDate": "2025-08-08T00:00:00",
//             "RoleLevel": "Experienced",
//             "ReportsTo": 10,
//             "Salary": 30000,
//             "CreatedAt": "2025-08-09T03:46:46.007",
//             "UpdatedAt": "2025-08-09T03:46:46.007",
//             "FirstName": "Rahul",
//             "LastName": "Kumar",
//             "Email": "rahul@gmail.com",
//             "IsActive": true,
//             "Location": null,
//             "PhoneNumber": "6764756756",
//             "ProfileImage": "/Images/profile.jpg",
//             "UserType": "employee",
//             "LastLoginAt": null,
//             "DepartmentName": "Web Developer"
//         },
//         "tasks": [
//             {
//                 "task": {
//                     "TaskID": 2,
//                     "ProjectID": null,
//                     "Title": "Edit Background",
//                     "Description": "the background color is not god so chage the color with attractive look",
//                     "AssignedTo": "Rahul53841",
//                     "AssignedBy": "Amit24772",
//                     "Priority": "Medium",
//                     "Status": "Pending",
//                     "StartDate": "2025-08-08T23:07:55.08",
//                     "Deadline": "2025-08-20T23:07:55.08",
//                     "CompletedDate": "2025-08-08T23:07:55.08",
//                     "CreatedAt": "2025-08-08T23:07:55.08",
//                     "UpdatedAt": "2025-08-08T23:07:55.08",
//                     "IsActive": true
//                 },
//                 "comments": [
//                     {
//                         "commentId": 1,
//                         "userId": "Rahul53841",
//                         "comment": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
//                         "createdAt": "2025-08-10T00:31:34.707",
//                         "updatedAt": "2025-08-10T00:31:34.707",
//                         "commentedBy": "employee"
//                     },
//                     {
//                         "commentId": 2,
//                         "userId": "Amit24772",
//                         "comment": "What is the update?",
//                         "createdAt": "2025-08-10T02:28:14.33",
//                         "updatedAt": "2025-08-10T02:28:14.33",
//                         "commentedBy": "admin"
//                     },
//                     {
//                         "commentId": 3,
//                         "userId": "Amit24772",
//                         "comment": "What is the update?",
//                         "createdAt": "2025-08-10T02:28:21.47",
//                         "updatedAt": "2025-08-10T02:28:21.47",
//                         "commentedBy": "admin"
//                     },
//                     {
//                         "commentId": 4,
//                         "userId": "Amit24772",
//                         "comment": "wlejfmorlvk",
//                         "createdAt": "2025-08-10T02:28:48.747",
//                         "updatedAt": "2025-08-10T02:28:48.747",
//                         "commentedBy": "admin"
//                     }
//                 ]
//             }
//         ]
//     }
// ]