'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken } from '@/app/actions/userActions';

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
  const router = useRouter();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const token = getAuthToken();
      if(!token)
      {
        logout();
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/Mou/GetEmployeeDetails`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch employee details');

      const empData = await response.json();
      const emp = empData.item1?.[0];
      if (!emp) throw new Error('No employee data found');

      const mappedUser: UserData = {
        CandidateName: emp.employeeName,
        UserId: emp.employeeCode,
        Department: emp.department,
        DepartmentName: emp.departmentName,
        Designation: emp.department,
        EmailId: emp.email,
        MobileNo: emp.contactNo,
        UserRole: '',
        SupervisorName: emp.department,
        ProofNumber: emp.contactNo,
        ProofName: 'Mobile',
      };

      setUserData(mappedUser);
      setLoginStatus(true);
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
    // setTimeout(() => location.reload(), 500);
  };

  const visitPage = (path: string) => {
    router.push(`/${path}`);
    setTimeout(() => location.reload(), 500);
  };

  const visitUserPage = (menu: string, id: number, suffix: string) => {
    router.push(`/${menu}/${id}/${suffix}`);
    setTimeout(() => location.reload(), 500);
  };

  return {
    userData,
    loginStatus,
    logout,
    visitPage,
    visitUserPage,
  };
};

// 'use client';

// import { useState, useEffect } from 'react';
// import Cookie from 'js-cookie';
// import { useRouter } from 'next/navigation';
// import { getAuthToken } from '@/app/actions/userActions';

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
//   const router = useRouter();

//   useEffect(() => {
//     getUserData();
//   }, []);

//   const getUserData = async () => {
//     try {
//       const tokens = getAuthToken();  // Ensure this function is correctly fetching a token
//       if (!tokens) {
//         throw new Error('No auth token found');
//       }

//       const empResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/Mou/GetEmployeeDetails`, {
//         headers: { Authorization: `Bearer ${tokens}` },
//       });

//       if (!empResponse.ok) throw new Error('Failed to fetch employee details');
      
//       const empData = await empResponse.json();
      
//       const emp = empData.item1?.[0];
//       if (!emp) throw new Error('No employee data found');

//       const authData = {
//         CandidateName: emp.employeeName,
//         UserId: emp.employeeCode,
//         Department: emp.department,
//         DepartmentName: emp.departmentName,
//         Designation: emp.designation,
//         EmailId: emp.email,
//         MobileNo: emp.contactNo,
//         UserRole: emp.role,
//         SupervisorName: emp.supervisorName,
//         ProofNumber: emp.contactNo,
//         ProofName: 'Mobile',
//       };

//       setUserData(authData);
//       setLoginStatus(true); // Set login status to true after successful data fetch
//       Cookie.set('authData', JSON.stringify(authData)); // Optionally set a cookie with the user data
//     } catch (error) {
//       console.error('Failed to fetch user data:', error);
//       setLoginStatus(false);
//       setUserData(null);
//     }
//   };

//   const logout = () => {
//     Cookie.remove('authData');
//     Cookie.remove('BookData');
//     sessionStorage.clear();
//     localStorage.clear();
//     setUserData(null);
//     setLoginStatus(false);
//     router.push('/Login');
//     setTimeout(() => location.reload(), 500);
//   };

//   const visitPage = (path: string) => {
//     router.push(`/${path}`);
//     setTimeout(() => location.reload(), 500);
//   };

//   const visitUserPage = (menu: string, id: number, suffix: string) => {
//     router.push(`/${menu}/${id}/${suffix}`);
//     setTimeout(() => location.reload(), 500);
//   };

//   return {
//     userData,
//     loginStatus,
//     logout,
//     visitPage,
//     visitUserPage,
//   };
// };
