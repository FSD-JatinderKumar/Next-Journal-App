import React from 'react';
import AboutData from './AboutDetails';
import Header from '@/app/components/Header/Header';
import TopSlider from '@/app/components/TopSlider/TopSlider';

const AboutPage = () => {
  return (
    <main className="p-6">
      <TopSlider></TopSlider>
      <Header/>
      <AboutData />
    </main>
  );
};

export default AboutPage;
