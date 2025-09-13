import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkstationDataMessage } from "../../models/WorkstationDataMessage";

interface WorkstationsState {
  workstationsData: WorkstationDataMessage [];
}

const initialState: WorkstationsState = {
  workstationsData: [],
};

const workstationsSlice = createSlice({
  name: "workstationsData",
  initialState,
  reducers: {
    addWorkstation(state, action: PayloadAction<WorkstationDataMessage>) {
    // update if wsname exists, else add new
    const index = state.workstationsData.findIndex(msg => msg.wsName === action.payload.wsName);
    if (index !== -1) {
        state.workstationsData[index] = action.payload;
        return;
    }
      state.workstationsData.push(action.payload);
    },
    clearWorkstations(state) {
      state.workstationsData = [];
    },
    clearWorkstation(state, action: PayloadAction<string>) {
      state.workstationsData = state.workstationsData.filter(msg => msg.wsName !== action.payload);
    }
  },
});

export const { addWorkstation, clearWorkstations } = workstationsSlice.actions;
export default workstationsSlice.reducer;