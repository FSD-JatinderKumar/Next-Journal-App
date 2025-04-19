'use client'
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { adminLogin } from "../apiCalls/apiCalling";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { queryClient }from "../ClientProvider";

const USER_KEY = 'auth-user';

export const useLogin = () => {
    const router = useRouter();
    return useMutation({
        mutationKey: ['login'],
        mutationFn: adminLogin,
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
        // onError: (response: any) => {
        //     alert("Error 2")
        //     logout();
        //     toast.error(`${response.message}`);
        //     router.push('https://ums.lpu.in/lpuums/')
        // }
    })
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
