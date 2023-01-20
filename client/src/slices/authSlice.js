import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M0YWFmYzRiMWE0NjczOTBlYjMzYjAiLCJpYXQiOjE2NzM4MzMyMTJ9.E2HSGsY7o_ft_pT-eSAX52k81NJr48lcsWi7xGzitmM",
    "Content-Type": "application/json",
  },
});

const sessionToken = localStorage.getItem("sessionToken");

const initialState = sessionToken
  ? { isLoggedIn: true, sessionToken }
  : { isLoggedIn: false, sessionToken };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registrationOk: (state) => {
      state.isLoggedIn = false;
    },
    registrationFailed: (state) => {
      state.isLoggedIn = false;
    },
    loginOk: (state, action) => {
      const { sessionToken } = action.payload;
      state.isLoggedIn = true;
      state.sessionToken = sessionToken;
    },
    loginFailed: (state) => {
      state.isLoggedIn = false;
      state.userToken = null;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userToken = null;
    },
  },
});


// --- THUNKS ---
export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const response = await authApi.get(`/users/${"63c4aafc4b1a467390eb33b0"}`);
  console.log(response);
  return response.data;
});

export const loginUser = createAsyncThunk("auth/loginUser", async (userLoginInfo) => {
  const response = await authApi.post("/users/login", userLoginInfo);
  
  localStorage.setItem('sessionToken', response.data.token);
  return response.data;
});

export const registerUser = createAsyncThunk("auth/registerUser", async (userRegisterInfo) => {
  const response = await authApi.post("/users", userRegisterInfo);

  localStorage.setItem('sessionToken', response.data.token);
  return response.data;
});

// --- ACTION EXPORTS ---
export const {
  registrationOk,
  registrationFailed,
  loginOk,
  loginFailed,
  logout,
} = authSlice.actions;

// --- REDUCER EXPORTS ---
export default authSlice.reducer;

// --- SELECTORS ---
export const selectSessionToken = (state) => state.auth.sessionToken;