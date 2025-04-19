// app/login/loginLogic.ts

import Swal from 'sweetalert2';
import { loginUser } from './loginApi';
import { setAuthToken,getAuthToken, logout } from '../actions/userActions';
export async function handleLogin(
  email: string,
  password: string,
  setError: (msg: string) => void,
  router: any
) {
  try {
    const data = await loginUser(email, password);

    onSuccess: (response: any) => {
      sessionStorage.removeItem('common-user');
      if (response) {
          if (response=='Token Expired'){
              Swal.fire({
                  title: 'Server Error',
                  text: 'Network Issue',
                  icon: 'error',
              });
              router.push('https://ums.lpu.in/lpuums/');
              return;
          }
          setAuthToken(response);
          Swal.fire({
              title: 'Authorized',
              text: "User Verified",
              icon: 'success',
              confirmButtonText: "OK"
          });
          if (sessionStorage.getItem('userType') == 'HeadOffice') {
              router.push('/all-appointments');
          } else {
              router.push('/show-appointments');
          }
      } else {
          logout();
          Swal.fire({
              title: 'Error',
              text: "Something went wrong",
              icon: 'error',
              confirmButtonText: "OK"
          });
          router.push('https://ums.lpu.in/lpuums/');
      }
  }

    localStorage.setItem('token', data.token); // or use cookies
    router.push('/dashboard'); // Navigate after login
  } catch (error: any) {
    setError(error.message || 'Something went wrong');
  }
}
