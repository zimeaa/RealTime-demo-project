import { useEffect, useRef } from "react";
import { WorkstationDataMessage } from "../models/WorkstationDataMessage";
import { HeartbeatMessage } from "../models/HeartbeatMessage";
import { useDispatch } from "react-redux";
import { addWorkstationHeartbeat } from "../redux/slices/heartbeatSlice";
import { addWorkstation } from "../redux/slices/workstationDataSlice";

export function useSSE(url: string) {
  const eventSourceRef = useRef<EventSource | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      console.log("SSE connection opened.");
    };

    eventSource.addEventListener("heartbeat", (event: MessageEvent) => {
      try {
        const msg: HeartbeatMessage = JSON.parse(event.data);
        dispatch(addWorkstationHeartbeat(msg));
      } catch (err) {
        console.error("Error parsing heartbeat message:", err);
      }
    });

    eventSource.addEventListener("data", (event: MessageEvent) => {
      try {
        const msg: WorkstationDataMessage = JSON.parse(event.data);
        dispatch(addWorkstation(msg));
      } catch (err) {
        console.error("Error parsing data message:", err);
      }
    });

    eventSource.onerror = () => {
      console.log("SSE connection lost, retrying...");
      eventSource.close();
      eventSourceRef.current = null;
      setTimeout(() => {
        if (!eventSourceRef.current) {
          eventSourceRef.current = new EventSource(url);
        }
      }, 3000);
    };

    return () => {
      eventSource.close();
    };
  }, [url, dispatch]);
}