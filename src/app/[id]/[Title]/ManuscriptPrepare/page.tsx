import React from 'react';
import AboutData from './ManuscriptPrepare';
import Header from '@/app/components/Header/Header';
import TopSlider from '@/app/components/TopSlider/TopSlider';
import JournalNav from '@/app/components/InnerMenu/JournalNav';

const ManuscriptPrepare = () => {
  return (
    <main className="p-6">
      <TopSlider/>
      <Header/>
      <JournalNav/>
      <AboutData />
    </main>
  );
};

export default ManuscriptPrepare;
