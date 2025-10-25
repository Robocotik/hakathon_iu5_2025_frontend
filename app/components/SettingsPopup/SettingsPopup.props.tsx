export interface SettingsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
}
