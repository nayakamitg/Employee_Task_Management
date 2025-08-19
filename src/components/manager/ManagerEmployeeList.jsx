import React, { use, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/EmployeeList.css";
import { useSelector, useDispatch } from "react-redux";
import HeartLoading from "../common/HeartLoading";
import { CAlert } from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@coreui/coreui/dist/css/coreui.min.css";

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
import { toast } from "react-toastify";
import {
  addEmployee,
  getEmployee,
  setsuccessemployee,
  updateEmployee
} from "../../services/ReduxController/employeeSlice";
import { getDepartment } from "../../services/ReduxController/OtherSlices";
import { InfinitySpin } from "react-loader-spinner";

const ManagerEmployeeList = () => {
  const token = localStorage.getItem("token");
  const [visible, setVisible] = useState(false);
  const [update, setUpdate] = useState(false);

  const empdispatch = useDispatch();
  const adddispatch = useDispatch();
  const updatedispatch = useDispatch();
  const dispatch = useDispatch();
  const { emploading, addloading, emperror, adderror, employees,successaddemployee,updateloading } = useSelector(
    (state) => state.employeeDetails
  );

  const [filterDepartment, setfilterDepartment ]=useState({
    search:"",
    department:"all",
    usertype:"all"
  });

  const { data, loading, error } = useSelector((state) => state.other);
  const departments = data.departments;
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
    Name: "",
    UserType: "",
    Manager: "",
    DepartmentId: "",
    IsActive: true,
    Salary: "",
    JobTitle: "",
  });
  console.log("Dep", departments);
  // Fetch departments
  useEffect(() => {
    if (token) {
      dispatch(getDepartment(token));
    }
  }, [token, dispatch]);

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
  };
console.log(formData)
  const handleReset = (e) => {
    e.preventDefault();
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
    });
  };
const [uid ,setUid]=useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
if(!update){
    const data = {
      name: formData.Name,
      userType: formData.UserType,
      departmentId: formData.DepartmentId,
      isActive: formData.IsActive,
      salary: formData.Salary,
      manager: formData.Manager,
    };

    adddispatch(setsuccessemployee());
    adddispatch(addEmployee(data));

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
    });
  }
  else
    {
      updatedispatch(updateEmployee({id:uid,data:formData}))
      setVisible(false)
      setUpdate(false)
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
    });

  }
  };
  const handleFilterchange=(e)=>{
    const {name,value}=e.target;
    setfilterDepartment({
      ...filterDepartment,
     [e.target.name]:e.target.value
    })

  }
  console.log(filterDepartment)
console.log(employees)
  useEffect(() => {
    empdispatch(getEmployee());
  }, [empdispatch]);

  useEffect(() => {
    if (emploading && !emperror) {
      toast.error("Failed");
    }

   
    if (emploading && emperror) {
      toast.success("SuccessFully Fetched");
    }
  }, [emperror, emploading]);

 useEffect(()=>{
      if(successaddemployee){
        toast.success("Success")
      }
    },[successaddemployee])


  if (emploading) {
    return <InfinitySpin/>;
  }
  return (
    <div className="employee-list">
      <div className="list-header">
        <h1>My Employees</h1>

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
              {/* Email */}
              <label htmlFor="Email">
                Employee Email<span style={{ color: "red" }}> *</span>
              </label>
              <div className="search-filter">
                <input
                disabled={update}
                  type="email"
                  name="Email"
                  placeholder="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                  className="search-input"
                />
              </div>

              {/* Password */}
              <label htmlFor="Password">
                Employee Password<span style={{ color: "red" }}> *</span>
              </label>
              <div className="search-filter">
                <input
                disabled={update}
                  type="password"
                  placeholder="Password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  required
                  className="search-input"
                />
              </div>

              {/* Name */}
              <label htmlFor="Name">
                Employee Name<span style={{ color: "red" }}> *</span>
              </label>
              <div className="search-filter">
                <input
                  type="text"
                  placeholder="Name"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  required
                  className="search-input"
                />
              </div>

              {/* User Type */}
              <label htmlFor="UserType">
                Employment Type<span style={{ color: "red" }}> *</span>
              </label>
              <div className="search-filter">
                <select
                  name="UserType"
                  value={formData.UserType}
                  onChange={handleChange}
                  className="filter-select"
                >
                  <option value="">Select</option>
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Department */}
              <label htmlFor="DepartmentId">
                Department<span style={{ color: "red" }}> *</span>
              </label>
              <div className="search-filter">
                <select
                  name="DepartmentId"
                  value={formData.DepartmentId}
                  onChange={handleChange}
                  className="filter-select"
                >
                  <option value="">Select Department</option>
                  {!loading &&
                    departments.map((dep) => (
                      <option key={dep.DepartmentID} value={dep.DepartmentID}>
                        {dep.DepartmentName}
                      </option>
                    ))}
                </select>
              </div>

              {/* Manager */}
              <label htmlFor="Manager">
                Manager<span style={{ color: "red" }}> *</span>
              </label>
              <div className="search-filter">
                <select
                  name="Manager"
                  value={formData.Manager}
                  onChange={handleChange}
                  disabled={
                    formData.UserType === "admin" ||
                    formData.UserType === "manager"
                  }
                  className="filter-select"
                >
                  <option value="">Select Manager</option>
                  {employees
                    .filter((emp) => emp.employee.UserType === "manager") // Only show managers
                    .map((employee) => (
                      <option key={employee.employee.UserID} value={employee.employee.UserID}>
                        {employee.employee.Name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Status */}
              <label htmlFor="IsActive">Status</label>
              <div className="search-filter">
                <select
                  name="IsActive"
                  value={formData.IsActive}
                  onChange={handleChange}
                  className="filter-select"
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
              </div>

              {/* Job Title & Salary */}
              <div className="search-filter">
                <div>
                  <label htmlFor="JobTitle">Job Title</label>
                  <input
                    type="text"
                    name="JobTitle"
                    placeholder="Job Title"
                    value={formData.JobTitle}
                    onChange={handleChange}
                    className="search-input1"
                  />
                </div>
                <div>
                  <label htmlFor="Salary">Salary</label>
                  <input
                    type="number"
                    name="Salary"
                    placeholder="Salary"
                    value={formData.Salary}
                    onChange={handleChange}
                    className="search-input1"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="search-filter">
                {
                  !update?
                <button disabled={addloading} type="submit" className="edit-btn">
                  Submit
                </button>:
                <button disabled={updateloading} type="submit" className="edit-btn">
                  Update
                </button>
}
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

        {/* <button className="add-employee-btn" onClick={() => {
          setVisible(true);
          setUpdate(false)}
          
          }>
          Add New Employee
        </button> */}
      </div>

      <div className="search-filter">
        <input
          type="text" 
          name="search"
          onChange={handleFilterchange}
          placeholder="Search employees..."
          className="search-input"
        />
        {/* <select name="department" onChange={handleFilterchange}  className="filter-select">
          <option value="all">All Departments</option>
          {
            departments.map((dep)=>
              <option key={dep.DepartmentID} value={dep.DepartmentID}>{dep.DepartmentName}</option>
            )
          }
        
        </select> */}
        {/* <select className="filter-select" onChange={handleFilterchange} name="usertype" value={filterDepartment.usertype}>
          <option value="all">All Employee</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </select> */}
      </div>

      <div className="employee-grid">
        {/* Employee cards would be mapped here */}
        {employees && employees.length > 0 ? (
          employees
            .filter((emp) => {
              // Match department filter
             
              // Match search text (check name, email, and job title)
              const searchTerm = filterDepartment.search.toLowerCase();
              const matchSearch =
                filterDepartment.search === "" ||
                emp.employee.Name.toLowerCase().includes(searchTerm) ||
                emp.employee.Email.toLowerCase().includes(searchTerm) ||
                (emp.employee.JobTitle && emp.employee.JobTitle.toLowerCase().includes(searchTerm));

              // Match user type filter
             
              return  matchSearch;
            }).filter(e=>(e.employee.Manager==localStorage.getItem("userId") && (e.employee.UserID!=localStorage.getItem("userId"))))
            .map((employee) => (
              <EmployeeCard key={employee.employee.UserID} setEditVisible={setVisible} setUid={setUid} setUpdate={setUpdate} setFormData={setFormData} employee={employee} />
            ))
        ) : (
          <h2>No employee available</h2>
        )}

        {/* <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard /> */}
      </div>
    </div>
  );
};

export default ManagerEmployeeList;

const EmployeeCard = ({ employee,setEditVisible,setFormData,setUpdate,setUid }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
const handleEdit=()=>{
  setEditVisible(true);
  setUid(employee.employee.UserID)
  setUpdate(true);
  setFormData({
      Email: employee.employee.Email,
      Password: "",
      Name: employee.employee.Name,
      UserType: employee.employee.UserType,
      Manager: employee.employee.Manager,
      DepartmentId: employee.employee.DepartmentID,
      IsActive: employee.employee.IsActive,
      Salary: employee.employee.Salary,
      JobTitle: employee.employee.JobTitle,
    });
}
const images=["/profileImage.avif","/profileImage1.avif","/profileImage2.avif","/profileImage3.png","/profileImage4.jpg","/profileImage5.avif","/profileImage6.png","/profileImage7.avif"];

// console.log(Math.floor(Math.random() * (3 - 0 + 1) + 0))

  return (
    <>
      <div className="employee-card">
        <div className="employee-header">
          <div className="employee-avatar">
            <img src={images[Math.floor(Math.random() * ((images.length-1) - 0 + 1) + 0)]} alt="" />
          </div>
          <div className="employee-info">
            <h3>{employee.employee.Name}</h3>
            <p>{employee.employee.JobTitle}</p>
          </div>
        </div>
        <div className="employee-details">
          <p>
            <span>Department:</span> {employee.employee.DepartmentName}
          </p>
          <p>
            <span>Tasks Completed:</span>{" "}
            {
              employee.tasks.filter((task) => task.task.Status == "completed")
                .length
            }
          </p>
          <p>
            <span>Active Tasks:</span>
            {
              employee.tasks.filter((task) => task.task.Status == "in-progress")
                .length
            }
          </p>
        </div>
        <div className="card-actions">
          <button onClick={handleEdit} className="edit-btn">Edit</button>
          <button className="view-btn" onClick={() => setVisible(true)}>
            View Details
          </button>
        </div>
      </div>

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        size="lg"
        backdrop="static"
        className="dark-theme-modal"
        dark
      >
        <CModalHeader className="modal-header">
          <CModalTitle className="modal-title">
            {employee.employee.Name}'s Details
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="employee-modal-content">
            <div className="employee-personal-info">
              <h4>Personal Information</h4>
              <p>
                <strong>Name:</strong> {employee.employee.Name}
              </p>
              <p>
                <strong>Email:</strong> {employee.employee.Email}
              </p>
              <p>
                <strong>Job Title:</strong> {employee.employee.JobTitle}
              </p>
              <p>
                <strong>User Type:</strong> {employee.employee.UserType}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {employee.employee.IsActive ? "Active" : "Inactive"}
              </p>
              <p>
                <strong>Salary:</strong> ${employee.employee.Salary}
              </p>
            </div>

            <div className="department-info">
              <h4>Department Information</h4>
              <p>
                <strong>Department:</strong> {employee.employee.DepartmentName}
              </p>
              <p>
                <strong>Manager:</strong>{" "}
                {employee.employee.ManagerName || "N/A"}
              </p>
            </div>

            <div className="tasks-info">
              <h4>Task Information</h4>
              <div className="task-summary">
                <p>
                  <strong>Total Tasks:</strong> {employee.tasks.length}
                </p>
                <p>
                  <strong>Completed Tasks:</strong>{" "}
                  {
                    employee.tasks.filter(
                      (task) => task.task.Status === "completed"
                    ).length
                  }
                </p>
                <p>
                  <strong>In Progress Tasks:</strong>{" "}
                  {
                    employee.tasks.filter(
                      (task) => task.task.Status === "in-progress"
                    ).length
                  }
                </p>
              </div>

              <h5>Current Tasks</h5>
              <div className="task-listdetailsPopup">
                {employee.tasks.map((task) => (
                  <div key={task.task.TaskID} className="task-item">
                    <p>
                      <strong>Task:</strong> {task.task.Title}
                    </p>
                    <p>
                      <strong>Status:</strong> {task.task.Status}
                    </p>
                    <p>
                      <strong>Due Date:</strong>{" "}
                      {new Date(task.task.DueDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};
