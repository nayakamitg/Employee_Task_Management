import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE = "http://localhost:5231";

// ------------------- Async Thunks -------------------

export const getEmployee = createAsyncThunk(
  "employee/getAll",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/api/Employee`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching employees");
    }
  }
);

export const addEmployee = createAsyncThunk(
  "addEmployee",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/api/Employee/addEmployee`, data);
    
      return res.data;
    

    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding employee");
    }
  }
);
export const updateEmployee = createAsyncThunk(
  "updateEmployee",
  async ({id,data}, { rejectWithValue }) => {
    try {
      const res = await axios.put(`http://localhost:5231/api/Employee/${id}`, data);
    
      return res.data;
    

    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding employee");
    }
  }
);

// ------------------- Slice -------------------

const employeeSlice = createSlice({
  name: "employeeDetails",
  initialState: {
    employees: [],
    emploading: false,
    emperror: null,
    successaddemployee:false,
    adderror:null,
    addloading:false,
    updateloading:false,
    updateerror:null
  },
  reducers: {
    setsuccessemployee:(state,action)=>{
      state.successaddemployee=!state.successaddemployee;
    }
  },
  extraReducers: (builder) => {
    builder
      // ---- Get Employees ----
      .addCase(getEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.employees = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---- Add Employee ----
      .addCase(addEmployee.pending, (state) => {
        state.addloading = true;
        state.adderror = null;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.successaddemployee=true;
        state.employees = [action.payload, ...state.employees];
        state.addloading = false;
        state.adderror = null;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.addloading = false;
        state.adderror = action.payload;
      })
      builder
      .addCase(updateEmployee.pending, (state) => {
        state.updateloading = true;
        state.updateerror = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.successaddemployee=true;
        // state.employees=action.payload
        var index=state.employees.findIndex((emp)=>emp.employee.UserID==action.payload.UserID);
         if (index !== -1) {
    state.employees[index].employee = action.payload;
  }
        state.updateloading = false;
        state.updateerror = null;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.updateloading = false;
        state.updateerror = action.payload;
      });
  },
  
  
});

export const {setsuccessemployee}=employeeSlice.actions;
export default employeeSlice.reducer;
