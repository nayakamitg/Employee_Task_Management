import { useEffect, useState } from 'react';
import '../../styles/Analytics.css';
import { useDispatch,useSelector } from 'react-redux';
import { getStats } from '../../services/ReduxController/OtherSlices';
import { InfinitySpin } from 'react-loader-spinner';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts';
import { LineChart } from '@mui/x-charts/LineChart';
import { ManagerAnalyticsDetails } from '../manager/ManagerAnalytics';
import { EmpAnalyticsDetails } from '../employee/EmployeeAnalytics';




const Analytics = () => {
  const [manager, setManager]=useState("all")
  const [employee, setEmployee]=useState("all")
 const {data,loading,error} = useSelector((state)=>state.other);
  return (
    <div className="analytics">
      <div className="selectandtitle">
      <h1 className="analytics-title">Analytics Dashboard</h1>
      <select name="manager" onChange={(e)=>setManager(e.target.value)} className='employee-filter' id="">
         <option value="all">Select Manager</option>
       { data?.states?.employees?.filter((emp)=>emp.usertype==="manager").map((emp)=>
        <option value={emp.userId}>{emp.name}</option>
      )
       }
      </select>
      <select name="manager" disabled={manager==="all"?true:false} onClick={(e)=>setEmployee(e.target.value)} className="employee-filter" id="">
        <option value="all">Select Employee</option>
        {
          data?.states?.employees?.filter((emp)=>(emp.manager===manager) && (emp.userId!==manager)).map((emp)=><option value={emp.userId}>{emp.name}</option>)
        }
        
      </select>
      </div>

      {
        manager==="all"?<AnalyticsDetails/>:manager!=="all"&&employee!=="all"?<EmpAnalyticsDetails userId={employee}/>:
        <ManagerAnalyticsDetails userId={manager} managerId={manager}/>
      }


    </div>
  );
};

export default Analytics;



export function TickPlacementBars({states}) {
const dataset = [];

states?.department?.filter((e)=>e.departmentName!=null).map((dep)=>{
  dataset.push({
    EmployeesCount:dep.employees,
    Department:dep.departmentName
  })
})

  const chartSetting = {
  yAxis: [
    {
      label: 'No. of Employees',
      width: 60,

    },
  ],
  series: [{ dataKey: 'EmployeesCount', label: 'Employees'}],
  height: 400,
  width:600,
  margin: { left: 10,bottom:40 },
};


  return (
    <div>
   
      <BarChart
        dataset={dataset}

        xAxis={[{ dataKey: 'Department',tickLabelStyle: {
            angle: -3, 
            scaleType: 'band',
            fontSize: 9,
          }, }]}
        {...chartSetting}
      />
    </div>
  );
}



export function BasicPie({dataset}) {

  return (
    <PieChart
      series={[
        {
          data: dataset,
        },
      ]}
      width={200}
      height={200}
    />
  );
}


export function SimpleLineChart({task}) {


 const tasks = [];
const today = new Date();

// task?.filter((task) => {
//     const deadline = new Date(task.Deadline);
//     const diffInTime = deadline - today; // ms
//     const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

//     return diffInDays <= 10 && diffInDays >= 0; // deadline within next 10 days
//   })
//   .map((task) => {
//     tasks.push({
//       title: `Task ${task.TaskID}`,
//       start: new Date(task.StartDate),
//       deadline: new Date(task.Deadline),
//       completed: task.CompletedDate ? new Date(task.CompletedDate) : null,
//     });
//   });

task?.map((task) => {
    tasks.push({
      title: `Task ${task.TaskID}`,
      start: new Date(task.StartDate),
      deadline: new Date(task.Deadline || task.StartDate),
      completed: task.CompletedDate ? new Date(task.CompletedDate) : null,
    });
  });

  return (
    <LineChart
      xAxis={[
        { data: tasks.map((t) => t.title), scaleType: 'band', label: 'Tasks',tickLabelStyle: { fill: "white"},labelStyle: { fill: "Skyblue", fontWeight: "bold",fontSize:15 }},
      ]} // tasks on x
      yAxis={[{ scaleType: 'time', label: 'Date',  valueFormatter: (date) =>
            date
              ? new Date(date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                })
              : "",
              tickLabelStyle: { fill: "white"},
              labelStyle: { fill: "Skyblue", fontWeight: "bold",fontSize:20 }
          }]} // dates on y
      series={[
        {
          label: 'Start Date',
          data: tasks.map((t) => t.start),
        },
        {
          label: 'Deadline',
          data: tasks.map((t) => t.deadline),
          color:"red"
        },
        {
          label: 'Completed',
          data: tasks.map((t) => t.completed || null),
          color:"green",
          connectNulls: true
        },
      ]}
      height={400}
    />
  );
}


export const AnalyticsDetails=()=>{

    const dispatch = useDispatch();
  const {data,loading,error} = useSelector((state)=>state.other);
console.log(data.states)
const states=data.states
console.log(states)
  useEffect(()=>{
    dispatch(getStats());
  },[dispatch])
console.log()
  useEffect(()=>{
    if(error)
    {
      toast.error("Error to fetch Stats");
    }
  },[])


  const dataset=[];
states?.managersAndEmployee?.filter((manager)=>manager.ManagerName!=null).map((manager,index)=>{
  dataset.push({
    id:index,
    value:manager.EmployeesCount,
    label:manager.ManagerName
  })
})



  if(loading){
    return <InfinitySpin/>
  }

  return(
    <>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Total Managers</h3>
          <div className="metric-value">{states?.employees?.filter((emp)=>emp.usertype=="manager").length}</div>
        </div>
        
        <div className="metric-card">
          <h3>Total Employees</h3>
          <div className="metric-value">{states?.employees?.filter((emp)=>emp.usertype=="employee").length}</div>
        </div>
        
        <div className="metric-card">
          <h3>Total Admins</h3>
          <div className="metric-value">{states?.employees?.filter((emp)=>emp.usertype=="admin").length}</div>
        </div>
        
        <div className="metric-card">
          <h3>Total Working Person</h3>
          <div className="metric-value">{(states?.employees?.filter((emp)=>emp.usertype=="manager").length)+(states?.employees?.filter((emp)=>emp.usertype=="admin").length)+states?.employees?.filter((emp)=>emp.usertype=="employee").length}</div>
        </div>

         <div className="metric-card">
          <h3>Total Tasks</h3>
          <div className="metric-value">{states?.tasks?.length}</div>
        </div>
        
        <div className="metric-card">
          <h3>Total Active Tasks</h3>
          <div className="metric-value">{states?.tasks?.filter((task)=>task.IsActive==true).length}</div>
        </div>
        
        <div className="metric-card">
          <h3>Total Compleated Tasks</h3>
          <div className="metric-value">{states?.tasks?.filter((task)=>task.Status=="completed").length}</div>
        </div>
        
        <div className="metric-card">
          <h3>Total In Progress Tasks</h3>
          <div className="metric-value">{states?.tasks?.filter((task)=>task.Status=="in-progress").length}</div>
        </div>

      </div>



      <div className="analytics-details">
        <div className="performance-trends">
          <h2>Departments</h2>
            <TickPlacementBars states={states}/>
        </div>
        
        <div className="department-stats">
          <h2>Managers and Employee count</h2>
          <div className="stats-table">
            <BasicPie dataset={dataset}/>
          </div>
        </div>
      </div>
        <div className="performance-trends">
          <h2>Tasks and OverDue Tasks</h2>
          <SimpleLineChart task={states?.tasks}/>
        </div>
    </>
  )
}

