export interface SocketState {
  socket: WebSocket | null;
  isConnected: boolean;
  error: string;
}
