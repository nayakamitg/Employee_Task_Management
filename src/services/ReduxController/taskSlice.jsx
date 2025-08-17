import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllTask = createAsyncThunk(
  "gettingTask",
  async (token, { rejectWithValue }) => {
    // Use rejectWithValue instead of rejectWitherror
    try {
      const response = await axios.post(
        "http://localhost:5231/api/Task/allTaskWithDetails",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data; // Return data on success
    } catch (error) {
      console.error("API Request Error: ", error); // Log the complete error object
      return rejectWithValue(error?.response?.data || "Error to fetch tasks");
    }
  }
);

export const addTask = createAsyncThunk(
  "addtask",
  async (data, { rejectWitherror }) => {
    try {
      const response = await axios.post("http://localhost:5231/api/Task", data);
      return response.data;
    } catch (error) {
      return rejectWitherror(error?.response.data || "Failed to add task");
    }
  }
);

export const updateTask = createAsyncThunk(
  "updatetask",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5231/api/Task/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Failed to update task");
    }
  }
);



export const addComment = createAsyncThunk(
  "addcommenttask",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5231/api/TaskComment",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Failed to update task");
    }
  }
);




const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    taskloading: false,
    taskerror: null,
    addtaskloading: false,
    addtaskerror: null,
    successAdded:false,
    updatetaskloading: false,
    updatetaskerror: null,
    addcommentloading:false,
    addcommenterror:null
  },
  reducers: {
    setsuccessTask: (state, action) => {
      state.successAdded = !state.successAdded;
    },
    
    settask: (state, action) => {
      state.tasks = action.payload;
    },
    seterror: (state, action) => {
      state.taskerror = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTask.fulfilled, (state, action) => {
        state.taskloading = false;
        state.tasks = action.payload;
        state.taskerror = null;
      })
      .addCase(getAllTask.pending, (state) => {
        state.taskloading = true;
        state.taskerror = null;
      })
      .addCase(getAllTask.rejected, (state, action) => {
        state.taskloading = false;
        state.taskerror = action.payload;
      });
    builder
      .addCase(addTask.fulfilled, (state, action) => {
        state.addtaskloading = false;
        state.successAdded=true;
        state.tasks = [action.payload, ...state.tasks];
        state.addtaskerror = null;
      })
      .addCase(addTask.pending, (state) => {
        state.addtaskloading = true;
        state.addtaskerror = null;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.addtaskloading = false;
        state.addtaskerror = action.payload;
      });
    builder
      .addCase(updateTask.fulfilled, (state, action) => {
        state.updatetaskloading = false;
        state.successAdded=true;
        const updatedTask = action.payload[0]; // Your API returns just the task object
        const id = updatedTask.TaskID;

        const index = state.tasks.findIndex((item) => item.task.TaskID === id);
        if (index !== -1) {
          state.tasks[index] = {
            ...state.tasks[index], // keep comments and employee
            task: {
              ...state.tasks[index].task, // keep any extra task props if needed
              ...updatedTask, // overwrite with updated fields
            },
          };
        }

        state.updatetaskerror = null;
      })

      .addCase(updateTask.pending, (state) => {
        state.updatetaskloading = true;
        state.updatetaskerror = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.updatetaskloading = false;
        state.updatetaskerror = action.payload;
      });
      builder
      .addCase(addComment.fulfilled, (state, action) => {
        state.addcommentloading = false;
        state.tasks.map((task)=>{
          if(task.task.TaskID==action.payload.taskId){
            task.comments.push(action.payload)
          }
        })

      
        state.addcommenterror = null;
      })
      .addCase(addComment.pending, (state) => {
        state.addcommentloading = true;
        state.addcommenterror = null;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.addcommentloading = false;
        state.addcommenterror = action.payload;
      });
  },
});

export const getAllTasks = () => async (dispatch) => {
  dispatch(setloading(true));
  try {
    const response = await axios.get("https://localhost:7155/api/Task");
    dispatch(settask(response.data));
  } catch (error) {
    dispatch(seterror(error.message));
  } finally {
    dispatch(setloading(false));
  }
};

export const { setloading, seterror, settask,setsuccessTask } = taskSlice.actions;
export default taskSlice.reducer;
