import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Stack,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { clearWorkstationsHeartbeat} from "../redux/slices/heartbeatSlice";
import { clearWorkstations } from "../redux/slices/workstationDataSlice";
import { HeartbeatMessage } from "../models/HeartbeatMessage";
import { WorkstationDataMessage } from "../models/WorkstationDataMessage";
import { useSSE } from "../useHooks/useSSE";

const RealtimeMessages = () => {
  useSSE("http://localhost:4000/sse");
  const dispatch = useDispatch();
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
    <Card sx={{ marginBottom: 3, backgroundColor: "#1e1e1e", color: "#fff" }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ color: "#fff" }}>Heartbeat Messages</Typography>
          <Button variant="contained" color="secondary" onClick={() => dispatch(clearWorkstationsHeartbeat())}>
            Clear Heartbeat
          </Button>
        </Stack>

        <Table size="small" sx={{ marginTop: 2, color: "#fff" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Workstation</TableCell>
              <TableCell sx={{ color: "#fff" }}>Online</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterByWorkstation(workstationsHeartbeat).map((msg, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: "#fff" }}>{msg.wsName}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{msg.isOnline ? "✅" : "❌"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    {/* Data Messages Section */}
    <Card sx={{ backgroundColor: "#1e1e1e", color: "#fff" }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ color: "#fff" }}>Data Messages</Typography>
          <Button variant="contained" color="secondary" onClick={() => dispatch(clearWorkstations())}>
            Clear Data
          </Button>
        </Stack>

        <Table size="small" sx={{ marginTop: 2, color: "#fff" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Workstation</TableCell>
              <TableCell sx={{ color: "#fff" }}>Timestamp</TableCell>
              <TableCell sx={{ color: "#fff" }}>Action</TableCell>
              <TableCell sx={{ color: "#fff" }}>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterByWorkstation(workstationsData).map((msg, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: "#fff" }}>{msg.wsName}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{msg.timestamp}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{msg.payload.action}</TableCell>
                <TableCell>
                  <pre style={{ margin: 0, color: "#fff" }}>
                    {JSON.stringify(msg.payload, null, 2)}
                  </pre>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </Paper>
);

};

export default RealtimeMessages;
