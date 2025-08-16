// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// ✅ Async thunk to fetch user data
export const getUsers = createAsyncThunk('user/getUsers', async (_, thunkAPI) => {
  try {
    const response = await axios.get('https://localhost:7155/api/User');
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
  }
});

export const addUsers = createAsyncThunk('user/addUsers', async (_, thunkAPI,data) => {
  try {
    const response = await axios.post('https://localhost:7155/api/User',data);
    if (response.status !== 200) {
      throw new Error('Failed to add user');
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
  }
});
// export const loginUsers = createAsyncThunk('user/loginUser', async (_, thunkAPI,{email,password}) => {
//   try {
//     // https://localhost:7155/api/User/login?email=amitkumar378054%40gmail.com&password=amitkumar1234
   
// });



const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    loading: false,
    error: null
  },
  reducers: {
    clearUser: (state) => {
      state.users = [];
      state.error = null;
    },
    logiUser: (state, action) => {
      
      console.log('Logging in user:', email, password);
      // You might want to set some user state here
    }


   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
 
  },

});

export const { clearUser, logiUser } = userSlice.actions;
export default userSlice.reducer;
