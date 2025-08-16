import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";
import HeartLoading from "../common/HeartLoading";
import axios from "axios";

const Authorize = ({ children, setUserType }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");  // To handle and display error message

  const checkAuthorization = async (token) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5231/api/Employee/Auth",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*"
          }
        }
      );

      if (response.status === 200) {
        localStorage.setItem("userType",response.data);
        setUserType(response.data)
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        localStorage.clear()
        setErrorMessage("Authorization failed, please try again.");
      }
    } catch (error) {
      setIsAuthenticated(false);
      localStorage.clear()
      setErrorMessage("Authorization failed. Please log in again.");
      console.error("Authorization Error: ", error); // log error for debugging
    } finally {
      const userType = localStorage.getItem("userType");
      setUserType(userType || "guest");  // fallback to "guest" if userType is null
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If no token, no need to call API
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    checkAuthorization(token);
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/");  // Redirect to login page or home if not authenticated
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return <HeartLoading />;
  }

  return (
    <>
      <Navbar />
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Error message display */}
      {children}
    </>
  );
};

export default Authorize;
