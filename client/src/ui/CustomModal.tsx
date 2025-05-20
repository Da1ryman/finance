import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import type { JSX } from 'react';

interface ModalProps {
  title: string;
  action: JSX.Element;
  content?: JSX.Element;
  dialogOpen: boolean;
  dialogClose: () => void;
}

export const CustomModal = ({
  title,
  action,
  content,
  dialogOpen,
  dialogClose,
}: ModalProps) => {
  return (
    <Dialog open={dialogOpen} onClose={dialogClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent sx={{ p: 2 }}>{content}</DialogContent>

      <DialogActions>{action}</DialogActions>
    </Dialog>
  );
};
