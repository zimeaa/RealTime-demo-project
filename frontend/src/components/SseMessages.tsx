import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Stack,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";

import { HeartbeatMessage } from "../models/HeartbeatMessage";
import { WorkstationDataMessage } from "../models/WorkstationDataMessage";
import { useSSE } from "../useHooks/useSSE";
import DataMessagesSection from "./SseMessagesSection/DataMessagesSection";
import HeartbeatCard from "./SseMessagesSection/HeartbeatSection";

const RealtimeMessages = () => {
  useSSE("http://localhost:4000/sse");
  const workstationsHeartbeat: HeartbeatMessage[] = useSelector(
    (state: any) => state.workstationsHeartbeat.workstationsHeartbeat
  );
  const workstationsData: WorkstationDataMessage[] = useSelector(
    (state: any) => state.workstationsData.workstationsData
  );

  const [workstationFilter, setWorkstationFilter] = useState<string>("all");

  const handleFilterChange = (event: any) => {
    setWorkstationFilter(event.target.value);
  };

  // Filter function
  const filterByWorkstation = <T extends { wsName: string }>(
    messages: T[]
  ) => {
    if (workstationFilter === "all") return messages;
    return messages.filter((msg) => msg.wsName === workstationFilter);
  };

  // Get unique workstations for dropdown
  const uniqueWorkstations = Array.from(
    new Set(workstationsHeartbeat.map((msg) => msg.wsName))
  );

  return (
  <Paper sx={{ padding: 3, margin: 3, backgroundColor: "#121212", color: "#fff" }}>
    <Stack direction="row" spacing={2} alignItems="center" marginBottom={3}>
      <Typography variant="h4" sx={{ flexGrow: 1, color: "#fff" }}>
        Realtime Messages
      </Typography>
      <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
        <InputLabel id="workstation-select-label" sx={{ color: "#fff" }}>Filter WS</InputLabel>
        <Select
          labelId="workstation-select-label"
          value={workstationFilter}
          onChange={handleFilterChange}
          label="Filter WS"
          sx={{
            color: "#fff",
            ".MuiOutlinedInput-notchedOutline": { borderColor: "#555" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#aaa" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#aaa" },
          }}
        >
          <MenuItem value="all"><em>All</em></MenuItem>
          {uniqueWorkstations.map((wsName, index) => (
            <MenuItem key={index} value={wsName}>{wsName}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={() => setWorkstationFilter("all")}>
        Clear Filter
      </Button>
    </Stack>

    {/* Heartbeat Section */}
    <HeartbeatCard 
    workstationsHeartbeat={workstationsHeartbeat} 
    filterByWorkstation={filterByWorkstation} 
    />
    {/* Data Messages Section */}
    <DataMessagesSection 
    workstationsData={workstationsData} 
    filterByWorkstation={filterByWorkstation}
    />
  </Paper>
  );
};

export default RealtimeMessages;
