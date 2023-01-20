import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
// import userSettingsReducer from "./src/slices/userSettingsSlice";
// import userProfileReducer from "./src/slices/userProfileSlice";
// import userBuddiesReducer from "./src/slices/userBuddiesSlice";
// import userRequestsReducer from "./src/slices/userRequestsSlice";

export default configureStore({
  reducer: {
    auth: authReducer
  },
});
