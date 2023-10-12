"use client"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
type InitialState = {
    data: any;
    registerInfo: any
    isLoading: boolean;
};

const getInitialState = (): InitialState => {
    if (typeof window !== "undefined") {
        const storedRegisterInfo = localStorage.getItem("registerInfo");
        return {
            data: null,
            registerInfo: storedRegisterInfo
                ? JSON.parse(storedRegisterInfo)
                : null,
            isLoading: true,
        };
    } else {
        // Return a default state for server-side rendering
        return {
            data: null,
            registerInfo: null,
            isLoading: true,
        };
    }
};
export const jobsData = createAsyncThunk("jobs/jobsData", async (userData, thunkAPI) => {
    try {
        const response = await axios.get('https://apis.ccbp.in/jobs/', {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU`,
            },
        });
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
}) as any
export const authSlice = createSlice({
    name: "auth",
    initialState: getInitialState(),
    reducers: {
        handleRegisterDetails: (state, action) => {
            state.registerInfo.push(action.payload)
            if (typeof window !== 'undefined') {
                localStorage.setItem("registerInfo", JSON.stringify(state.registerInfo));
            }
        },

    },
    extraReducers: (builder) => {
        builder.addCase(jobsData.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
});

export const { handleRegisterDetails } = authSlice.actions;
export default authSlice.reducer;