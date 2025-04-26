'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAuthToken,
  getUserDataApiCall,
  addToSession,
  getFromSession,
} from '@/app/apiCalls/apiCall'; // <- Updated import

interface UserData {
  CandidateName: string;
  UserId: string;
  Department: string;
  DepartmentName: string;
  Designation: string;
  EmailId: string;
  MobileNo: string;
  UserRole: string;
  SupervisorName: string;
  ProofNumber: string;
  ProofName: string;
}

export const useCommonHeader = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loginStatus, setLoginStatus] = useState(false);
  const [userRole, setUserRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }

    // Load userData from sessionStorage if available
    const storedUserData = getFromSession('userData');
    if (storedUserData) {
      setUserData(storedUserData);
      setLoginStatus(true);
      setUserRole(storedRole || ''); // ✅ Get role from session
    } else {
      getUserData(); // fetch if not in session
    }
  }, []);

  const getUserData = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        logout();
        return;
      }

      const response = await getUserDataApiCall();
      if (!response) throw new Error('Failed to fetch employee details');

      const mappedUser: UserData = {
        CandidateName: response.employeeName,
        UserId: response.employeeCode,
        Department: response.department,
        DepartmentName: response.departmentName,
        Designation: response.department,
        EmailId: response.email,
        MobileNo: response.contactNo,
        UserRole: userRole,
        SupervisorName: response.department,
        ProofNumber: response.contactNo,
        ProofName: 'Mobile',
      };

      setUserData(mappedUser);
      setLoginStatus(true);
      addToSession('userData',mappedUser);
    } catch (error) {
      console.error('Error fetching user data:', error);
      logout();
    }
  };

  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    setUserData(null);
    setLoginStatus(false);
    router.push('/Login');
  };

  const visitPage = (path: string) => {
    router.push(`/${path}`);
    // setTimeout(() => location.reload(), 50);
  };

  const visitUserPage = (menu: string, id: number, suffix: string) => {
    router.push(`/${menu}/${id}/${suffix}`);
    // setTimeout(() => location.reload(), 50);
  };

  return {
    userData,
    userRole,
    loginStatus,
    logout,
    visitPage,
    visitUserPage,
  };
};

// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { getAuthToken, getUserDataApiCall } from '@/app/apiCalls/apiCall';
// import Cookies from 'js-cookie'; 

// interface UserData {
//   CandidateName: string;
//   UserId: string;
//   Department: string;
//   DepartmentName: string;
//   Designation: string;
//   EmailId: string;
//   MobileNo: string;
//   UserRole: string;
//   SupervisorName: string;
//   ProofNumber: string;
//   ProofName: string;
// }

// export const useCommonHeader = () => {
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [loginStatus, setLoginStatus] = useState(false);
//   const [userRole, setUserRole] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     const storedRole = localStorage.getItem('userRole');
//     if (storedRole) {
//       setUserRole(storedRole);
//     }
//     getUserData();
//   }, []);

//   const getUserData = async () => {
//     try {
//       const token = getAuthToken();
//       if (!token) {
//         alert('tttt')
//         logout();
//       }

//       const response = getUserDataApiCall()

//       if (!response) throw new Error('Failed to fetch employee details');

//       const emp = await response;
//       // const emp = empData.item1?.[0];
//       // console.log("EMP" + JSON.stringify(emp))
//       if (!emp) throw new Error('No employee data found');

//       const mappedUser: UserData = {
//         CandidateName: emp.employeeName,
//         UserId: emp.employeeCode,
//         Department: emp.department,
//         DepartmentName: emp.departmentName,
//         Designation: emp.department,
//         EmailId: emp.email,
//         MobileNo: emp.contactNo,
//         UserRole: userRole,
//         SupervisorName: emp.department,
//         ProofNumber: emp.contactNo,
//         ProofName: 'Mobile',
//       };

//       setUserData(mappedUser);
      
//       Cookies.set('authData', JSON.stringify(mappedUser));
//       setLoginStatus(true);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       logout();
//     }
//   };

//   const logout = () => {
//     sessionStorage.clear();
//     localStorage.clear();
//     setUserData(null);
//     setLoginStatus(false);
//     router.push('/Login');
//   };

//   const visitPage = (path: string) => {
//     router.push(`/${path}`);
//     setTimeout(() => location.reload(), 50);
//   };

//   const visitUserPage = (menu: string, id: number, suffix: string) => {
//     router.push(`/${menu}/${id}/${suffix}`);
//     setTimeout(() => location.reload(), 50);
//   };

//   return {
//     userData,
//     userRole,
//     loginStatus,
//     logout,
//     visitPage,
//     visitUserPage,
//   };
// };
