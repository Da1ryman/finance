import type { Theme } from '@mui/material/styles';

export const drawerWidth = 240;
export const visiblePartWhenClosed = 80;

export const getDrawerStyles = (open: boolean) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    transition: (theme: Theme) =>
      theme.transitions.create('transform', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    transform: open
      ? 'translateX(0)'
      : `translateX(calc(-100% + ${visiblePartWhenClosed}px))`,
    backgroundColor: '#1976d2',
    color: 'white',
    overflow: 'visible',
  },
});

export const getChevronIconStyles = (open: boolean) => ({
  transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: 'transform 0.3s',
});

export const getListItemStyles = (
  activeItem: string | null,
  itemName: string,
) => ({
  p: 0,
  backgroundColor:
    activeItem === itemName ? 'rgba(255, 255, 255, 0.16)' : 'inherit',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
});

export const getListItemIconStyles = (open: boolean) => ({
  color: 'white',
  minWidth: 'auto',
  px: 2,
  py: 1.5,
  position: 'relative',
  left: open ? 0 : drawerWidth - visiblePartWhenClosed + 10,
  transition: 'left 0.3s',
});

export const styles = {
  root: {
    display: 'flex',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 1,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  toggleButton: {
    color: 'white',
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  userInfo: {
    p: 2,
    textAlign: 'center',
  },
  mainContent: {
    flexGrow: 1,
    p: 3,
  },
};
