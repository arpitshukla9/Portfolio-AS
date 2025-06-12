import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Contact from '../components/Contact.jsx';

const ContactUsPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="py-8">
        <Contact />
      </div>
    </div>
  );
};

export default ContactUsPage;
