import { io, Socket } from 'socket.io-client';
import { authTokenUtils } from '../utils/authToken';

class SocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private userId: string | null = null;
  private userIdPromise: Promise<string> | null = null;
  private userIdResolve: ((userId: string) => void) | null = null;

  connect(): Socket {
    // Принудительно отключаем существующее соединение
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }

    // Сбрасываем промис при новом подключении
    this.userId = null;
    this.userIdPromise = new Promise((resolve) => {
      this.userIdResolve = resolve;
    });

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
        userId: this.userId,
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

    this.socket.on('user', (data: { message: string }) => {
      console.log('✅ Received user event:', data);
      console.log('Raw user event data:', JSON.stringify(data));

      if (data && data.message) {
        this.userId = data.message;
        console.log('✅ User ID saved successfully:', this.userId);

        // Резолвим промис когда приходит userId
        if (this.userIdResolve) {
          this.userIdResolve(this.userId);
          this.userIdResolve = null;
        }
      } else {
        console.warn('User event received but no message field found:', data);
      }
    });
  }

  getUserId(): string | null {
    console.log('Getting user ID:', this.userId);
    return this.userId;
  }

  // Новый метод - ждем пока придет userId
  async waitForUserId(): Promise<string> {
    if (this.userId) {
      return this.userId;
    }

    if (this.userIdPromise) {
      return await this.userIdPromise;
    }

    throw new Error('Socket not connected properly');
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
