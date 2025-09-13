// src/hooks/useSharedSSE.ts
import { useEffect, useState } from "react";

declare global {
  interface Window {
    _sseConnected?: EventSource | null;
  }
}

const bc = new BroadcastChannel("sse-channel");

export function useSharedSSE(url: string) {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    let es: EventSource | null = null;

    const handleBroadcast = (ev: MessageEvent) => {
      setMessages((prev) => [...prev, ev.data]);
    };

    bc.addEventListener("message", handleBroadcast);

    if (!window["_sseConnected"]) {
      es = new EventSource(url);
      es.onmessage = (e) => {
        setMessages((prev) => [...prev, e.data]);
        bc.postMessage(e.data); // broadcast to other tabs
      };
      window["_sseConnected"] = es;
    }

    return () => {
      bc.removeEventListener("message", handleBroadcast);
      if (es) es.close();
    };
  }, [url]);

  return messages;
}
