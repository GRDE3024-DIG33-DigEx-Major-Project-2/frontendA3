/**
 * React app entry point
 */

//Required dependencies and components for the project
import React from 'react';
import ReactDOM from 'react-dom/client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
//Global styling for the project
import './static/style.css';
//React Router for client-side routing
import { BrowserRouter} from "react-router-dom"; 
//Main App component
import App from './components/App'; 

//Fonts for the project
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

//Mapbox CSS for map styling
import 'mapbox-gl/dist/mapbox-gl.css';

//Get the root element to render the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

//Render the React application
root.render(
  //Enforce best practices by wrapping the app in StrictMode
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LocalizationProvider>
  </React.StrictMode>
);
