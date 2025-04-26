import axios from './axiosObj'; // use the instance, not raw axios
const USER_KEY = 'auth-user';

export const getAllUsers = async () => {
  const response = await axios.get('/users');
  return response.data;
};

export const getUserById = async (id: number) => {
  const response = await axios.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (userData: any) => {
  const response = await axios.post('/users', userData);
  return response.data;
};



export const getUserDataApiCall = async () => {
  try {
    const token = getAuthToken();
    if (!token) logout();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/Mou/GetEmployeeDetails`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Failed to fetch employee details');

    const empData = await response.json();
    const emp = empData.item1?.[0];
    if (!emp) throw new Error('No employee data found');
    return emp;
  } catch (error) {
    console.error('Error fetching user data:', error);
    logout();
  }
};
// All Manuscript for journal id
export const getAllManuscriptsForJournal = async (journalId: string) => {
  try {
    const token = getAuthToken();
    if (!token) logout();
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/LpuJournal/GetAllMenuScriptForJournal?Id=${journalId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.item1 || [];
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
};

// get all reviewers details

export const getReviewerDetailsForEditor = async (userId: string) => {
  try {
    const token = getAuthToken();
    if (!token) logout();
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/LpuJournal/GetAllReviewersForEditors?UserId=${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.item1 || [];
  } catch (error) {
    console.error('Error fetching reviewer data:', error);
    throw error;
  }
};

export const adminLogin = async (formData: { userName: string; password: string }) => {

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}security/createToken`,
      formData
    );
    if (response.data && response.data.token) {
      return {
        success: true,
        token: response.data.token,
        data: response.data,
      };
    } else {
      // console.warn('⚠️ No token received in response:', response.data);
      return {
        success: false,
        message: 'Invalid Login Details',
      };
    }
  } catch (err: any) {
    console.error('❌ Login error caught:', err);
    console.error('❌ Error details:', err?.response?.data || err.message);
    return {
      success: false,
      message: err?.response?.data?.message || 'Login failed',
    };
  }
};


export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  return;
}

export const setAuthToken = (token: any) => {
  sessionStorage.setItem('token', token);
  return;
}

export const getAuthToken = () => {
  const token: any = sessionStorage.getItem('token');
  return token;
}

export const saveUser = (user: any) => {
  localStorage.setItem(USER_KEY, user)
  window.sessionStorage.removeItem(USER_KEY);
  window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}



// export const getAllManuscriptsForJournal = async (journalId: any) => {
//   try {
//     const response = await axios.get(`/api/journal/${journalId}`);
//     // assuming the API returns { item1: [...] }
//     return response.data.item1 || [];
//   } catch (error) {
//     console.error('Error fetching data', error);
//     throw error;
//   }
// };


// 23-April-25


export const addToSession = (key: any, userData: any) => {
  sessionStorage.setItem(key, JSON.stringify(userData));
};

// utils/sessionUtils.ts

export const getFromSession = (key: any) => {
  if (typeof window === 'undefined') return null; // Ensure it's client-side
  const value = sessionStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};


export const GetAllMenuScriptForJournalId = async (JournalId: any) => {
  try {
    const token = getAuthToken();
    if (!token) logout();
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/LpuJournal/GetAllMenuScriptForJournal?Id=${JournalId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.item1 || [];
  } catch (error) {
    console.error('Error fetching reviewer data:', error);
    throw error;
  }
}


export const GetAllReviewersForJournalId = async (JournalId: any) => {
  try {
    const token = getAuthToken();
    if (!token) logout();
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/LpuJournal/GetAllReviewersForJournal?Id=${JournalId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.item1 || [];
  } catch (error) {
    console.error('Error fetching reviewer data:', error);
    throw error;
  }
}

// reviewerApi.ts or APIcall.ts

export async function assignNewReviewerForJournal(assignNewReviewer: FormData) {
  const token = getAuthToken();
  // if (!token) throw new Error("Authentication token not found");
  if (!token) logout(); //  if (!token) throw new Error("Authentication token not found");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/LpuJournal/AssignReviewerForJournal`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': '*/*',
    },
    body: assignNewReviewer, // FormData is used as body without Content-Type
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error assigning reviewer: ${error}`);
  }

  return await response.json();
}

export const GetAllReviewersRemarkss = async (JournalId: any) => {
  try {
    const token = getAuthToken();
    if (!token) logout(); //  if (!token) throw new Error("Authentication token not found");
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/LpuJournal/GetReviewersRemarks?JournalId=${JournalId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.item1 || [];
  } catch (error) {
    console.error('Error fetching reviewer data:', error);
    throw error;
  }
}
export const getAllJournalUserDetails = async (RoleId: any) => {
  try {
    const token = getAuthToken();
    if (!token) logout();   if (!token) throw new Error("Authentication token not found");
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/LpuJournal/GetAllJournalUserDetails?Role=${RoleId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(JSON.stringify(response))
    return response.data.item1 || [];
  } catch (error) {
    console.error('Error fetching reviewer data:', error);
    throw error;
  }
}


//  24-4-25
const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJMb2dpbk5hbWUiOiJMUFVKb3VybmFsIiwibmJmIjoxNzM5MjU0OTYzLCJleHAiOjE3NzA3OTA5NjMsImlhdCI6MTczOTI1NDk2MywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzEyNS8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MTI1LyJ9.Ir-NM1QRF4MMr-hSvbMAhwv6Fzyhc3agCmn0TkqtwrM';//
export const GetAllBooksDetails = async () => {
  try {
     
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/LpuJournal/GetAllJournalData`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    // console.log(JSON.stringify(response))
    return response.data.item1 || [];
  } catch (error) {
    console.error('Error fetching Books data:', error);
    throw error;
  }
}
//25-4-25
export const GetJournalDetailsforAboutPage  = async (JournalId: any) => {
  try {
     
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/LpuJournal/GetJournalDetailsforAboutPage?JournalId=${JournalId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data.item1  || [];
  } catch (error) {
    console.error('Error fetching Journal data:', error);
    throw error;
  }
}
 
export const GetAllJournalEditorsDetails = async () => {
  try {
     
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/LpuJournal/GetAllJournalEditorsDetails`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data.item1 || [];
  } catch (error) {
    console.error('Error fetching Journal Editors data:', error);
    throw error;
  }
}
 
export const  GetAllJournalMasterwithEditorDetails = async () => {
  try {
     
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/LpuJournal/GetAllJournalMasterwithEditorDetails`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data.item1 || [];
  } catch (error) {
    console.error('Error fetching Journal Editors data:', error);
    throw error;
  }
} 