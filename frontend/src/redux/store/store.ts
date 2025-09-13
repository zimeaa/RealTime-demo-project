import { configureStore } from "@reduxjs/toolkit";
import workstationsReducer from "../slices/workstationDataSlice";
import heartbeatReducer from "../slices/heartbeatSlice";


export const store = configureStore({
  reducer: {
    workstationsHeartbeat: heartbeatReducer,
    workstationsData: workstationsReducer,
  },
});

// Types for use throughout your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;