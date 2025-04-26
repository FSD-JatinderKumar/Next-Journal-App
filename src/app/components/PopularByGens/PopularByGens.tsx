'use client';

import { useEffect, useState } from 'react';
import { GetAllJournalMasterwithEditorDetails } from '@/app/apiCalls/apiCall'; // Adjust import path
import styles from './PopularByGens.module.css'; // Import the CSS module for scoped styles
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

interface Journal {
  imageUrl: string;
  journalTitle: string;
  genres: string;
  editorName: string;
}

const PopularByGenre = () => {
  const [data, setData] = useState<Journal[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(6);
  const [imageLoadError, setImageLoadError] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const journals = await GetAllJournalMasterwithEditorDetails();
  //       setData(journals);
  //       setImageLoadError(new Array(journals.length).fill(false));
  //     } catch (error) {
  //       console.error('Failed to load journal data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    
    setTimeout(() => {
      GetAllJournalMasterwithEditorDetails()
        .then(data => setData(data))
        .catch(err => console.error('Error loading Journal Details', err));
      setImageLoadError(new Array(data.length).fill(false));
      setLoading(false);
    }, 1500);
  }, []);

  const totalPages = Math.ceil(data.length / recordsPerPage);
  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getRecordsForCurrentPage = () => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    return data.slice(startIndex, startIndex + recordsPerPage);
  };

  const handleImageError = (index: number) => {
    const newErrors = [...imageLoadError];
    newErrors[index] = true;
    setImageLoadError(newErrors);
  };

  return (
    <>
    <LoadingScreen isLoading={loading} />
    {!loading && (
    <section className={`container my-5 ${styles.section}`}>
      <div className={styles.popularGenreSection}>
        <div className={styles.popularGenre}>
          <h3>Popular by Genre</h3>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li>
              <a className="active" id="journals-tab" data-bs-toggle="tab" data-bs-target="#journals" role="tab" aria-controls="journals" aria-selected="true">
                Journals
              </a>
            </li>
          </ul>
        </div>

        <div className={`tab-content ${styles.tabContent}`} id="myTabContent">
          <div className={`tab-pane fade show active ${styles.tabPane}`} id="journals" role="tabpanel" aria-labelledby="journals-tab">
            <div className="row">
              {getRecordsForCurrentPage().map((journal, index) => (
                <div className="col-md-4" key={index}>
                  <div className={styles.popularGenreContent}>
                    <div className={styles.popularGenreImg}>
                      {!imageLoadError[index] ? (
                        <img
                          src={journal.imageUrl}
                          alt={journal.journalTitle}
                          height="180"
                          width="180"
                          onError={() => handleImageError(index)}
                        />
                      ) : (
                        <p className="error-message">Error loading image</p>
                      )}
                      <p className={styles.textStyle +" d-md-none d-lg-block"}>{journal.journalTitle}</p>
                    </div>
                    <p className={styles.popularGenreDesc}>
                      {journal.journalTitle}
                      {journal.genres}
                    </p>
                    <p className={styles.popularGenreAuthor}>{journal.editorName}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-end align-items-center mt-3">
              <nav>
                <ul className="pagination text-dark">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                      &lt;
                    </button>
                  </li>
                  {pagesArray.map((page) => (
                    <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(page)}>
                        {page}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                      &gt;
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  )}
  </>
  );
};

export default PopularByGenre;
