import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HeartbeatMessage } from "../../models/HeartbeatMessage";

interface workstationsHeartbeatState {
  workstationsHeartbeat: HeartbeatMessage[];
}

const initialState: workstationsHeartbeatState = {
  workstationsHeartbeat: [],
};

const heartbeatSlice = createSlice({
  name: "workstationsHeartbeat",
  initialState,
  reducers: {
    addWorkstationHeartbeat(state, action: PayloadAction<HeartbeatMessage>) {
      // update if wsname exists, else add new
      const index = state.workstationsHeartbeat.findIndex(msg => "wsName" in msg && msg.wsName === action.payload.wsName);
    if (index !== -1) {
        state.workstationsHeartbeat[index] = action.payload;
        return;
    }
      state.workstationsHeartbeat.push(action.payload);
    },
    clearWorkstationsHeartbeat(state) {
      state.workstationsHeartbeat = [];
    },
    clearWorkstationHeartbeat(state, action: PayloadAction<string>) {
      state.workstationsHeartbeat = state.workstationsHeartbeat.filter(msg => "wsName" in msg && msg.wsName !== action.payload);
    }
  },
});

export const { addWorkstationHeartbeat, clearWorkstationsHeartbeat } = heartbeatSlice.actions;
export default heartbeatSlice.reducer;

export const selectWorkstationsHeartbeat = (state: any) => state.workstationsHeartbeat.workstationsHeartbeat;