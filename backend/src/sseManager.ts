import { Response } from "express";

class SSEService {
  private clients: Response[] = [];

  connectClient(res: Response) {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    this.clients.push(res);

    res.on("close", () => {
      this.clients = this.clients.filter((c) => c !== res);
    });
  }

  broadcast<T>(event: string, data: T) {
    const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    console.log(`Broadcasting event: ${event}, data: ${JSON.stringify(data)}`);
    this.clients.forEach((client) => client.write(payload));
  }
}

export const sseService = new SSEService();
