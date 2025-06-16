import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { Toaster } from "react-hot-toast"; 

const initTheme = () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  document.documentElement.classList.toggle("dark", savedTheme === "dark");
};

initTheme();

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <StrictMode>
      <App />
      <Toaster position="bottom-right" reverseOrder={false} /> 
    </StrictMode>
  </ThemeProvider>
);
