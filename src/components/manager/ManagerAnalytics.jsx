import { useEffect, useState } from 'react';
import '../../styles/Analytics.css';
import { useDispatch, useSelector } from 'react-redux';
import { getStats } from '../../services/ReduxController/OtherSlices';
import { InfinitySpin } from 'react-loader-spinner';
import { BasicPie, SimpleLineChart } from '../admin/Analytics';
import { toast } from 'react-toastify';
import { EmpAnalyticsDetails } from '../employee/EmployeeAnalytics';


// ------------------- ManagerAnalytics -------------------
const ManagerAnalytics = () => {
  const userId = localStorage.getItem("userId");
  const [employeeFilter, setEmployeeFilter] = useState(userId);

  const { data } = useSelector((state) => state.other);
  const states = data?.states || {};

  return (
    <div className="analytics">
      <div className="selectandtitle">
        <h1 className="analytics-title">Analytics Dashboard</h1>

        <select
          name="Employees"
          onChange={(e) => setEmployeeFilter(e.target.value)}
          className="employee-filter"
        >
          <option value={userId}>Select Employee</option>
          {states?.employees
            ?.filter((emp) => emp.manager === userId && emp.userId !== userId)
            .map((emp) => (
              <option key={emp.userId} value={emp.userId}>
                {emp.name}
              </option>
            ))}
        </select>
 </div>
{
  employeeFilter===userId?
        <ManagerAnalyticsDetails userId={employeeFilter} managerId={userId} />:
        <EmpAnalyticsDetails userId={employeeFilter}/>

}
      </div>
   
  );
};

export default ManagerAnalytics;


// ------------------- ManagerAnalyticsDetails -------------------
export const ManagerAnalyticsDetails = ({ userId, managerId }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.other);

  const states = data?.states || {};

  const managedEmployees = states?.employees?.filter((emp) => emp.manager === managerId) || []

 
  const ActiveTask = filterTasks(null, true);
  const PendingTask = filterTasks("pending");
  const CompletedTask = filterTasks("completed");
  const InProgressTask = filterTasks("in-progress");

  useEffect(() => {
    dispatch(getStats());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("Error fetching stats");
    }
  }, [error]);

  if (loading) return <InfinitySpin />;

  return (
    <>
      {/* Metrics cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Total Employees</h3>
          <div className="metric-value">{managedEmployees.length}</div>
        </div>

        <div className="metric-card">
          <h3>Total Tasks</h3>
          <div className="metric-value">{TotalTaskCount}</div>
        </div>

        <div className="metric-card">
          <h3>Total Pending Tasks</h3>
          <div className="metric-value">{PendingTask.length}</div>
        </div>

        <div className="metric-card">
          <h3>Total Active Tasks</h3>
          <div className="metric-value">{ActiveTask.length}</div>
        </div>

        <div className="metric-card">
          <h3>Total Completed Tasks</h3>
          <div className="metric-value">{CompletedTask.length}</div>
        </div>

        <div className="metric-card">
          <h3>Total In Progress Tasks</h3>
          <div className="metric-value">{InProgressTask.length}</div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="analytics-details">
        <div className="department-stats">
          <h2>Employee and Task count</h2>
          <BasicPie dataset={dataset} />
        </div>
      </div>

      {/* Line Chart */}
      <div className="performance-trends">
        <h2>Tasks and Overdue Tasks</h2>
        <SimpleLineChart task={ActiveTask} />
      </div>
    </>
  );
};
