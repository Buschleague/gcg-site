export interface Brand {
  name: string;
  blurb: string;
  logo?: string;
  fallbackInitials?: string;
}

export interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}