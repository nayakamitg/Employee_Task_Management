import React, { useState, useEffect } from "react";
import "../../styles/TaskList.css";
import { useSelector, useDispatch } from "react-redux";
import { getEmployee } from "../../services/ReduxController/employeeSlice";
import { toast } from "react-toastify";
import Select from "react-select";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "@coreui/coreui/dist/css/coreui.min.css";
import {
  CButton,
  CCloseButton,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import {
  addTask,
  getAllTask,
  updateTask,
  setsuccessTask,
} from "../../services/ReduxController/taskSlice";
import { InfinitySpin } from "react-loader-spinner";
import { FaEdit, FaPen } from "react-icons/fa";

const EmpTaskList = () => {
    const updatetaskdispatch = useDispatch();
  
  const [edit, setEdit] = useState(false);
  const taskdispatch = useDispatch();
  const addtaskdispatch = useDispatch();
  const getempdispatch = useDispatch();
  const {
    tasks,
    taskerror,
    taskloading,
    addtaskloading,
    addtaskerror,
    successAdded,
  } = useSelector((state) => state.task);
  const { employees, emploading, emperror } = useSelector(
    (state) => state.employeeDetails
  );
  const [filter, setFilter] = useState({
    search: "",
    task: "",
    status: "",
    priority: "",
  });
  const UserId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [visible, setVisible] = useState(false);

  const [formData, setFormData] = useState({
    Id: 0,
    Title: "",
    Description: "",
    AssignedTo: "",
    Priority: "low",
    Status: "pending",
    Deadline: "",
    StartDate: new Date().toISOString().split("T")[0],
    IsActive: true,
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((pre) => ({
      ...filter,
      [name]: value,
    }));
  };
  console.log("Filter=", filter);

  console.log(tasks);

  const handleReset = () => {
    setFormData({
      Email: "",
      Password: "",
      Name: "",
      UserType: "",
      Manager: "",
      DepartmentId: "",
      IsActive: true,
      Salary: "",
      JobTitle: "",
      Title: "",
      Description: "",
      AssignedTo: "",
      Priority: "",
      Status: "",
      Deadline: "",
      StartDate: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: formData.Title,
      description: formData.Description,
      assignedTo: localStorage.getItem("userId"),
      assignedBy: localStorage.getItem("userId"),
      priority: formData.Priority,
      status: formData.Status,
      startDate: formData.StartDate,
      deadline: formData.Deadline,
      isActive: formData.IsActive,
    };

    addtaskdispatch(setsuccessTask());
    addtaskdispatch(addTask(data));

    setFormData({
      Title: "",
      Description: "",
      AssignedTo: "",
      Priority: "low",
      Status: "pending",
      Deadline: "",
      StartDate: "",
      IsActive: "",
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "IsActive"
          ? value === "true"
          : value,
    }));
    console.log(formData);
  };

  const handleChangeSelect = (e) => {
    console.log("Selected option:", e.value);
    setFormData({
      ...formData,
      AssignedTo: e.value,
    });
  };

  const dispatch = useDispatch();
  const { employee, error, loading } = useSelector(
    (state) => state.employeeDetails
  );
  useEffect(() => {
    const useridForm = new FormData();
    useridForm.append("uid", UserId);
    taskdispatch(getAllTask({ token: token, data: useridForm }));
  }, [taskdispatch]);

  if (employee) {
    console.log(employee);
  }

  const options = [];

  employees?.forEach((emp) => {
    options.push({
      value: emp.employee.UserID,
      label: emp.employee.Name, // Store plain text label for filtering
      userType: emp.employee.UserType, // Store UserType for custom styling
    });
  });

  const handleEditTask = () => {
    const data = {
      title: formData.Title,
      description: formData.Description,
      assignedTo: localStorage.getItem("userId"),
      assignedBy: localStorage.getItem("userId"),
      priority: formData.Priority,
      status: formData.Status,
      startDate: formData.StartDate,
      deadline: formData.Deadline,
      isActive: formData.IsActive,
    };
    // formData
    console.log("Form Data", formData);

    updatetaskdispatch(setsuccessTask());
    updatetaskdispatch(updateTask({ id: formData.Id, data: data }));

    setFormData({
      Title: "",
      Description: "",
      AssignedTo: "",
      Priority: "low",
      Status: "pending",
      Deadline: "",
      StartDate: "",
      IsActive: "",
    });
    setVisible(false);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#383C46",
      color: state.isFocused || state.menuIsOpen ? "white" : "#bbb",
      width: 356 + "px",
      height: 55 + "px",
      borderRadius: 10 + "px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#383C46",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#212631"
        : state.isFocused
        ? "#212631"
        : "transparent",
      color: "white",
      display: "flex", // Apply flex to the option
      justifyContent: "space-between", // Space out the content
      padding: "10px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white", // Change the selected text color here
    }),
  };
  const customFilter = (option, inputValue) => {
    return option.label.toLowerCase().includes(inputValue.toLowerCase()); // Case-insensitive search by plain text
  };

  console.log(formData);
  useEffect(() => {
    getempdispatch(getEmployee());
  }, []);

  useEffect(() => {
    if (successAdded) {
      toast.success("Success");
    }
  }, [successAdded]);

  useEffect(() => {
    if (taskerror) {
      toast.error(taskerror);
    }
  }, [taskerror]);

  if (taskloading || emploading) {
    return <InfinitySpin />;
  }

  return (
    <div className="task-list">
      <COffcanvas
        placement="end"
        dark
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <COffcanvasHeader>
          <COffcanvasTitle>Add New Employee</COffcanvasTitle>
          <CCloseButton
            className="text-reset"
            onClick={() => setVisible(false)}
          />
        </COffcanvasHeader>
        <COffcanvasBody>
          <form method="POST" onSubmit={handleSubmit}>
            <label htmlFor="Title">
              Title<span style={{ color: "red" }}> *</span>
            </label>
            <div className="search-filter">
              <input
                placeholder="Title"
                type="text"
                name="Title"
                value={formData.Title}
                onChange={handleChange}
                required
                className="search-input"
              />
            </div>

            <label htmlFor="Description">
              Description<span style={{ color: "red" }}> *</span>
            </label>
            <div className="search-filter">
              <textarea
                placeholder="Description..."
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                required
                className="search-input"
                rows="4"
              />
            </div>

            <label htmlFor="Priority">
              Priority<span style={{ color: "red" }}> *</span>
            </label>
            <div className="search-filter">
              <select
                name="Priority"
                value={formData.Priority}
                onChange={handleChange}
                required
                className="search-input"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <label htmlFor="Status">Status</label>
            <div className="search-filter">
              <select
                name="Status"
                value={formData.Status}
                onChange={handleChange}
                className="search-input"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>

            <label htmlFor="StartDate">Start Date</label>
            <div className="search-filter">
              <input
                type="date"
                name="StartDate"
                value={formData.StartDate}
                onChange={handleChange}
                required
                className="search-input"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <label htmlFor="Deadline">
              Deadline<span style={{ color: "red" }}> *</span>
            </label>
            <div className="search-filter">
              <input
                type="date"
                name="Deadline"
                value={formData.Deadline}
                onChange={handleChange}
                required
                className="search-input"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <label htmlFor="IsActive">
              Is Active<span style={{ color: "red" }}> *</span>
            </label>
            <div className="search-filter">
              <select
                name="IsActive"
                value={formData.IsActive}
                onChange={handleChange}
                required
                className="search-input"
              >
                <option value="">Select Status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
            <div className="search-filter">
              {edit ? (
                <button
                  type="submit"
                  disabled={addtaskloading}
                  className="edit-btn"
                  onClick={handleEditTask}
                >
                  Edit
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={addtaskloading}
                  className="edit-btn"
                >
                  Submit
                </button>
              )}
              <button
                type="reset"
                onClick={handleReset}
                className="emp-reject-btn edit-btn"
              >
                Reset
              </button>
            </div>
          </form>
        </COffcanvasBody>
      </COffcanvas>

      <div className="task-header">
        <h1>All Task Management</h1>
        {
          <button className="create-task-btn" onClick={() => setVisible(true)}>
            Create New Task
          </button>
        }
      </div>

      <div className="task-filters ">
        <div className="search-bar">
          <input
            type="text"
            name="search"
            onChange={handleFilterChange}
            placeholder="Search tasks..."
          />
          {
            <select
              name="task"
              onChange={handleFilterChange}
              className="employee-filter"
            >
              <option value="all">All Tasks</option>
              <option value="By_me">By me</option>
              <option value="To_me">To me</option>
            </select>
          }
        </div>
        <div className="filter-options">
          <select
            className="status-filter"
            onChange={handleFilterChange}
            name="status"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On-Hold</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            className="priority-filter"
            name="priority"
            onChange={handleFilterChange}
          >
            <option value="">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <div className="tasks-container">
        {tasks && tasks.length > 0 ? (
          tasks
            .filter((task) => {
              return (
                // User task filter logic (By_me, To_me, or both)
                (filter.task === "By_me"
                  ? task.task.AssignedBy === UserId
                  : filter.task === "To_me"
                  ? task.task.AssignedTo === UserId
                  : task.task.AssignedBy === UserId ||
                    task.task.AssignedTo === UserId) &&
                // Priority filter
                (filter.priority === ""
                  ? task.task.Priority == "low" || "high" || "medium"
                  : task.task.Priority.toLowerCase() ===
                    filter.priority.toLowerCase()) &&
                (filter.status === ""
                  ? task.task.Status === "pending" ||
                    "in-progress" ||
                    "completed" ||
                    "rejected" ||
                    "on-hold"
                  : task.task.Status.toLowerCase() ===
                    filter.status.toLowerCase()) &&
                (filter.search === ""
                  ? true
                  : task.task.Title.toLowerCase().includes(
                      filter.search.toLowerCase()
                    ))
              );
            })
            //'pending', 'in-progress', 'completed', 'on-hold','rejected'

            .map((task, index) => (
              <TaskCard
                key={task.task.taskId || index}
                setEdit={setEdit}
                setVisible={setVisible}
                setFormData={setFormData}
                task={task}
              />
            ))
        ) : (
          <p className="emp-no-tasks">No tasks assigned</p>
        )}
      </div>
    </div>
  );
};

export default EmpTaskList;
const TaskCard = ({ task, setEdit, setVisible, setFormData, options }) => {
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");
  const [showDetails, setShowDetails] = useState(false);
  const updatetaskdispatch = useDispatch();
  const handleViewDetails = () => {
    setShowDetails(true);
  };

  const handleEdit = (e) => {
    setVisible(true);
    setEdit(true);
    setFormData({
      Id: task.task.TaskID,
      Title: task.task.Title,
      Description: task.task.Description,
      Priority: task.task.Priority.toLowerCase(),
      Status: task.task.Status,
      Deadline: new Date(task.task.Deadline).toISOString().split("T")[0],
      StartDate: new Date(task.task.StartDate).toISOString().split("T")[0],
      IsActive: task.task.IsActive,
    });
  };

  const handleTaskUpdate = (id) => {
    updatetaskdispatch(setsuccessTask());
    updatetaskdispatch(updateTask({ id: id, data: { Status: "in-progress" } }));
  };
  const handleTaskRejectUpdate = (id) => {
    updatetaskdispatch(setsuccessTask());
    updatetaskdispatch(updateTask({ id: id, data: { Status: "rejected" } }));
  };
  const handleTaskCompletedUpdate = (id) => {
    updatetaskdispatch(setsuccessTask());
    updatetaskdispatch(updateTask({ id: id, data: { Status: "completed" } }));
  };
  console.log("Task=", task);
  return (
    <div className="emp-task-list">
      <div className="emp-task-item">
        <div className="emp-task-header">
          <h3>{task.task.Title}</h3>
          <span
            className="TaskeditButtom"
            onClick={handleEdit}
            style={{
              visibility:
                task?.assignedBy[0]?.userID == userId ? "visible" : "hidden",
            }}
          >
            <FaPen color="white" />
          </span>
        </div>
        <p className="emp-task-description">{task.task.Description}</p>
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: 5 + "px",
            }}
          >
            <span
              className={`emp-task-priority ${task.task.Priority.toLowerCase()}`}
            >
              {task.task.Priority}
            </span>
            <span className="emp-task-status pending">{task.task.Status}</span>
          </div>
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
              <button
                className="emp-complete-btn"
                onClick={() => handleTaskCompletedUpdate(task.task.TaskID)}
              >
                Complete
              </button>
            )}

            <button className="emp-details-btn" onClick={handleViewDetails}>
              View Details
            </button>
          </div>
          <div className="commentSection">
            <input type="search" placeholder="Comment" />
            <button className="emp-accept-btn">Send</button>
          </div>
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
              <span
                className={`emp-task-priority ${task.task.Priority.toLowerCase()}`}
              >
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
                  <span
                    className={`emp-task-status ${task.task.Status.toLowerCase()}`}
                  >
                    {task.task.Status}
                  </span>
                </div>
                <div className="detail-column">
                  <strong>Active:</strong>
                  <span
                    className={`task-active-status ${
                      task.task.IsActive ? "active" : "inactive"
                    }`}
                  >
                    {task.task.IsActive ? "Yes" : "No"}
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
                    <span className="user-name">
                      {task?.assignedTo[0]?.name || "Not assigned"}
                    </span>
                    {task.assignedTo[0]?.email && (
                      <span className="user-email">
                        {task.assignedTo[0].email}
                      </span>
                    )}
                    {task.assignedTo[0]?.userType && (
                      <span className="user-role">
                        {task.assignedTo[0]?.userType}
                      </span>
                    )}
                  </div>
                </div>
                <div className="detail-column">
                  <strong>Assigned By:</strong>
                  <div className="user-info">
                    <span className="user-name">
                      {task.assignedBy[0]?.name || "Unknown"}
                    </span>
                    {task.assignedBy[0]?.email && (
                      <span className="user-email">
                        {task.assignedBy[0].email}
                      </span>
                    )}
                    {task.assignedBy[0]?.userType && (
                      <span className="user-role">
                        {task.assignedBy[0]?.userType}
                      </span>
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
                  <span>
                    {new Date(task.task.StartDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="detail-column">
                  <strong>Deadline:</strong>
                  <span>
                    {new Date(task.task.Deadline).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <div className="detail-row">
                <strong>Time Remaining:</strong>
                <span className="time-remaining">
                  {(() => {
                    const deadline = new Date(task.task.Deadline);
                    const today = new Date();
                    const diffTime = deadline - today;
                    const diffDays = Math.ceil(
                      diffTime / (1000 * 60 * 60 * 24)
                    );

                    if (diffDays < 0) {
                      return (
                        <span className="overdue">
                          Overdue by {Math.abs(diffDays)} days
                        </span>
                      );
                    } else if (diffDays === 0) {
                      return <span className="due-today">Due Today</span>;
                    } else {
                      return (
                        <span className="remaining">
                          {diffDays} days remaining
                        </span>
                      );
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
                        switch (task.task.Status.toLowerCase()) {
                          case "completed":
                            return "100%";
                          case "in-progress":
                            return "50%";
                          case "on-hold":
                            return "25%";
                          default:
                            return "0%";
                        }
                      })(),
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Additional Details */}
            {task.task.Comments && (
              <div className="detail-section">
                <h4 className="section-title">Comments</h4>
                <div className="detail-row">
                  <p>{task.task.Comments}</p>
                </div>
              </div>
            )}
          </div>
        </CModalBody>
        <CModalFooter>
          {task.task.Status === "pending" && (
            <>
              <CButton
                color="success"
                onClick={() => handleTaskUpdate(task.task.TaskID)}
              >
                Accept Task
              </CButton>
              <CButton
                color="danger"
                onClick={() => handleTaskRejectUpdate(task.task.TaskID)}
              >
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

const customComponents = {
  Option: (props) => {
    const { data, innerRef, innerProps } = props;

    // Custom option rendering with JSX
    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: data.isSelected
            ? "#212631"
            : data.isFocused
            ? "#212631"
            : "transparent",
          color: "white",
          padding: "10px",
        }}
      >
        {data.label}
        <span
          style={{
            color:
              data.userType === "admin"
                ? "red"
                : data.userType === "employee"
                ? "#E2AA53"
                : "green",
          }}
        >
          {data.userType}
        </span>
      </div>
    );
  },
};
