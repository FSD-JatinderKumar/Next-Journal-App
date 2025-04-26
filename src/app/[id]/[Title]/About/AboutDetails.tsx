'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { GetJournalDetailsforAboutPage } from '@/app/apiCalls/apiCall'; // Adjust according to your file structure
import styles from './AboutDetails.module.css';

import Image from 'next/image';
import EditorDetailsTabs from '@/app/components/EditorDetailsTabs/EditorDetailsTabs';
import TopSlider from '@/app/components/TopSlider/TopSlider';

const AboutPage = () => {
  const params = useParams();
  // console.log('Params:', params);  // Log params to check if id and journalTitle are available
  const { id, journalTitle } = params as { id: string; journalTitle: string };

  const [bookData, setBookData] = useState<any>(null);
  const [editorData, setEditorData] = useState<any>(null);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [loading, setLoading] = useState(true);

  const detailsArray = [
    { key: 'ISSN', value: '1234-5678' },
    { key: 'Language', value: 'English' },
    { key: 'Frequency', value: 'Bi-Annually' },
    { key: 'Publisher', value: 'LPU Press' },
    // 'Scope' intentionally excluded in the map
  ];

  useEffect(() => {
    console.log('useEffect triggered'); // Log to see if the useEffect is triggered
    if (!id ) {
      console.error('Missing id or journalTitle. Exiting effect.');
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      // console.log('Fetching journal details...');  // Log to see if the API is called
      try {
        // Fetch journal details
        const journalRes = await GetJournalDetailsforAboutPage(id);
        // console.log('Journal Details:', journalRes);
        setBookData(journalRes[0]);

        setEditorData(journalRes[0] || null); // Assuming editor data is the first item in the array

      } catch (error) {
        console.error('Error loading journal details', error);

        // Fallback to static data in case of an error
        setBookData({
          journalTitle: journalTitle?.toString().replace(/-/g, ' '),
          imageUrl: 'https://files.lpu.in/umsweb/Journal/Journal_2044805024_17_2024_53_biosicences.jpeg',
          volume: 'Vol 23',
          publishDate: '2024-08-10T00:00:00Z',
          editorName: 'Dr. John Doe',
          subTitle: 'Explore scientific excellence with our latest issue.',
        });

        // Fallback editor data
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
  }, [id, journalTitle]);

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
                    <li key={index}>
                      <strong>{detail.key}:</strong> <span>{detail.value}</span>
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


// 'use client';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { useParams } from 'next/navigation';
// import styles from './AboutDetails.module.css'
// const AboutPage = () => {
//   const params = useParams();
//   const { id, journalTitle } = params as { id: string; journalTitle: string };
//   const [bookData, setBookData] = useState<any>(null);
//   const [imageLoadError, setImageLoadError] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const detailsArray = [
//     { key: 'ISSN', value: '1234-5678' },
//     { key: 'Language', value: 'English' },
//     { key: 'Frequency', value: 'Bi-Annually' },
//     { key: 'Publisher', value: 'LPU Press' },
//     // 'Scope' intentionally excluded in the map
//   ];

//   useEffect(() => {
//     // Simulate async fetch
//     setTimeout(() => {
//       setBookData({
//         journalTitle: journalTitle?.toString().replace(/-/g, ' '),
//         imageUrl: 'https://files.lpu.in/umsweb/Journal/Journal_2044805024_17_2024_53_biosicences.jpeg',
//         volume: 'Vol 23',
//         publishDate: '2024-08-10T00:00:00Z',
//         editorName: 'Dr. John Doe',
//         subTitle: 'Explore scientific excellence with our latest issue.',
//       });
//       setLoading(false);
//     }, 1500);
//   }, [journalTitle]);

//   const VisitUrl = (id: any, name: any, route: string) => {
//     const formattedTitle = name.replace(/\s+/g, '-');
//     window.location.href = `/${id}/${formattedTitle}/${route}`;
//   };

//   if (loading) {
//     return (
//       <div className={styles.container +" text-center py-5" }>
//         <h3 className="styles.text-danger">Loading</h3>
//         <div className="spinner-grow text-danger" style={{ width: '5rem', height: '5rem' }} role="status" />
//       </div>
//     );
//   }

//   return (
//     <section>
//     <div className="container about-journal py-5">
//       <div className="row">
//         <div className="col-lg-4">
//           {!imageLoadError ? (
//             <img
//               src={bookData.imageUrl}
//               alt={bookData.journalTitle}
//               title={bookData.journalTitle}
//               className={styles.journalImage}
//               onError={() => setImageLoadError(true)}
//             />
//           ) : (
//             <div className="text-danger fs-4">Error loading image</div>
//           )}
//         </div>
//         <div className="col-lg-4">
//           <h2 className={styles.title}>{bookData.journalTitle}</h2>
//           <ul className={styles.list}>
//             <li>Volume: <span>{bookData.volume || 'NA'}</span></li>
//             <li>Year: <span>{new Date(bookData.publishDate).getFullYear()}</span></li>
//             <li>Editor in Chief: <span>{bookData.editorName}</span></li>
//           </ul>
//           <p className={styles.subTitle}>{bookData.subTitle}</p>
//         </div>
//         <div className="col-lg-4">
//           <div className={styles.journalDetails}>
//             <ul>
//               {detailsArray
//                 .filter(detail => detail.key !== 'Scope')
//                 .map((detail, index) => (
//                   <li key={index}>
//                     <strong>{detail.key}:</strong> <span>{detail.value}</span>
//                   </li>
//                 ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//       <div className="row text-center mt-5">
//         <h1 className={styles.ctaHeading}>Submit your Manuscript in the Journal</h1>
//         <button className="btn btn-warning mt-3">Upload</button>
//       </div>
//     </div>
//   </section>  
//   );
// };

// export default AboutPage;
