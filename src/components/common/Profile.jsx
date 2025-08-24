import React, { useEffect, useState } from "react";
import "../../styles/Profile.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getProfile,
  updateProfile,
} from "../../services/ReduxController/profileSlice";
import { toast } from "react-toastify";
import { InfinitySpin } from "react-loader-spinner";
import { FaArrowLeft, FaPen } from "react-icons/fa";
import {
  CCloseButton,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
} from "@coreui/react";

const Profile = () => {
  const { profile, loading, error } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const Updatedispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);

  const id = localStorage.getItem("userId");
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    Name: "",
    PhoneNumber: "",
    Location: "",
    RoleLevel: "",
    profileImage: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfile(id));
  }, [dispatch]);

  const user = profile.employee;
  // console.log(user)
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };

      reader.readAsDataURL(file);
      // setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formData.Name,
      phoneNumber: formData.PhoneNumber,
      location: formData.Location,
      profileImage: formData.profileImage,
      jobTitle: formData.JobTitle || null,
      roleLevel: formData.RoleLevel || null,
      updatedAt: new Date(),
    };
    Updatedispatch(updateProfile({ id: id, data: data }));
    setVisible(false);
    setFormData({
      Name: "",
      PhoneNumber: "",
      Location: "",
      RoleLevel: "",
      profileImage: null,
    });
    // console.log(formData)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(formData);
  };

  if (loading) {
    return <InfinitySpin />;
  }

  return (
    <div className="profile-container">
      <div
        className="back_btn"
        onClick={() => {
          navigate(-1);
        }}
      >
        {<FaArrowLeft />} Back
      </div>
      {/* //className="profile-card" vvvvvvvvv */}
      <div>
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.ProfileImage ? (
              <img
                src={`http://localhost:5231/${user?.ProfileImage}`}
                alt={user?.Name}
              />
            ) : (
              <img src="profileImage.avif" alt={user?.Name} />
            )}
          </div>
          <div className="profile-header-info">
            <span className="profile-name">{user?.Name} </span>

            <p className="profile-department">{user?.JobTitle}</p>
          </div>

          <div className="Active-empty-section">
            <span></span>
            <span
              className={`status-badge ${
                user?.IsActive ? "active" : "inactive"
              }`}
            >
              {user?.IsActive ? "Active" : "Inactive"}
            </span>
            <span
              className="editProfile"
              onClick={() => {
                setVisible(true);
                setFormData({
                  Name: user?.Name || "",
                  PhoneNumber: user?.PhoneNumber || "",
                  Location: user?.Location || "",
                  RoleLevel: user?.RoleLevel || "",
                  profileImage: null,
                });
              }}
            >
              <FaPen color="white" />
            </span>
          </div>
        </div>

        <div className="profile-body">
          {/* Personal Information */}
          <div className="profile-section ">
            <h3 className="section-title profile_container">
              Personal Information
            </h3>
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
                <span> {user?.PhoneNumber || "Not provided"}</span>
              </div>
              <div className="profile-info-item">
                <strong>Location:</strong>
                <span> {user?.Location || "Not provided"}</span>
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
                <span className="user-type-badge">
                  {" "}
                  {user?.UserType.toUpperCase()}
                </span>
              </div>
              {user?.Manager && (
                <div className="profile-info-item">
                  <strong>Manager:</strong>
                  <span> {user?.Manager}</span>
                </div>
              )}
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
                <span>
                  {" "}
                  {new Date(user?.JoinDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="profile-info-item">
                <strong>Account Created:</strong>
                <span>
                  {" "}
                  {new Date(user?.CreatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="profile-info-item">
                <strong>Last Updated:</strong>
                <span>
                  {" "}
                  {new Date(user?.UpdatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="profile-info-item">
                <strong>Last Login:</strong>
                <span>
                  {" "}
                  {new Date(user?.LastLoginAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          <form
            method="POST"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="editProfileImage">
              <div className="profile-image-container">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="profile-preview"
                  />
                ) : (
                  <div className="profile-placeholder">{
                    user?.ProfileImage ? (
                      <img
                        src={`http://localhost:5231/${user?.ProfileImage}`}
                        alt={user?.Name}
                        className="profile-preview"
                      />
                    ) :
                    <i className="placeholder-icon">👤</i>}
                  </div>
                )}
              </div>

              <div className="image-upload">
                <label htmlFor="profileImage" className="upload-btn">
                  Upload Photo
                </label>
              </div>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
            </div>

            <label htmlFor="Name">Name</label>
            <div className="search-filter">
              <input
                placeholder="Name"
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                className="search-input"
              />
            </div>

            <label htmlFor="PhoneNumber">Phone Number</label>
            <div className="search-filter">
              <input
                type="number"
                onChange={handleChange}
                placeholder="Phone Number"
                name="PhoneNumber"
                className="search-input"
              />
            </div>

            <label htmlFor="Location">Location</label>
            <div className="search-filter">
              <input
                type="text"
                name="Location"
                value={formData.Location}
                onChange={handleChange}
                placeholder="Location"
                className="search-input"
              />
            </div>

            <label htmlFor="RoleLevel">Role Level</label>
            <div className="search-filter">
              <input
                type="text"
                name="RoleLevel"
                id=""
                placeholder="Role Level"
                onChange={handleChange}
                className="search-input"
              />
            </div>

            <div className="search-filter">
              <button type="Update" className="edit-btn">
                Update
              </button>
            </div>
          </form>
        </COffcanvasBody>
      </COffcanvas>
    </div>
  );
};

export default Profile;
