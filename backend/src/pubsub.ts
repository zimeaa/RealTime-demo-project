import { createClient } from "redis";
import { sseService } from "./sseManager";
import { HeartbeatMessage } from "./models/HeartbeatMessage";
import { WorkstationDataMessage as DataMessage } from "./models/WorkstationDataMessage";

class RedisService {
  private client = createClient();
  private subscriber = this.client.duplicate();

  async connect() {
    await this.client.connect();
    await this.subscriber.connect();

    console.log("Redis connected.");

    await this.subscriber.subscribe("heartbeat", (msg: string) => {
      try {
        console.log("Raw heartbeat message:", msg); // Add this line
        const heartbeat: HeartbeatMessage = JSON.parse(msg);
        console.log("Received heartbeat message:", heartbeat);
        sseService.broadcast("heartbeat", heartbeat);
      } catch (err) {
        console.error("Invalid JSON on 'heartbeat' channel:", msg, err);
      }
    }).catch((err) => {
      console.error("Failed to subscribe to heartbeat channel:", err);
    });

    await this.subscriber.subscribe("data", (msg: string) => {
      try {
        console.log("Raw data message:", msg); // Add this line
        const data: DataMessage = JSON.parse(msg);
        console.log("Received data message:", data);
        sseService.broadcast("data", data);
      } catch (err) {
        console.error("Invalid JSON on 'data' channel:", msg, err);
      }
    }).catch((err) => {
      console.error("Failed to subscribe to data channel:", err);
    });
  }

  async publish(channel: string, message: object) {
    await this.client.publish(channel, JSON.stringify(message));
  }
}

export const redisService = new RedisService();