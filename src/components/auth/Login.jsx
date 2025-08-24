import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "../../styles/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { LoginThunk } from "../../services/ReduxController/loginSlice";
import { toast } from "react-toastify";
import HeartLoading from "../common/HeartLoading";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error, islogin, loading } = useSelector((state) => state.login);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validation logic
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setErrors({});
      dispatch(
        LoginThunk({
          email: formData.email.trim(),
          password: formData.password,
        })
      );
    }
  };

  // Handle login error
  useEffect(() => {
    if (error) {
      toast.error(error);
      localStorage.clear();
    }
  }, [error]);

  // Handle login success
  useEffect(() => {
    if (islogin && data?.token) {
      console.log("Data:",data)
      localStorage.setItem("token", data.token);
      localStorage.setItem("userType", data.userType);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("profileImage", data.profileImage);
      toast.success("Successfully Logged In");
      navigate("/dashboard", { replace: true });
    }
  }, [islogin, data, navigate]);

  return (
    <div className="login-container">
      {loading && <HeartLoading />}
      {!loading && (
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Please sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-group">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={errors.email ? "error" : ""}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={errors.password ? "error" : ""}
                  autoComplete="current-password"
                />
              </div>
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </label>
              <NavLink to="/forgot-password" className="forgot-password">
                Forgot Password?
              </NavLink>
            </div>

            <button type="submit" className="login-btn">
              Sign In
            </button>

          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
