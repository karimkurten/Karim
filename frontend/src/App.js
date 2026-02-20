import React from 'react';
import '@/App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import ValueProposition from './components/ValueProposition';
import Expertise from './components/Expertise';
import Timeline from './components/Timeline';
import Certifications from './components/Certifications';
import ImpactMetrics from './components/ImpactMetrics';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <ValueProposition />
        <Expertise />
        <Timeline />
        <Certifications />
        <ImpactMetrics />
        <Contact />
      </main>
    </div>
  );
}

export default App;
