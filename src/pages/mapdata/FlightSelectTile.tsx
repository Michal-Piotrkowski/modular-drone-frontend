import React from 'react';
import { Typography, Select, MenuItem } from '@mui/material';
import Tile from './Tile';

interface Flight {
  id: string;
  name: string;
  date: string;
}

interface FlightSelectTileProps {
  flights: Flight[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function FlightSelectTile({ flights, selectedId, onSelect }: FlightSelectTileProps) {
  return (
    <Tile>
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>Select Flight</Typography>
      <Select
        size="small"
        fullWidth
        value={selectedId}
        onChange={(e) => onSelect(e.target.value)}
        sx={{
          color: 'white',
          bgcolor: '#333',
          '.MuiOutlinedInput-notchedOutline': { border: 'none' },
          '.MuiSvgIcon-root': { color: 'white' }
        }}
      >
        {flights.map((f) => (
          <MenuItem key={f.id} value={f.id}>
            {f.name} ({f.date})
          </MenuItem>
        ))}
      </Select>
    </Tile>
  );
}