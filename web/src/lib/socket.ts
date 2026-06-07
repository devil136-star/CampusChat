import { io, Socket } from "socket.io-client";
import type { DirectMessage, Message } from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

let socket: Socket | null = null;

export function getSocket(token: string): Socket {
  if (!socket) {
    socket = io(API_URL, {
      auth: { token },
      autoConnect: false,
    });
  }
  return socket;
}

export function connectSocket(token: string): Socket {
  const s = getSocket(token);
  if (!s.connected) {
    s.auth = { token };
    s.connect();
  }
  return s;
}

export function disconnectSocket(): void {
  if (socket?.connected) {
    socket.disconnect();
  }
}

export type NewMessageHandler = (data: { message: Message }) => void;
export type NewDmMessageHandler = (data: { message: DirectMessage }) => void;
export type DmUpdatedHandler = (data: { conversationId: string }) => void;
