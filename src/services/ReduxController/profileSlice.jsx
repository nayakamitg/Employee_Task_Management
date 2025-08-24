import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfile=createAsyncThunk("getProfile",async(id,{rejectWithValue})=>{
    try{
    const response=await axios.get(`http://localhost:5231/api/Employee/profile/${id}`);
    return response.data;
    }
    catch (e){
        return rejectWithValue(e.response||"Unable to fetch profile");
    }

})

export const updateProfile=createAsyncThunk("updateProfile",async({id,data},{rejectWithValue})=>{
    try{
    const response=await axios.put(`http://localhost:5231/api/Employee/editProfile/${id}`,data,{
        headers:{
            "Content-Type":"application/json"
        }
    });
    return response.data;
    }
    catch (e){
        return rejectWithValue(e.response||"Unable to fetch profile");
    }

})



const profileSlice=createSlice({
    name:"profile",
    initialState:{
        loading:false,
        profile:{},
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getProfile.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.profile=action.payload;

        })
        .addCase(getProfile.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getProfile.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        builder
        .addCase(updateProfile.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.profile.employee=action.payload;

        })
        .addCase(updateProfile.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(updateProfile.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }
})


export default profileSlice.reducer;