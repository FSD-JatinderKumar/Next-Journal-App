import React from 'react';

import Header from '@/app/components/Header/Header';
import TopSlider from '@/app/components/TopSlider/TopSlider';
import JournalNav from '@/app/components/InnerMenu/JournalNav';
import EditorialData from './EditorialData';

const EditorialBoardPage = () => {
  return (
    <main className="p-6">
      <TopSlider/>
      <Header/>
      <JournalNav/>
      <EditorialData/>
    </main>
  );
};

export default EditorialBoardPage;
