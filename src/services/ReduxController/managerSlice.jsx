import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getManagers=createAsyncThunk("getManagers",async(id,{rejectWithValue})=>{
const response=await axios.get("");
})


const managerSlice=createSlice({
    name:"manager",
    initialState:{
        data:{
            manager:{},
            employees:[],
        },
        loading:false,
        error:null

    },
    reducers:{},

})