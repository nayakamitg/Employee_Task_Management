
-- -- Create Database
-- -- use EmployeesDb
-- -- drop database EmployeeTaskManagement

-- CREATE DATABASE EmployeeTaskManagement;
-- GO

-- USE EmployeeTaskManagement;
-- GO

-- -- Create Users Table (for both Admin and Employees)
-- CREATE TABLE Users (
--     UserID VARCHAR(100) PRIMARY KEY,
--     Email VARCHAR(100) UNIQUE NOT NULL,
--     Password VARCHAR(255) NOT NULL,
--     FirstName VARCHAR(50) NOT NULL,
--     LastName VARCHAR(50) NOT NULL,
--     UserType VARCHAR(20) CHECK (UserType IN ('admin', 'employee')) NOT NULL,
--     PhoneNumber VARCHAR(20),
--     Location VARCHAR(100),
--     ProfileImage VARCHAR(255),
--     CreatedAt DATETIME DEFAULT GETDATE(),
--     UpdatedAt DATETIME DEFAULT GETDATE(),
--     LastLoginAt DATETIME,
--     IsActive BIT DEFAULT 1
-- );

-- -- Create Departments Table
-- CREATE TABLE Departments (
--     DepartmentID VARCHAR(100) PRIMARY KEY,
--     DepartmentName VARCHAR(100) NOT NULL,
--     Description VARCHAR(500),
--     CreatedAt DATETIME DEFAULT GETDATE(),
--     UpdatedAt DATETIME DEFAULT GETDATE(),
--     IsActive BIT DEFAULT 1
-- );

-- -- Create Employee Details Table
-- CREATE TABLE EmployeeDetails (
--     EmployeeID int IDENTITY(1,1) PRIMARY KEY,
--     UserID VARCHAR(100) UNIQUE,
--     DepartmentID VARCHAR(100),
--     JobTitle VARCHAR(100) NOT NULL,
--     JoinDate DATE NOT NULL,
--     RoleLevel VARCHAR(50),
--     ReportsTo INT,
--     Salary DECIMAL(12,2),
--     CreatedAt DATETIME DEFAULT GETDATE(),
--     UpdatedAt DATETIME DEFAULT GETDATE(),
--     FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
--     FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID) ON DELETE SET NULL,
-- );

-- -- Create Projects Table
-- CREATE TABLE Projects (
--     ProjectID INT IDENTITY(1,1) PRIMARY KEY,
--     ProjectName VARCHAR(100) NOT NULL,
--     Description VARCHAR(500),
--     StartDate DATE,
--     EndDate DATE,
--     Status VARCHAR(20) CHECK (Status IN ('Planning', 'Active', 'Completed', 'On-hold')) DEFAULT 'Active',
--     CreatedAt DATETIME DEFAULT GETDATE(),
--     UpdatedAt DATETIME DEFAULT GETDATE(),
--     IsActive BIT DEFAULT 1
-- );

-- -- Create Tasks Table
-- CREATE TABLE Tasks (
--     TaskID INT IDENTITY(1,1) PRIMARY KEY,
--     ProjectID INT,
--     Title VARCHAR(200) NOT NULL,
--     Description TEXT,
--     AssignedTo varchar(100),
--     AssignedBy varchar(100),
--     Priority VARCHAR(20) CHECK (Priority IN ('Low', 'Medium', 'High')) DEFAULT 'Medium',
--     Status VARCHAR(20) CHECK (Status IN ('Pending', 'In-progress', 'Completed', 'On-hold','Rejected')) DEFAULT 'Pending',
--     StartDate DATETIME DEFAULT GETDATE(),
--     Deadline DATETIME,
--     CompletedDate DATETIME,
--     CreatedAt DATETIME DEFAULT GETDATE(),
--     UpdatedAt DATETIME DEFAULT GETDATE(),
--     IsActive BIT DEFAULT 1,
--     FOREIGN KEY (ProjectID) REFERENCES Projects(ProjectID) ON DELETE SET NULL,
--     FOREIGN KEY (AssignedTo) REFERENCES Users(UserID) ON DELETE SET NULL,
--     FOREIGN KEY (AssignedBy) REFERENCES Users(UserID) ON DELETE SET NULL
-- );

-- -- Create Task Comments Table
-- CREATE TABLE TaskComments (
--     CommentID INT IDENTITY(1,1) PRIMARY KEY,
--     TaskID INT,
--     UserID VARCHAR(100),
--     Comment TEXT NOT NULL,
--     CreatedAt DATETIME DEFAULT GETDATE(),
--     UpdatedAt DATETIME DEFAULT GETDATE(),
--     FOREIGN KEY (TaskID) REFERENCES Tasks(TaskID) ON DELETE CASCADE,
--     FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
-- );

-- -- Create Task History Table
-- CREATE TABLE TaskHistory (
--     HistoryID INT IDENTITY(1,1) PRIMARY KEY,
--     TaskID INT,
--     ChangedBy VARCHAR(100),
--     ChangeType VARCHAR(50) NOT NULL,
--     OldValue VARCHAR(MAX),
--     NewValue VARCHAR(MAX),
--     CreatedAt DATETIME DEFAULT GETDATE(),
--     FOREIGN KEY (TaskID) REFERENCES Tasks(TaskID) ON DELETE CASCADE,
--     FOREIGN KEY (ChangedBy) REFERENCES Users(UserID) ON DELETE SET NULL
-- );

-- -- Create Performance Metrics Table
-- CREATE TABLE PerformanceMetrics (
--     MetricID INT IDENTITY(1,1) PRIMARY KEY,
--     EmployeeID INT,
--     TasksCompleted INT DEFAULT 0,
--     TasksInProgress INT DEFAULT 0,
--     AvgCompletionTime DECIMAL(10,2), -- in hours
--     PerformanceScore DECIMAL(3,2),
--     ReviewPeriod DATE,
--     CreatedAt DATETIME DEFAULT GETDATE(),
--     UpdatedAt DATETIME DEFAULT GETDATE(),
--     FOREIGN KEY (EmployeeID) REFERENCES EmployeeDetails(EmployeeID) ON DELETE CASCADE
-- );

-- -- Create Notifications Table
-- CREATE TABLE Notifications (
--     NotificationID INT IDENTITY(1,1) PRIMARY KEY,
--     UserID VARCHAR(100),
--     Title VARCHAR(200) NOT NULL,
--     Message TEXT,
--     Type VARCHAR(50),
--     IsRead BIT DEFAULT 0,
--     CreatedAt DATETIME DEFAULT GETDATE(),
--     FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
-- );

-- -- Create Employee Teams Table
-- CREATE TABLE Teams (
--     TeamID INT IDENTITY(1,1) PRIMARY KEY,
--     TeamName VARCHAR(100) NOT NULL,
--     TeamLeadID varchar(100),
--     DepartmentID varchar(100),
--     Description VARCHAR(500),
--     CreatedAt DATETIME DEFAULT GETDATE(),
--     UpdatedAt DATETIME DEFAULT GETDATE(),
--     FOREIGN KEY (TeamLeadID) REFERENCES Users(UserID) ON DELETE SET NULL,
--     FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID) ON DELETE SET NULL
-- );

-- -- Create Team Members Junction Table
-- CREATE TABLE TeamMembers (
--     TeamID INT,
--     UserID VARCHAR(100),
--     JoinDate DATE DEFAULT GETDATE(),
--     PRIMARY KEY (TeamID, UserID),
--     FOREIGN KEY (TeamID) REFERENCES Teams(TeamID) ON DELETE CASCADE,
--     FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
-- );

-- -- Indexes for better performance
-- CREATE INDEX idx_tasks_assigned_to ON Tasks(AssignedTo);
-- CREATE INDEX idx_tasks_status ON Tasks(Status);
-- CREATE INDEX idx_employee_department ON EmployeeDetails(DepartmentID);
-- CREATE INDEX idx_task_history_task ON TaskHistory(TaskID);
-- CREATE INDEX idx_notifications_user ON Notifications(UserID, IsRead);
-- CREATE INDEX idx_team_members_user ON TeamMembers(UserID);

-- GO

-- -- Create view for Task Analytics
-- CREATE VIEW vw_TaskAnalytics AS
-- SELECT 
--     t.Status,
--     t.Priority,
--     d.DepartmentName,
--     COUNT(*) as TaskCount,
--     AVG(DATEDIFF(HOUR, t.StartDate, t.CompletedDate)) as AvgCompletionTime
-- FROM Tasks t
-- JOIN Users u ON t.AssignedTo = u.UserID
-- JOIN EmployeeDetails ed ON u.UserID = ed.UserID
-- JOIN Departments d ON ed.DepartmentID = d.DepartmentID
-- GROUP BY t.Status, t.Priority, d.DepartmentName;

-- GO
-- -- Create view for Employee Performance
-- CREATE VIEW vw_EmployeePerformance AS
-- SELECT 
--     u.FirstName + ' ' + u.LastName as EmployeeName,
--     d.DepartmentName,
--     COUNT(t.TaskID) as TotalTasks,
--     SUM(CASE WHEN t.Status = 'completed' THEN 1 ELSE 0 END) as CompletedTasks,
--     SUM(CASE WHEN t.Status = 'in-progress' THEN 1 ELSE 0 END) as InProgressTasks,
--     AVG(CAST(pm.PerformanceScore as DECIMAL(3,2))) as AvgPerformanceScore
-- FROM Users u
-- JOIN EmployeeDetails ed ON u.UserID = ed.UserID
-- JOIN Departments d ON ed.DepartmentID = d.DepartmentID
-- LEFT JOIN Tasks t ON u.UserID = t.AssignedTo
-- LEFT JOIN PerformanceMetrics pm ON ed.EmployeeID = pm.EmployeeID
-- WHERE u.UserType = 'employee'
-- GROUP BY u.FirstName, u.LastName, d.DepartmentName;





-- select * from Users left join EmployeeDetails on Users.UserID=EmployeeDetails.UserID left join Tasks on Users.UserID=Tasks.AssignedTo;


















-- Create Database
use EmployeesDb
go
drop database EmployeeTaskManagement
go
CREATE DATABASE EmployeeTaskManagement;
GO

USE EmployeeTaskManagement;
GO

-- Create Users Table (for both Admin and Employees)
CREATE TABLE Users (
    UserID VARCHAR(100) PRIMARY KEY,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    UserType VARCHAR(20) CHECK (UserType IN ('admin', 'employee')) NOT NULL,
    PhoneNumber VARCHAR(20),
    Location VARCHAR(100),
    ProfileImage VARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    LastLoginAt DATETIME,
    IsActive BIT DEFAULT 1
);

-- Create Departments Table
CREATE TABLE Departments (
    DepartmentID VARCHAR(100) PRIMARY KEY,
    DepartmentName VARCHAR(100) NOT NULL,
    Description VARCHAR(500),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    IsActive BIT DEFAULT 1
);

-- Create Employee Details Table
CREATE TABLE EmployeeDetails (
    EmployeeID int IDENTITY(1,1) PRIMARY KEY,
    UserID VARCHAR(100) UNIQUE,
    DepartmentID VARCHAR(100),
    JobTitle VARCHAR(100) NOT NULL,
    JoinDate DATE NOT NULL,
    RoleLevel VARCHAR(50),
    ReportsTo INT,
    Salary DECIMAL(12,2),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID) ON DELETE SET NULL,
);

-- Create Projects Table
CREATE TABLE Projects (
    ProjectID INT IDENTITY(1,1) PRIMARY KEY,
    ProjectName VARCHAR(100) NOT NULL,
    Description VARCHAR(500),
    StartDate DATE,
    EndDate DATE,
    Status VARCHAR(20) CHECK (Status IN ('Planning', 'Active', 'Completed', 'On-hold')) DEFAULT 'Active',
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    IsActive BIT DEFAULT 1
);

-- Create Tasks Table
CREATE TABLE Tasks (
    TaskID INT IDENTITY(1,1) PRIMARY KEY,
    ProjectID INT,
    Title VARCHAR(200) NOT NULL,
    Description TEXT,
    AssignedTo varchar(100),
    AssignedBy varchar(100),
    Priority VARCHAR(20) CHECK (Priority IN ('Low', 'Medium', 'High')) DEFAULT 'Medium',
    Status VARCHAR(20) CHECK (Status IN ('Pending', 'In-progress', 'Completed', 'On-hold','Rejected')) DEFAULT 'Pending',
    StartDate DATETIME DEFAULT GETDATE(),
    Deadline DATETIME,
    CompletedDate DATETIME,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    IsActive BIT DEFAULT 1,
    FOREIGN KEY (ProjectID) REFERENCES Projects(ProjectID) ON DELETE SET NULL,
    FOREIGN KEY (AssignedTo) REFERENCES Users(UserID) ON DELETE NO ACTION,
    FOREIGN KEY (AssignedBy) REFERENCES Users(UserID) ON DELETE SET NULL
);

-- Create Task Comments Table
CREATE TABLE TaskComments (
    CommentID INT IDENTITY(1,1) PRIMARY KEY,
    TaskID INT,
    UserID VARCHAR(100),
    Comment TEXT NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (TaskID) REFERENCES Tasks(TaskID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

-- Create Task History Table
CREATE TABLE TaskHistory (
    HistoryID INT IDENTITY(1,1) PRIMARY KEY,
    TaskID INT,
    ChangedBy VARCHAR(100),
    ChangeType VARCHAR(50) NOT NULL,
    OldValue VARCHAR(MAX),
    NewValue VARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (TaskID) REFERENCES Tasks(TaskID) ON DELETE CASCADE,
    FOREIGN KEY (ChangedBy) REFERENCES Users(UserID) ON DELETE SET NULL
);

-- Create Performance Metrics Table
CREATE TABLE PerformanceMetrics (
    MetricID INT IDENTITY(1,1) PRIMARY KEY,
    EmployeeID INT,
    TasksCompleted INT DEFAULT 0,
    TasksInProgress INT DEFAULT 0,
    AvgCompletionTime DECIMAL(10,2), -- in hours
    PerformanceScore DECIMAL(3,2),
    ReviewPeriod DATE,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (EmployeeID) REFERENCES EmployeeDetails(EmployeeID) ON DELETE CASCADE
);

-- Create Notifications Table
CREATE TABLE Notifications (
    NotificationID INT IDENTITY(1,1) PRIMARY KEY,
    UserID VARCHAR(100),
    Title VARCHAR(200) NOT NULL,
    Message TEXT,
    Type VARCHAR(50),
    IsRead BIT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

-- Create Employee Teams Table
CREATE TABLE Teams (
    TeamID INT IDENTITY(1,1) PRIMARY KEY,
    TeamName VARCHAR(100) NOT NULL,
    TeamLeadID varchar(100),
    DepartmentID varchar(100),
    Description VARCHAR(500),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (TeamLeadID) REFERENCES Users(UserID) ON DELETE SET NULL,
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID) ON DELETE SET NULL
);

-- Create Team Members Junction Table
CREATE TABLE TeamMembers (
    TeamID INT,
    UserID VARCHAR(100),
    JoinDate DATE DEFAULT GETDATE(),
    PRIMARY KEY (TeamID, UserID),
    FOREIGN KEY (TeamID) REFERENCES Teams(TeamID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);


GO

