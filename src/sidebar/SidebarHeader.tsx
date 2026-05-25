import { Box, Typography } from '@mui/material';
import { PROJECT_NAME, SIDEPROJECT_NAME } from '../constants';

export default function SidebarHeader() {
  return (
    <Box sx={{ mt: 3, mb: 4, px: 3, display: 'flex', alignItems: 'baseline', gap: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, color: 'white', letterSpacing: 0.5 }}>
        {PROJECT_NAME}
      </Typography>
      <Typography variant="caption" sx={{ color: '#688c75', fontWeight: 'bold' }}>
        {SIDEPROJECT_NAME}
      </Typography>
    </Box>
  );
}
