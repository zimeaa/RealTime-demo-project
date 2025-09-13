import { Button, Card, CardContent, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { clearWorkstations } from "../../redux/slices/workstationDataSlice";
import { useDispatch } from "react-redux";
import { WorkstationDataMessage } from "../../models/WorkstationDataMessage";


function DataMessagesSection  ({workstationsData, filterByWorkstation}: {workstationsData: WorkstationDataMessage[], filterByWorkstation: <T extends { wsName: string }>(messages: T[]) => T[]}) {
    const dispatch = useDispatch();
    return (
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
    );
}

export default DataMessagesSection;