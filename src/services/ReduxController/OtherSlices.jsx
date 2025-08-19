import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getStats = createAsyncThunk(
  "gettingStats",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5231/api/Employee/dashboard-summary",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      }
      return "Error to get states";
    } catch (error) {
      return rejectWithValue(error.response.data || "Error to get states");
    }
  }
);

export const getStatsById = createAsyncThunk(
  "gettingStatsById",
  async ({token,id}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5231/api/Employee/dashboard-summary-by-id/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      }
      return "Error to get states";
    } catch (error) {
      return rejectWithValue(error.response.data || "Error to get states");
    }
  }
);


export const getDepartment = createAsyncThunk(
  "gettingDepartment",
  async (_,{ rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5231/api/Department");
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data || "Error to get Department");
    }
  }
);



const OtherSlices = createSlice({
  name: "other",
  initialState: {
    data: {
      states: {},
      departments: []
    },
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getStats.fulfilled, (state, action) => {
        state.data.states = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStats.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
    builder
      .addCase(getDepartment.fulfilled, (state, action) => {
        state.data.departments= action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDepartment.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }),
    builder
      .addCase(getStatsById.fulfilled, (state, action) => {
        state.data.states= action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getStatsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStatsById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});


export default OtherSlices.reducer;
