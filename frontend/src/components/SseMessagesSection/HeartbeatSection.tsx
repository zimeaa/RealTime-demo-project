// HeartbeatCard.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { Card, CardContent, Stack, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { clearWorkstationsHeartbeat } from "../../redux/slices/heartbeatSlice";
import { HeartbeatMessage } from "../../models/HeartbeatMessage";

interface HeartbeatCardProps {
  workstationsHeartbeat: HeartbeatMessage[];
  filterByWorkstation: <T extends { wsName: string }>(messages: T[]) => T[];
}

const HeartbeatCard: React.FC<HeartbeatCardProps> = ({ workstationsHeartbeat, filterByWorkstation }) => {
  const dispatch = useDispatch();

  return (
    <Card sx={{ marginBottom: 3, backgroundColor: "#1e1e1e", color: "#fff" }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ color: "#fff" }}>Heartbeat Messages</Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => dispatch(clearWorkstationsHeartbeat())}
          >
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
  );
};

export default HeartbeatCard;
