'use client';

import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="row w-100 mx-0 auth-page wrapper" id="ServerError">
      <div
        className="col-sm-12"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center text-center">
          <span className="text-danger fs-3 mb-3">Loading</span>
          <div
            className="spinner-grow text-danger"
            style={{ width: '14rem', height: '14rem' }}
            role="status"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
