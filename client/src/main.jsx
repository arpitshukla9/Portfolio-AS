import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext.jsx';

const initTheme = () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  document.documentElement.classList.toggle("dark", savedTheme === "dark");
};

initTheme();

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <StrictMode>
    <App />
    </StrictMode>
  </ThemeProvider>
);
