import React from 'react';
import AboutData from './ManuScriptWorkFlow';
import Header from '@/app/components/Header/Header';
import TopSlider from '@/app/components/TopSlider/TopSlider';
import JournalNav from '@/app/components/InnerMenu/JournalNav';

const ManuScriptWorkFlow = () => {
  return (
    <main className="p-6">
      <TopSlider/>
      <Header/>
      <JournalNav/>
      <AboutData />
    </main>
  );
};

export default ManuScriptWorkFlow;
