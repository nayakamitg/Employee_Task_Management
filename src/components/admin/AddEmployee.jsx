import React, { useState } from 'react';
import '../../styles/AddEmployee.css';

const AddEmployee = ({ onClose }) => {
  const [formData, setFormData] = useState({
 
    // Employee Details
    employeeId: '',
    departmentId: '',
    jobTitle: '',
    joinDate: '',
    roleLevel: '',
    reportsTo: '',
    salary: '',
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const departments = [
    { id: '1', name: 'IT' },
    { id: '2', name: 'HR' },
    { id: '3', name: 'Marketing' },
    { id: '4', name: 'Sales' },
    { id: '5', name: 'Finance' }
  ];

  const roleLevels = [
    'Junior',
    'Mid-Level',
    'Senior',
    'Team Lead',
    'Manager',
    'Director'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    // User Details Validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Employee Details Validation
    if (!formData.departmentId) newErrors.departmentId = 'Department is required';
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
    if (!formData.joinDate) newErrors.joinDate = 'Join date is required';
    if (!formData.roleLevel) newErrors.roleLevel = 'Role level is required';
    if (formData.salary && isNaN(formData.salary)) newErrors.salary = 'Salary must be a number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
      
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Here you would typically make an API call to your backend
        console.log('Employee data to submit:', formData);
        onClose();
      } catch (error) {
        setErrors({
          submit: 'Failed to add employee. Please try again.'
        });
      }
    }
  };

  return (
    <div className="aef-overlay">
      <div className="aef-modal">
        <div className="aef-header">
          <h2>Add New Employee</h2>
          <button className="aef-close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="aef-form">
          {errors.submit && (
            <div className="error-alert">{errors.submit}</div>
          )}

          <div className="aef-form-sections">

            {/* <div className="aef-form-section">
              <h3>Personal Information</h3>
              
              <div className="aef-profile-section">
                <div className="aef-profile-container">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile preview" className="aef-profile-preview" />
                  ) : (
                    <div className="aef-profile-placeholder">
                      <i className="placeholder-icon">👤</i>
                    </div>
                  )}
                </div>
                <div className="aef-image-upload">
                  <label htmlFor="profileImage" className="aef-upload-btn">
                    Upload Photo
                  </label>
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="aef-file-input"
                  />
                </div>
              </div>

              <div className="aef-form-row">
                <div className="aef-form-group">
                  <label htmlFor="firstName">First Name*</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? 'aef-error' : ''}
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name*</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Initial Password*</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>
            </div> */}

            <div className="form-section">
              <h3>Employment Details</h3>

              <div className="form-row">

<div className="form-group">
                  <label htmlFor="employeeId">Employee*</label>
                  <select
                    id="departmentId"
                    name="departmentId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    className={errors.employeeId ? 'error' : ''}
                  >
                    <option value="">Select Employee</option>
                    {departments.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name}
                      </option>
                    ))}
                  </select>
                  {errors.departmentId && <span className="error-message">{errors.departmentId}</span>}
                </div>


                <div className="form-group">
                  <label htmlFor="departmentId">Department*</label>
                  <select
                    id="departmentId"
                    name="departmentId"
                    value={formData.departmentId}
                    onChange={handleChange}
                    className={errors.departmentId ? 'error' : ''}
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                  {errors.departmentId && <span className="error-message">{errors.departmentId}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="roleLevel">Role Level*</label>
                  <select
                    id="roleLevel"
                    name="roleLevel"
                    value={formData.roleLevel}
                    onChange={handleChange}
                    className={errors.roleLevel ? 'error' : ''}
                  >
                    <option value="">Select Role Level</option>
                    {roleLevels.map(level => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  {errors.roleLevel && <span className="error-message">{errors.roleLevel}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="jobTitle">Job Title*</label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className={errors.jobTitle ? 'error' : ''}
                  />
                  {errors.jobTitle && <span className="error-message">{errors.jobTitle}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="joinDate">Join Date*</label>
                  <input
                    type="date"
                    id="joinDate"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleChange}
                    className={errors.joinDate ? 'error' : ''}
                  />
                  {errors.joinDate && <span className="error-message">{errors.joinDate}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="salary">Salary</label>
                  <input
                    type="number"
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className={errors.salary ? 'error' : ''}
                    step="0.01"
                  />
                  {errors.salary && <span className="error-message">{errors.salary}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="reportsTo">Reports To</label>
                  <select
                    id="reportsTo"
                    name="reportsTo"
                    value={formData.reportsTo}
                    onChange={handleChange}
                  >
                    <option value="">Select Manager</option>
                    {/* You would typically populate this from your API */}
                    <option value="1">John Doe (Manager)</option>
                    <option value="2">Jane Smith (Director)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="aef-form-actions">
            <button type="button" className="aef-cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="aef-submit-btn">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
