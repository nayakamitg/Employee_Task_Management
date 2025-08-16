import React from 'react';
import '../../styles/Analytics.css';

const Analytics = () => {
  return (
    <div className="analytics">
      <h1 className="analytics-title">Analytics Dashboard</h1>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Task Completion Rate</h3>
          <div className="metric-value">85%</div>
          <div className="metric-chart">
            {/* Chart component would go here */}
          </div>
        </div>
        
        <div className="metric-card">
          <h3>Employee Performance</h3>
          <div className="metric-value">4.2/5.0</div>
          <div className="metric-chart">
            {/* Chart component would go here */}
          </div>
        </div>
        
        <div className="metric-card">
          <h3>Active Projects</h3>
          <div className="metric-value">12</div>
          <div className="metric-chart">
            {/* Chart component would go here */}
          </div>
        </div>
        
        <div className="metric-card">
          <h3>Average Task Duration</h3>
          <div className="metric-value">3.5 days</div>
          <div className="metric-chart">
            {/* Chart component would go here */}
          </div>
        </div>
      </div>

      <div className="analytics-details">
        <div className="performance-trends">
          <h2>Performance Trends</h2>
          <div className="trend-chart">
            {/* Larger chart component would go here */}
          </div>
        </div>
        
        <div className="department-stats">
          <h2>Department Statistics</h2>
          <div className="stats-table">
            {/* Department statistics table would go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
