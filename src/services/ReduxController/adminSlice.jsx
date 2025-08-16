import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { data } from "react-router-dom";



export const getAdmin=createAsyncThunk("getAdminData",async(token,{rejectWithValue})=>{
    try{
        const response=await axios.post("http://localhost:5231/api/Employee/role-tasks-comments",{},{
            headers:{
                Authorization:`Bearer ${token}`,
                Accept:"*/*"
                
            }
        }
    );
    if(response.status===200){
        return response.data;
    }
    else
    {
        return rejectWithValue("Error to fetch data");
    }
    }
    catch (error){
        return rejectWithValue(error.response.data || "User is UnAuthorized")
    }
})



const adminSlice=createSlice(
    {
        name:"admin",
        initialState:{
            data:[],
            loading:false,
            error:null,

        },
        reducers:{},
        extraReducers:(builder)=>{
            builder
            .addCase(
                getAdmin.fulfilled,(state,action)=>{
                    state.data=action.payload;
                    state.loading=false;
                    state.error=null;
                }
            )
            .addCase(
                getAdmin.pending,(state)=>{
                    state.loading=true;
                    state.error=null;
                }
            )
            .addCase(
                getAdmin.rejected,(state,action)=>{
                    state.loading=false;
                    state.error=action.payload;
                }
            )
        }
    }
)


export default adminSlice.reducer;