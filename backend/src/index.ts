import express from "express";
import cors from "cors";
import { sseService } from "./sseManager";
import { redisService } from "./pubsub";

const app = express();
const PORT = 4000;

// Enable CORS for all routes
app.use(cors());
redisService.connect().catch(console.error);

app.get("/sse", (req, res) => {
  sseService.connectClient(res);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));