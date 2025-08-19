import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/TaskDetail.css';
import HeartLoading from '../common/HeartLoading';
import { toast } from 'react-toastify';

const TaskDetail = () => {
  const navigate = useNavigate();
 
  if (loading) {
    return <HeartLoading />;
  }

  return (
    <div className="task-detail-container">
      <div className="task-detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to Tasks
        </button>
        <span className={`task-status ${task.task.Status.toLowerCase()}`}>
          {task.task.Status}
        </span>
      </div>

      <div className="task-detail-content">
        <div className="task-detail-title">
          <h1>{task.task.Title}</h1>
          <span className={`task-priority ${task.task.Priority.toLowerCase()}`}>
            {task.task.Priority} Priority
          </span>
        </div>

        <div className="task-info-grid">
          <div className="info-card">
            <h3>Task Details</h3>
            <p>{task.task.Description}</p>
          </div>

          <div className="info-card">
            <h3>Timeline</h3>
            <div className="date-info">
              <p><strong>Start Date:</strong> {new Date(task.task.StartDate).toLocaleDateString()}</p>
              <p><strong>Due Date:</strong> {new Date(task.task.Deadline).toLocaleDateString()}</p>
              {task.task.CompletedDate && (
                <p><strong>Completed:</strong> {new Date(task.task.CompletedDate).toLocaleDateString()}</p>
              )}
            </div>
          </div>

          <div className="info-card">
            <h3>Assignment</h3>
            <p><strong>Assigned By:</strong> {task.task.AssignedBy}</p>
            <p><strong>Created:</strong> {new Date(task.task.CreatedAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="task-comments-section">
          <h3>Comments & Updates</h3>
          <div className="comments-list">
            {task.comments && task.comments.length > 0 ? (
              task.comments.map((comment, index) => (
                <div key={index} className="comment-item">
                  <p>{comment.comment}</p>
                  <div className="comment-meta">
                    <span>{comment.commentedBy}</span>
                    <span>{new Date(comment.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-comments">No comments yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
