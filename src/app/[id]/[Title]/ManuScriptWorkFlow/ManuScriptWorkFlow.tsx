'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { manuscriptWorkflowData } from './ManuScriptWorkFlowData';

const ManuscriptWorkflowPage = () => {
  const params = useParams();
  const { id, Title } = params as { id: string; Title: string };

  return (
      <div className="container section">
        <div className="row">
          <div className="col-md-12 mb-3">
            <div className="main-heading">
              <h1>{Title.replace(/-/g, ' ')}</h1>
            </div>
          </div>
        </div>
      <div className="row">
        <div className="col-md-12 mb-3">
          <div className="sub-heading">
            <h3>{manuscriptWorkflowData.subHeading}</h3>
          </div>

          <p>{manuscriptWorkflowData.introduction}</p>
        </div>

        {/* Steps */}
        <div className="col-md-12 main-content">
          {manuscriptWorkflowData.steps.map((step, index) => (
            <p key={index}>
              <strong>{step.boldTitle}</strong> {step.description}
            </p>
          ))}
        </div>
      </div>

      {/* Optional extra notes and image (if you want later) */}
      {/* 
        <div className="row">
          <div className="col-md-12 mb-3">
            <p>It's important to note that the peer review process can vary between journals. Some journals
              might employ single-blind or double-blind review, where the identities of the authors or
              reviewers are hidden. Others might use open peer review, or post-publication peer review.
              Peer review plays a crucial role but also has limitations like bias, delays, etc.
            </p>
          </div>

          <div className="col-md-12 text-center main-content">
            <img src="/assets/images/workflow.jpg" width="auto" height="auto" alt="Workflow Diagram" />
          </div>
        </div>
        */}

    </div>
  );
};

export default ManuscriptWorkflowPage;
