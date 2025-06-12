import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import useThemeStore from './store/useThemeStore.js';
import ThemeToggle from './components/ThemeToggle.jsx';
import HomePage from './pages/Homepage.jsx';
import WorkPage from './pages/WorkPage.jsx';
import ThinkingPage from './pages/ThinkingPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import Collab from './pages/Collab.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx'; 
import BlogPost from './components/Blog.jsx';

function App() {
  const { darkMode } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/thinking" element={<ThinkingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/collab" element={<Collab />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
