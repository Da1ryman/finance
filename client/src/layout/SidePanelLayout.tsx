import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import PieChartIcon from '@mui/icons-material/PieChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AreaChartIcon from '@mui/icons-material/AreaChart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { logout } from '../store/user/slice';

export const SidePanelLayout = ({ children }: { children: JSX.Element }) => {
  const [open, setOpen] = useState(true);
  const drawerWidth = 240;
  const visiblePartWhenClosed = 80;
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.user.authInfo?.name);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleListItemClick = (itemName: string, path: string) => {
    setActiveItem(itemName);
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            transition: (theme) =>
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
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AreaChartIcon sx={{ fontSize: '20px' }} />
            <Typography variant='h6'>FINANCE</Typography>
          </Box>
          <Button onClick={toggleDrawer} sx={{ color: 'white' }}>
            <ChevronLeftIcon
              sx={{
                transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: 'transform 0.3s',
              }}
            />
          </Button>
        </Box>
        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />
        {open && userName && (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant='h5'>{userName}</Typography>
          </Box>
        )}
        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />
        <List>
          <ListItem
            sx={{
              p: 0,
              backgroundColor:
                activeItem === 'Финансы'
                  ? 'rgba(255, 255, 255, 0.16)'
                  : 'inherit',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
            onClick={() => handleListItemClick('Финансы', '/')}
          >
            <ListItemIcon
              sx={{
                color: 'white',
                minWidth: 'auto',
                px: 2,
                py: 1.5,
                position: 'relative',
                left: open ? 0 : drawerWidth - visiblePartWhenClosed + 10,
                transition: 'left 0.3s',
              }}
            >
              <AttachMoneyIcon />
            </ListItemIcon>
            {open && <ListItemText primary='Финансы' />}
          </ListItem>
          <ListItem
            sx={{
              p: 0,
              backgroundColor:
                activeItem === 'Диаграммы'
                  ? 'rgba(255, 255, 255, 0.16)'
                  : 'inherit',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
            onClick={() => handleListItemClick('Диаграммы', '/chart')}
          >
            <ListItemIcon
              sx={{
                color: 'white',
                minWidth: 'auto',
                px: 2,
                py: 1.5,
                position: 'relative',
                left: open ? 0 : drawerWidth - visiblePartWhenClosed + 10,
                transition: 'left 0.3s',
              }}
            >
              <PieChartIcon />
            </ListItemIcon>
            {open && <ListItemText primary='Диаграммы' />}
          </ListItem>
          <ListItem
            sx={{
              p: 0,
              backgroundColor:
                activeItem === 'Выход'
                  ? 'rgba(255, 255, 255, 0.16)'
                  : 'inherit',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
            onClick={() => {
              setActiveItem('Выход');
              handleLogout();
            }}
          >
            <ListItemIcon
              sx={{
                color: 'white',
                minWidth: 'auto',
                px: 2,
                py: 1.5,
                position: 'relative',
                left: open ? 0 : drawerWidth - visiblePartWhenClosed + 10,
                transition: 'left 0.3s',
              }}
            >
              <ExitToAppIcon />
            </ListItemIcon>
            {open && <ListItemText primary='Выход' />}
          </ListItem>
        </List>
      </Drawer>

      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};
