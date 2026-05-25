import React from 'react';
import { Box, Typography } from '@mui/material';
import Tile from './Tile';

interface HistogramTileProps {
  title: string;
  data: number[];
  color: string;
  metric: string;
}

export default function HistogramTile({ title, data, color }: HistogramTileProps) {
  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);

  return (
    <Tile>
      <Box display="flex" flexDirection="column" alignItems="flex-start" mb={2}>
        <Typography variant="caption" sx={{ fontWeight: 'bold', mb: 0.5 }}>{title}</Typography>
      </Box>

      {/* simplified range view: value - line - value + min/max labels */}
      <Box display="flex" flexDirection="column" width="100%">
        <Box display="flex" alignItems="center" width="100%" gap={1}>
          <Typography variant="h6" sx={{ color, fontWeight: 'bold', minWidth: 36 }}>{minVal}</Typography>
          <Box sx={{ flex: 1, height: 8, bgcolor: color, borderRadius: 4, opacity: 0.25 }} />
          <Typography variant="h6" sx={{ color, fontWeight: 'bold', minWidth: 36, textAlign: 'right' }}>{maxVal}</Typography>
        </Box>
      </Box>
    </Tile>
  );
}