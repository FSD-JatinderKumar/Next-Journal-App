'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CommonHeader from '@/component/HeaderMenu/CommonHeader';

const EditorDashboard = () => {
  const searchParams = useSearchParams();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = searchParams.get('role');
    if (role) {
      setUserRole(role);
    } else {
      // fallback logic if role is not found
      console.warn('No role provided, redirecting or handling error...');
    }
  }, [searchParams]);

  return (
    <>
      <CommonHeader  />
      <h1>Under construction</h1>
    </>
  );
};

export default EditorDashboard;
