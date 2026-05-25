import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Tile from './Tile';
import { MAIN_MAP_DATA_WIDGET_TITLE } from '../../constants';

interface Layer {
  id: string;
  name: string;
}

interface LayersTileProps {
  layers: Layer[];
  activeLayers: string[];
  onToggle: (id: string) => void;
  mode: 'any' | 'only';
  onModeChange: (m: 'any' | 'only') => void;
}

export default function LayersTile({ layers, activeLayers, onToggle, mode, onModeChange }: LayersTileProps) {
  const theme = useTheme();
  
  
  return (
    <Tile>
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>{MAIN_MAP_DATA_WIDGET_TITLE}</Typography>
      <Box display="flex" gap={2} mb={1}>
        {/* Mode selector: Any vs Only */}
        <Button
          size="small"
          variant={mode === 'any' ? 'contained' : 'text'}
          onClick={() => onModeChange('any')}
          sx={{
            textTransform: 'none',
            bgcolor: mode === 'any' ? '#9be7a6' : undefined,
            color: mode === 'any' ? '#052000' : theme.palette.text.secondary,
            '&:hover': { bgcolor: mode === 'any' ? '#86d392' : theme.palette.action.hover }
          }}
        >
          Any
        </Button>
        <Button
          size="small"
          variant={mode === 'only' ? 'contained' : 'text'}
          onClick={() => onModeChange('only')}
          sx={{
            textTransform: 'none',
            bgcolor: mode === 'only' ? '#9be7a6' : undefined,
            color: mode === 'only' ? '#052000' : theme.palette.text.secondary,
            '&:hover': { bgcolor: mode === 'only' ? '#86d392' : theme.palette.action.hover }
          }}
        >
          Only
        </Button>
      </Box>

      <Box display="flex" flexDirection="column" gap={1}>
        {layers.map(layer => {
          const isActive = activeLayers.includes(layer.id);
          return (
            <Button
              key={layer.id}
              onClick={() => onToggle(layer.id)}
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                textTransform: 'none',
                color: isActive ? '#fff' : '#a0a0a0',
                bgcolor: isActive ? '#333' : 'transparent',
                borderRadius: 1,
                p: 1.25,
                fontSize: 12,
                '&:hover': {
                  bgcolor: '#444'
                }
              }}
            >
              {layer.name}
            </Button>
          );
        })}
      </Box>
    </Tile>
  );
}