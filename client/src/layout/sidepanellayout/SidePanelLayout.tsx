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
import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { logout } from '../../store/user/slice';
import {
  getChevronIconStyles,
  getDrawerStyles,
  getListItemIconStyles,
  getListItemStyles,
  styles,
} from './SidePanelLayout.style';
import { routes } from '../../routes';

export const SidePanelLayout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(true);
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
    navigate(routes.login);
  };

  return (
    <Box sx={styles.root}>
      <Drawer variant='permanent' sx={getDrawerStyles(open)}>
        <Box sx={styles.header}>
          <Box sx={styles.logoContainer}>
            <AreaChartIcon sx={{ fontSize: '20px' }} />
            <Typography variant='h6'>FINANCE</Typography>
          </Box>

          <Button onClick={toggleDrawer} sx={styles.toggleButton}>
            <ChevronLeftIcon sx={getChevronIconStyles(open)} />
          </Button>
        </Box>

        <Divider sx={styles.divider} />

        {open && userName && (
          <Box sx={styles.userInfo}>
            <Typography variant='h5'>{userName}</Typography>
          </Box>
        )}

        <Divider sx={styles.divider} />

        <List>
          <ListItem
            sx={getListItemStyles(activeItem, 'Финансы')}
            onClick={() => handleListItemClick('Финансы', routes.main)}
          >
            <ListItemIcon sx={getListItemIconStyles(open)}>
              <AttachMoneyIcon />
            </ListItemIcon>

            {open && <ListItemText primary='Финансы' />}
          </ListItem>

          <ListItem
            sx={getListItemStyles(activeItem, 'Диаграммы')}
            onClick={() => handleListItemClick('Диаграммы', routes.chart)}
          >
            <ListItemIcon sx={getListItemIconStyles(open)}>
              <PieChartIcon />
            </ListItemIcon>

            {open && <ListItemText primary='Диаграммы' />}
          </ListItem>

          <ListItem
            sx={getListItemStyles(activeItem, 'Выход')}
            onClick={() => {
              setActiveItem('Выход');
              handleLogout();
            }}
          >
            <ListItemIcon sx={getListItemIconStyles(open)}>
              <ExitToAppIcon />
            </ListItemIcon>

            {open && <ListItemText primary='Выход' />}
          </ListItem>
        </List>
      </Drawer>

      <Box component='main' sx={styles.mainContent}>
        {children}
      </Box>
    </Box>
  );
};
