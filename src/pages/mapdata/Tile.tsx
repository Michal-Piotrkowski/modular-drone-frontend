import React from 'react';
import { Box } from '@mui/material';

interface TileProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
}

export default function Tile({ children, width = 280, height = 'auto' }: TileProps) {
  return (
    <Box
      sx={{
        width,
        height,
        bgcolor: '#202020',
        borderRadius: 2,
        p: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        color: 'white',
        border: '1px solid #333'
      }}
    >
      {children}
    </Box>
  );
}