import React, { useEffect, useState } from 'react';
import '../../styles/UserRegistration.css';
import { useDispatch,useSelector } from 'react-redux';
import { addUsers,getUsers } from '../../services/ReduxController/userSlice';
import { NavLink } from 'react-router-dom';


const UserRegistration = () => {
    const dispatch = useDispatch();
     
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    location: '',
    userType: 'employee',
    profileImage: null
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [base64Image, setBase64Image] = useState("");

  const validateForm = () => {
    const newErrors = {};
    
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
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result;

      setImagePreview(base64Image);

      setFormData((prev) => ({
        ...prev,
        profileImage: base64Image, 
      }));
    };

    reader.readAsDataURL(file);
  }
};

const { users, loading, error } = useSelector(state => state.User);

// dispatch(getUsers());

useEffect(() => {
  dispatch(Loading('true')); // Show loading
  dispatch(getUsers());
  dispatch(Loading('false')); // Hide loading after fetching users
}, []);



const handleSubmit = (e) => {
  e.preventDefault();

  dispatch(Loading('true')); // Show loading
dispatch(getUsers()); 
  dispatch(addUsers(formData)); 
  if (validateForm()) {
setFormData({ firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    location: '',
    userType: 'employee',
    profileImage: null});
    setImagePreview(null);

    setTimeout(() => {
      dispatch(Loading('false')); // Hide loading after delay
    }, 2000);
  } else {
    dispatch(Loading('false')); // Hide loading if form is invalid
  }
};


const handleReset = () => {
  setImagePreview(null);
  setFormData({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    location: '',
    userType: 'employee',
    profileImage: null
  });}

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h2>Create New Account</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="profile-image-section">
            <div className="profile-image-container">
              {imagePreview ? (
                <img src={imagePreview} alt="Profile preview" className="profile-preview" />
              ) : (
                <div className="profile-placeholder">
                  <i className="placeholder-icon">👤</i>
                </div>
              )}
            </div>
            <div className="image-upload">
              <label htmlFor="profileImage" className="upload-btn">
                Upload Photo
              </label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstName">First Name*</label>
              <input
              placeholder='Enter First Name'
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name*</label>
              <input
                placeholder='Enter Last Name'
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address*</label>
              <input
              placeholder='Enter Email Address'
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
              placeholder='Enter Phone Number'
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password*</label>
              <input
              placeholder='Enter Password'
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password*</label>
              <input
              placeholder='Confirm Password'
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <div className="form-group">
              {/* <label htmlFor="jobTitle">Job Title*</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className={errors.jobTitle ? 'error' : ''}
              /> */}
              {errors.jobTitle && <span className="error-message">{errors.jobTitle}</span>}
            </div>

            <div className="form-group">
              {/* <label htmlFor="department">Department*</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={errors.department ? 'error' : ''}
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select> */}
              {errors.department && <span className="error-message">{errors.department}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
              placeholder='Enter Location'
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>
<div className="Have-account-button">
          <div className="form-actions">
            <button type="submit"  className="submit-btn">
              Create Account
            </button>
            <button onClick={handleReset} type="button" className="cancel-btn">
              Reset
            </button>
               </div> 
          <div>Already have a Account:  <span><NavLink to="/">Login</NavLink></span></div>
       
         </div>
        </form> 
       
       
      </div>
    </div>
  );
};

export default UserRegistration;
