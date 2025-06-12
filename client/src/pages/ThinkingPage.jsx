import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Think from '../components/Thinking.jsx';

const ThinkingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="py-8">
        <Think />
      </div>
    </div>
  );
};

export default ThinkingPage;
