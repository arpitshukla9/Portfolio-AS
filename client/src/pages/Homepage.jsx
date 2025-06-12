import React from "react";
import Header from "../components/Header.jsx";
import Body from "../components/body.jsx";
import ContactForm from "../components/Contact.jsx";
import Work from "../components/Work.jsx";
import Thinking from "../components/Thinking.jsx";
import Blog from "../components/Blog.jsx";
import Skills from "../components/Skills.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";
import CollabTogether from "../components/CollabTogether.jsx"

function Homepage() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-300">
      <ThemeToggle />
      <Header />
      <main>
        <section id="home">
          <Body />
        </section>
        <section id="collab">
          <CollabTogether />
        </section>
        <section id="work">
          <Work />
        </section>
        <section id="thinking">
          <Thinking />
        </section>
        <section id="lab">
          <Skills />
        </section>
        <section id="blog">
          <Blog />
        </section>
        <section id="contact">
          <ContactForm />
        </section>
      </main>
    </div>
  );
}

export default Homepage;
