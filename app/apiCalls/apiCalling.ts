import { getAuthToken } from "../actions/userActions";
import api from "../API/axiosInstance";
import { queryClient } from "../ClientProvider";
import axios from "axios";
import { Session } from "inspector/promises";
const tokenx='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJMb2dpbk5hbWUiOiIzMTMwOSIsIm5iZiI6MTc0NDYwMjgyMCwiZXhwIjoxNzQ0Njg5MjIwLCJpYXQiOjE3NDQ2MDI4MjAsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcxMjUvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzEyNS8ifQ.GNiwWExRbxva3l25J6F-Dtug2LqKrB-fvbK_GOFfJvQ';
// ⁡⁣⁣⁢Done as per .NET⁡
// export const adminLogin = async (data: any) => {
//   try {
//     // console.log(data);
//     const response = await axios.post(
//       process.env.NEXT_PUBLIC_AUTH_API + "security/createCommonToken",
//       data,
//       {
//         headers: {
//           // "Content-Type": "application/json",
//         },
//       }
//     );
//     // console.log("login response data", response);
//     // console.log("---->" + response.data);
//     // alert("---->" + response);
//     return response.data;
//   } catch (err: any) {
//     return err.response.data;
//   }
// };
 
export const adminLogin = async (FormData: { userName: string; password: string }) => {
  // export const adminLogin = async () => {
    
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}security/createToken `,
       FormData 
      );
      console.log('Login successful:', response.data);
  
      return {
        success: true,
        token: response.data.token,
        data: response.data  
      };
    } catch (err: any) {
      console.error('Login error:', err?.response?.data || err.message);
      return {
        success: false,
        message: err?.response?.data?.message || 'Login failed'
      };
    }
  };