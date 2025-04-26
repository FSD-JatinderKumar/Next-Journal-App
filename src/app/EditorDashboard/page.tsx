'use client';

import React, { useEffect, useState } from 'react';
import CommonHeader from '../components/HeaderMenu/CommonHeader';
import { getFromSession, logout } from '@/app/apiCalls/apiCall'; // Make sure the path is correct

const EditorDashboard = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = getFromSession('userData');
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    } else {
      console.warn('User role not found in session');
      logout();
    }
  }, []);

  return (
    <>
      <CommonHeader />
      {/* <h1>Editor Dashboard</h1>
      {userRole && <p>Role: {userRole}</p>} */}
    </>
  );
};

export default EditorDashboard;


// 'use client';

// import { useSearchParams } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import CommonHeader from '../components/HeaderMenu/CommonHeader';

// const EditorDashboard = () => {
//   const searchParams = useSearchParams();
//   const [userRole, setUserRole] = useState<string | null>(null);

//   useEffect(() => {
//     const role = searchParams?.get('role');
//     if (role) {
//       setUserRole(role);
//     } else {
//       console.warn('No role provided');
//     }
//   }, [searchParams]);

//   return (
//     <>
//       <CommonHeader />
//       {/* <h1>Editor Dashboard</h1>
//       {userRole && <p>Role: {userRole}</p>} */}
//     </>
//   );
// };

// export default EditorDashboard;