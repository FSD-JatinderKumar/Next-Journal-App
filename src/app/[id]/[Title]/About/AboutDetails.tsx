'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { GetJournalDetailsforAboutPage } from '@/app/apiCalls/apiCall'; // Adjust according to your file structure
import styles from './AboutDetails.module.css';

import Image from 'next/image';
import EditorDetailsTabs from '@/app/components/EditorDetailsTabs/EditorDetailsTabs';
import TopSlider from '@/app/components/TopSlider/TopSlider';

type Detail = {
  key: string;
  value: string;
};
const extractDetails = (journalDetails: string): Detail[] => {
  if (!journalDetails) return [];

  return journalDetails.split('#').map((item) => {
    const [keyRaw, value] = item.split(':').map(part => part.trim());

    let formattedKey = keyRaw === 'ISSNNo'
      ? 'ISSN No'
      : keyRaw.replace(/([A-Z0-9])/g, ' $1').trim();

    return { key: formattedKey, value };
  });
};
const AboutPage = () => {
  const params = useParams();
  const { id, Title } = params as { id: string; Title: string };

  const [bookData, setBookData] = useState<any>(null);
  const [editorData, setEditorData] = useState<any>(null);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [detailsArray, setDetailsArray] = useState<Detail[]>([]);

  useEffect(() => {
     
    if (!id ) {
      console.error('Missing id or Title. Exiting effect.');
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const journalRes = await GetJournalDetailsforAboutPage(id);
        setBookData(journalRes[0]);
        setEditorData(journalRes[0] || null); 
        const journalDetails =await GetJournalDetailsforAboutPage(id)
        const parsedDetails = extractDetails(journalDetails[0]['journalDetails'] );
        setDetailsArray(parsedDetails);
      } catch (error) {
        console.error('Error loading journal details', error);

        setBookData({
          journalTitle: Title?.toString().replace(/-/g, ' '),
          imageUrl: 'https://files.lpu.in/umsweb/Journal/Journal_2044805024_17_2024_53_biosicences.jpeg',
          volume: 'Vol 23',
          publishDate: '2024-08-10T00:00:00Z',
          editorName: 'Dr. John Doe',
          subTitle: 'Explore scientific excellence with our latest issue.',
        });

        setEditorData({
          editorName: 'Dr. John Doe',
          designation: 'Professor',
          editorAddress: 'Some University, City, Country',
          editorType: 'Editor-in-Chief'
        });
      } finally {
        console.log('Finished fetching data');
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, Title]);

  const VisitUrl = (id: any, name: any, route: string) => {
    const formattedTitle = name.replace(/\s+/g, '-');
    window.location.href = `/${id}/${formattedTitle}/${route}`;
  };

  if (loading) {
    return (
      <div className={styles.container + " text-center py-5"}>
        <h3 className="styles.text-danger">Loading</h3>
        <div className="spinner-grow text-danger" style={{ width: '5rem', height: '5rem' }} role="status" />
      </div>
    );
  }

  return (
    <>
    <section>
      <div className={ "container aboutJournal py-5"}>
        <div className="row">
          <div className="col-lg-4">
            {!imageLoadError ? (
               <Image
               src={bookData.imageUrl}
               alt={bookData.journalTitle}
               className={styles.journalImage}
               width={0}
               height={0}
               onError={() => setImageLoadError(true)}
               unoptimized // remove this if you configure next.config.js correctly
             />         
            ) : (
              <div className="text-danger fs-4">Error loading image</div>
            )}
          </div>
          <div className="col-lg-4">
            <h2 className={styles.title}>{bookData.journalTitle}</h2>
            <ul className={styles.list}>
              <li>Volume: <span>{bookData.volume || 'NA'}</span></li>
              <li>Year: <span>{new Date(bookData.publishDate).getFullYear()}</span></li>
              <li>Editor in Chief: <span>{bookData.editorName}</span></li>
            </ul>
            <p className={styles.subTitle}>{bookData.subTitle}</p>
          </div>
          <div className="col-lg-4">
            <div className={styles.journalDetails}>
              <ul>
                {detailsArray
                  .filter(detail => detail.key !== 'Scope')
                  .map((detail, index) => (
                    <li key={index} className="mb-4">
                      {detail.key}: <span>{detail.value}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center mt-5">
          <h1 className={styles.ctaHeading +' text-center '}>Submit your Manuscript in the Journal</h1>
          <button className="popularGenreBtn btn  " onClick={() => VisitUrl(id, bookData.journalTitle, 'submit')}>
            Upload
          </button>
        </div>
      </div>
      <div className="container mt-4 accordionColor">
      {editorData && (
        <div className="container mt-5">
          <EditorDetailsTabs itemsArray={[editorData]} />
        </div>
      )}
      </div>
      {/* {editorData && (
        <div className="container mt-4 accordionColor">
          <h3>Editor Details</h3>
          <div>
            <h5>{editorData.editorName} ({editorData.editorType})</h5>
            <p><strong>Designation:</strong> {editorData.designation}</p>
            <p><strong>Address:</strong> {editorData.editorAddress}</p>
          </div>
        </div>
      )} */}
    </section>
    </>
  );
};

export default AboutPage;