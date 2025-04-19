'use server';
import { data } from "jquery";
import { getAuthToken, setAuthToken } from "../actions/userActions";
import api from "../API/axiosInstance";
import { queryClient } from "../ClientProvider";
import axios from "axios";
import { Session } from "inspector/promises";


import { cookies } from 'next/headers';


export const adminLogin = async (formData: { userName: string; password: string }) => {
  console.log('📤 Sending login request with:', formData);

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}security/createToken`,
      formData
    );

    console.log('✅ API response received:', response);
    console.log('📦 Response data:', response.data);

    if (response.data && response.data.token) {
      return {
        success: true,
        token: response.data.token,
        data: response.data,
      };
    } else {
      console.warn('⚠️ No token received in response:', response.data);
      return {
        success: false,
        message: 'Invalid response from server',
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

export async function handleLogin(formData: { Email: string; password: string; UserRoles: string }) {
  try {
    const encodedUid = btoa(formData.Email);
    const encodedPassword = btoa(formData.password);

    const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/security/createtoken`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName: atob(encodedUid), password: atob(encodedPassword) }),
    });
    if (!loginResponse) throw new Error('Login failed');

    const loginData = await loginResponse.json();
    const token = loginData.token;
    (await cookies()).set('token', token); // Save token in cookies

    const empResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Mou/GetEmployeeDetails`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!empResponse.ok) throw new Error('Failed to fetch employee details');

    const empData = await empResponse.json();
    const emp = empData.data.item1?.[0];

    if (!empData) throw new Error('No employee data found');

    const authData = {
      CandidateName: emp.employeeName,
      UserId: emp.employeeCode,
      Department: emp.department,
      DepartmentName: emp.departmentName,
      Designation: emp.department,
      EmailId: emp.email,
      MobileNo: emp.contactNo,
      UserRole: formData.UserRoles,
      SupervisorName: emp.department,
      ProofNumber: emp.contactNo,
      ProofName: 'Mobile',
      PasswordText: formData.password,
    };

    (await cookies()).set('authData', JSON.stringify(authData));

    return { success: true, role: formData.UserRoles };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
