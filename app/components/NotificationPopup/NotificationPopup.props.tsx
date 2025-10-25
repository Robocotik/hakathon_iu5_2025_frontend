export interface NotificationData {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'measurement' | 'info' | 'warning';
}

export interface NotificationPopupProps {
  isVisible: boolean;
  position: { x: number; y: number };
}
