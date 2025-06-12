import React from 'react';
import Navbar from '../components/navbar.jsx';
import Work from '../components/Work.jsx';

const WorkPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="py-8">
        <Work />
      </div>
    </div>
  );
};

export default WorkPage;
