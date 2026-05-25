export const PROJECT_NAME = "ORBIT";
export const SIDEPROJECT_NAME = "Dashboard";

export const sidebarElements = [
  {
    name: "Live Flight",
    icon: "live-flight-icon",
    path: "/live-flight",
  },
  {
    name: "Map & Data",
    icon: "map-data-icon",
    path: "/map-data",
  },
  {
    name: "Modules",
    icon: "modules-icon",
    path: "/modules",
  },
  {
    name: "Alerts",
    icon: "alerts-icon",
    path: "/alerts",
  },
];

export const MAIN_MAP_DATA_WIDGET_TITLE = "Layers";

export const MOCK_FLIGHTS = [
  {
    id: "flight_1",
    name: "Krakow Survey A",
    date: "2023-06-24",
    location: [50.0614, 19.9365],
  },
  {
    id: "flight_2",
    name: "Krakow Survey B",
    date: "2023-06-25",
    location: [50.0414, 19.9265],
  },
];

export const MOCK_LAYERS = [
  { id: "pm25", name: "Air pollution (PM 2.5)" },
  { id: "pm10", name: "Air pollution (PM 10)" },
  { id: "temp", name: "Temperature" },
  { id: "humid", name: "Humidity" },
];

export const MOCK_POINTS = {
  flight_1: [
    {
      id: "p1",
      lat: 50.0614,
      lng: 19.9365,
      temp: 18,
      humid: 50,
      pm25: 2.4,
      time: "14:35",
    },
    {
      id: "p2",
      lat: 50.065,
      lng: 19.94,
      temp: 19,
      humid: 48,
      pm25: 3.1,
      time: "14:40",
    },
    {
      id: "p3",
      lat: 50.058,
      lng: 19.93,
      temp: 17,
      humid: 55,
      pm25: 2.1,
      time: "14:45",
    },
  ],
  flight_2: [
    {
      id: "p4",
      lat: 50.0414,
      lng: 19.9265,
      temp: 22,
      humid: 40,
      pm25: 1.5,
      time: "10:15",
    },
    {
      id: "p5",
      lat: 50.045,
      lng: 19.935,
      temp: 23,
      humid: 38,
      pm25: 1.2,
      time: "10:20",
    },
  ],
};

export const MOCK_HISTOGRAMS = {
  temp: [5, 10, 15, 20, 25, 20, 15, 10, 5],
  humid: [30, 40, 50, 70, 60, 40, 30],
};
