
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




export const LoginThunk=createAsyncThunk("loginStatus",async (credentials,{rejectWithValue })=>{

     try {

        var response = await axios.post(
            'http://localhost:5231/api/Employee/login'
        , {
  "email": credentials.email,
  "password": credentials.password
}
)
return response.data;
}
catch (error){
return rejectWithValue(error.response.data || "Invaid Credintials");
}
})



const loginSlice=createSlice(
    {
        name:"login",
        initialState:{
            loading:false,
            islogin:false,
            data:{},
            error:null
        },
        reducers:{
            logout:(state)=>{
                state.data={};
                state.islogin=false;

            }
        },
        extraReducers:(builder)=>{
            builder
            .addCase(
                LoginThunk.pending,(state)=>{
                    state.loading=true;
                    state.error = null;
                }
            )
            .addCase(LoginThunk.fulfilled, (state, action) => {
  console.log("API Response:", action.payload); // <-- yahan print karke check karo
  state.loading = false;
  state.islogin = true;
  state.data = action.payload;
})
            .addCase(
                LoginThunk.rejected ,(state,action)=>{
                    state.loading = false;
                    state.error = action.payload;
                }
            )

        }
    }
)

export const {logout}=loginSlice.actions;
export default loginSlice.reducer;