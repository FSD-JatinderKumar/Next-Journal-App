// src/pages/about.js
'use client';

import React from 'react';
import { useRouter } from 'next/router';
import styles from './About.module.css'; // Optional: Import styles if you have a CSS module

const About = () => {
  const router = useRouter();
  const { id, title } = router.query; // Get the journal ID and title from the query parameters

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>
        This page contains detailed information about the journal with ID: {id}. 
        Here you can explore various articles, research papers, and insights related to the journal.
      </p>
      <h2>Journal Details</h2>
      <p>
        {/* You can add more detailed information about the journal here */}
        The Journal of {title} focuses on the latest research and developments in its field. 
        It publishes articles, reviews, and case studies that contribute to the advancement of knowledge.
      </p>
      <h2>How to Access Articles</h2>
      <p>
        To access articles from this journal, please visit the journal's official website or 
        check your institution's library resources.
      </p>
      <button onClick={() => router.back()} className="btn btn-secondary">
        Go Back
      </button>
    </div>
  );
};

export default About;