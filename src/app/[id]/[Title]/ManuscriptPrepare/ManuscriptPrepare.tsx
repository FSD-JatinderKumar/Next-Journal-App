'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { manuscriptData } from './ManuscriptData';

const ManuscriptPrepare = () => {
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
        {/* Title and Sub-Heading */}
        <div className="row">
          <div className="col-md-12 mb-3">
            {manuscriptData.subHeadings.map((sub, index) => (
              <div key={index} className="sub-heading">
                <h3>{sub.title}</h3>
                <p>{sub.description}</p>
              </div>
            ))}
          </div>

          {/* Sections */}
          <div className="col-md-12 main-content">
            {manuscriptData.sections.map((section, index) => (
              <div key={index} >
                <h4 className="mt-0">{section.heading}</h4>
                {section.items.map((item, idx) => (
                  <p key={idx}>
                    <strong>{item.boldTitle}</strong> {item.description}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Preparation Steps */}
        <div className="row">
          <div className="col-md-12 mb-3">
            <div className="sub-heading">
              <h3>Preparation Steps:</h3>
            </div>
          </div>

          <div className="col-md-12 main-content">
            <ol>
              {manuscriptData.preparationSteps.map((step, index) =>
                typeof step === 'string' ? (
                  <li key={index}>{step}</li>
                ) : (
                  <li key={index}>
                    {step.title}
                    <ul>
                      {step.list.map((listItem, idx) => (
                        <li key={idx}>{listItem}</li>
                      ))}
                    </ul>
                  </li>
                )
              )}
            </ol>
          </div>
        </div>

        {/* Reference Styles */}
        <div className="row">
          <div className="col-md-12 mb-3">
            <div className="sub-heading">
              <h3>{manuscriptData.referenceStyle.heading}</h3>
            </div>
            <div className="main-content">
              <p>{manuscriptData.referenceStyle.description}</p>
            </div>
          </div>
        </div>

      </div>
  );
};

export default ManuscriptPrepare;
