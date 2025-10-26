import { io, Socket } from 'socket.io-client';
import { authTokenUtils } from '../utils/authToken';

class SocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private userId: string | null = null;

  connect(): Socket {
    // Принудительно отключаем существующее соединение
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }

    const token = authTokenUtils.getToken();
    console.log(
      'Connecting to Socket.IO with token:',
      token ? `Bearer ${token.substring(0, 20)}...` : 'No token',
    );

    // Подключаемся к namespace /api/calc на основном сервере
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
    this.socket = io(`${baseUrl}/calc`, {
      transports: ['websocket', 'polling'],
      query: {
        token: token,
        user: this.userId,
      },
      forceNew: true,
    });

    this.setupEventListeners();
    return this.socket;
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket?.id);
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason: string) => {
      console.log('Socket disconnected:', reason);
    });

    this.socket.on('connect_error', (error: Error) => {
      console.error('Socket connection error:', error);
      this.handleReconnect();
    });

    this.socket.on('user', (message: { userId: string }) => {
      console.log('Received user event:', message);
      if (message && message.userId) {
        this.userId = message.userId;
        console.log('User ID saved:', this.userId);
      }
    });
  }

  getUserId(): string | null {
    return this.userId;
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`,
      );

      setTimeout(() => {
        this.connect();
      }, 1000 * this.reconnectAttempts);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export const socketService = new SocketService();
