import React, { useState } from 'react';
import { Box } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapData.css';

import { MOCK_FLIGHTS, MOCK_LAYERS, MOCK_POINTS, MOCK_HISTOGRAMS } from '../../constants';
import LayersTile from './LayersTile';
import FlightSelectTile from './FlightSelectTile';
import HistogramTile from './HistogramTile';

export interface SensorData {
  id: string;
  lat: number;
  lng: number;
  time: string;
  [key: string]: number | string | undefined;
}

// Custom Map updater to recenter
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  React.useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function MapData() {
  const [selectedFlightId, setSelectedFlightId] = useState<string>(MOCK_FLIGHTS[0].id);
  const [activeLayers, setActiveLayers] = useState<string[]>(['pm25']);
  const [filterMode, setFilterMode] = useState<'any' | 'only'>('any');
  
  const currentFlight = MOCK_FLIGHTS.find((f) => f.id === selectedFlightId);
  const points: SensorData[] = MOCK_POINTS[selectedFlightId as keyof typeof MOCK_POINTS] || [];

  const visiblePoints = points.filter(pt => {
    if (activeLayers.length === 0) return true;
    const measurementKeys = Object.keys(pt).filter(k => !['id','lat','lng','time'].includes(k));
    if (filterMode === 'any') {
      return activeLayers.some(layer => typeof pt[layer] === 'number');
    }
    // 'only' mode: point must have exactly the selected activeLayers (no extra measurement keys)
    if (filterMode === 'only') {
      // must have same length and include all
      return measurementKeys.length === activeLayers.length && activeLayers.every(l => measurementKeys.includes(l));
    }
    return true;
  });

  const toggleLayer = (layerId: string) => {
    setActiveLayers((prev) => 
      prev.includes(layerId) ? prev.filter(id => id !== layerId) : [...prev, layerId]
    );
  };

  const createCustomIcon = (isActive: boolean) => {
    return L.divIcon({
      className: 'custom-map-icon',
      html: `<div class="dot ${isActive ? 'active' : ''}"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  };

  const [activePointId, setActivePointId] = useState<string | null>(null);

  const tempData = points.map(p => p.temp).filter((v): v is number => typeof v === 'number');
  const humidData = points.map(p => p.humid).filter((v): v is number => typeof v === 'number');

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <MapContainer 
        center={currentFlight?.location as [number, number] || [50.0614, 19.9365]} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">Carto</a>'
        />
        {currentFlight && <MapUpdater center={currentFlight.location as [number, number]} />}
        
        {visiblePoints.map((pt) => {
          const isActive = pt.id === activePointId;
          return (
            <Marker 
              key={pt.id} 
              position={[pt.lat, pt.lng]} 
              icon={createCustomIcon(isActive)}
              eventHandlers={{
                click: () => setActivePointId(pt.id)
              }}
            >
              <Popup className="custom-popup" closeButton={false}>
                <Box sx={{ p: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Box sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}>
                      <span style={{color: '#888'}}>📍</span> Southwark
                    </Box>
                    <Box sx={{ fontWeight: "bold", color: "#4ec152", fontSize: "18px" }}>
                      {pt.temp} °C
                    </Box>
                  </Box>
                  <Box sx={{ fontSize: "10px", color: "#888", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
                    <Box>🧭 {pt.lat.toFixed(4)} N, {pt.lng.toFixed(4)} W</Box>
                    <Box sx={{ textAlign: 'right', color: '#4fc3f7' }}>💧 {pt.humid}%</Box>
                    <Box>🕒 {pt.time} | 06.24.2023</Box>
                    <Box sx={{ textAlign: 'right', color: '#4ec152' }}>🟢 {pt.pm25}</Box>
                  </Box>
                </Box>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <Box className="sidebar-overlay">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%', p: 3, overflowY: 'auto' }}>
          <FlightSelectTile 
            flights={MOCK_FLIGHTS} 
            selectedId={selectedFlightId} 
            onSelect={setSelectedFlightId} 
          />
          
          <LayersTile 
            layers={MOCK_LAYERS} 
            activeLayers={activeLayers} 
            onToggle={toggleLayer}
            mode={filterMode}
            onModeChange={setFilterMode}
          />

          <HistogramTile
            title="Temperature Span"
            data={tempData.length ? tempData : (MOCK_HISTOGRAMS.temp as number[])}
            color="#4ec152"
            metric={tempData.length ? String(Math.round(tempData.reduce((s, v) => s + v, 0) / tempData.length)) : undefined}
          />

          <HistogramTile
            title="Humidity Span"
            data={humidData.length ? humidData : (MOCK_HISTOGRAMS.humid as number[])}
            color="#4fc3f7"
            metric={humidData.length ? String(Math.round(humidData.reduce((s, v) => s + v, 0) / humidData.length)) : undefined}
          />
        </Box>
      </Box>
    </Box>
  );
}