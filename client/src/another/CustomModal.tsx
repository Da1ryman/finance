import { Box, Dialog, DialogActions, DialogTitle } from '@mui/material';
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

      <Box sx={{ p: 2 }}>{content}</Box>

      <DialogActions>{action}</DialogActions>
    </Dialog>
  );
};
