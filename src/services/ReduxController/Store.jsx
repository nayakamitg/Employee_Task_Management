import { configureStore } from "@reduxjs/toolkit";
import otherSlices from "./OtherSlices";
import userSlice from "./userSlice";
import loginSlice from "./loginSlice";
import employeeSlice from "./employeeSlice";
import taskSlice from './taskSlice';
import adminSlice from '../ReduxController/adminSlice'
const Store=configureStore(
    {
        reducer:{
            other:otherSlices,
            User:userSlice,
            login:loginSlice,
            employeeDetails:employeeSlice,
            task:taskSlice,
            admin:adminSlice
        }
    }
)

export default Store;


