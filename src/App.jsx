import { BrowserRouter as Router, Routes, Route, data } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import AdminDashboard from './components/admin/Dashboard';
import EmployeeList from './components/admin/EmployeeList';
import TaskList from './components/admin/TaskList';
import Analytics from './components/admin/Analytics';
import EmployeeDashboard from './components/employee/Dashboard';
import EmployeeDetail from './components/admin/EmployeeDetail';
import './styles/globals.css';
import UserRegistration from './components/auth/UserRegistration';
import { LifeLine } from 'react-loading-indicators';
import { useSelector} from 'react-redux';
import Login from './components/auth/Login';
import Authorize from './components/auth/Authorize';
import NotFound from './components/common/NotFound';
import { useEffect, useState } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import HeartLoading from './components/common/HeartLoading';
import EmpTaskList from './components/employee/EmpTaskList';

function App() {
  
const loading=useSelector((state) => state.Loading);
const {isLoggedIn,user}=useSelector((state) => state.login);
const [userType, setUserType] = useState("");
useEffect(() => {
  setUserType(localStorage.getItem('userType'));
}, []);
 


  return (
    <Router>
      <div className="app">

        <main className="main-content">
          <Routes>
            
            <Route path="/register" element={<UserRegistration />} />
            <Route path="/" element={
              <Login />
              } />
           
            <Route path="/dashboard" element={
              <Authorize setUserType={setUserType}>
              {userType === "admin" || userType === "manager" ? (
        <AdminDashboard />
      ) : (
        <EmployeeDashboard />
      )}
              </Authorize>

              } />

             <Route path="/tasks" element={
              <Authorize setUserType={setUserType}>
              {userType === "admin" || userType === "manager" ? (
        <TaskList />
      ) : (
        <EmpTaskList />
      )}
              </Authorize>

              } />

               <Route path="/employees" element={
              <Authorize setUserType={setUserType}>
             <EmployeeList />
              </Authorize>
                 } />

            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <HeartLoading loading={loading}/>
        </main>
      </div>
            <ToastContainer
position="top-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition={Bounce}
/>
    </Router>
  )
}

export default App
