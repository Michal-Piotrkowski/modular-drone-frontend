import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export interface SidebarItemProps {
  name: string;
  icon: string;
  path: string;
  onClick?: () => void;
}

const getIcon = (iconName: string, isActive: boolean) => {
  const color = isActive ? 'white' : '#a0a0a0';
  switch (iconName) {
    case 'live-flight-icon':
      return <RadioButtonUncheckedIcon sx={{ color: '#ff4d4d', fontSize: 16, strokeWidth: 2 }} />;
    case 'map-data-icon':
      return <MapOutlinedIcon sx={{ color, fontSize: 20 }} />;
    case 'modules-icon':
      return <GridViewOutlinedIcon sx={{ color, fontSize: 20 }} />;
    case 'alerts-icon':
      return <NotificationsNoneOutlinedIcon sx={{ color, fontSize: 20 }} />;
    default:
      return <MapOutlinedIcon sx={{ color, fontSize: 20 }} />;
  }
};

export default function SidebarItem({ name, icon, path, onClick }: SidebarItemProps) {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <ListItem disablePadding sx={{ mb: 0.5 }}>
      <ListItemButton
        component={Link}
        to={path}
        onClick={onClick}
        sx={{
          borderRadius: 2,
          bgcolor: isActive ? '#2e2e2e' : 'transparent',
          color: isActive ? 'white' : '#a0a0a0',
          '&:hover': {
            bgcolor: '#2e2e2e',
            color: 'white',
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          {getIcon(icon, isActive)}
        </ListItemIcon>
        <ListItemText
          primary={name}
          sx={{
            '& .MuiListItemText-primary': {
              fontSize: 14,
              fontWeight: isActive ? 600 : 500,
            }
          }}
        />
        {name === 'Modules' && (
          <Box
            sx={{
              bgcolor: '#143314',
              color: '#4ec152',
              px: 1,
              py: 0.2,
              borderRadius: 1,
              fontSize: 10,
              fontWeight: 'bold',
            }}
          >
            NEW
          </Box>
        )}
      </ListItemButton>
    </ListItem>
  );
}
