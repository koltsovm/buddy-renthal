import React from "react";

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface ToastContextValue {
  toasts: ToastProps[];
  toast: (props: Omit<ToastProps, "id">) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}
