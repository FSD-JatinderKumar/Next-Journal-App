'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Cookies from 'js-cookie';

export const useJournalNavLogic = () => {
  const router = useRouter();
  const params = useParams();

  const [BookId, setBookId] = useState('');
  const [name, setName] = useState('');
  const [LoginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    const bookId = params?.Id as string;
    const journalName = params?.name as string;

    setBookId(bookId);
    setName(journalName);

    const cookieData = Cookies.get('authData');
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    setLoginStatus(!!cookieData && isLoggedIn);
  }, [params]);

  const VisitUrl = (bookId: string, journalName: string, suffix: string) => {
    router.push(`/${bookId}/${journalName}/${suffix}`);
  };

  const Logout = () => {
    // Remove specific cookies
    Cookies.remove('authData');
    Cookies.remove('BookData');
  
    // If you know more cookie names, remove them here as well
  
    // Clear session and local storage
    sessionStorage.clear();
    localStorage.clear();
  
    // Navigate to Home and reload
    router.push('/Home');
    setTimeout(() => location.reload(), 500);
  };
  

  return { BookId, name, LoginStatus, VisitUrl, Logout };
};
