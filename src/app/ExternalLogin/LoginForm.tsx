'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useParams } from 'next/navigation';

interface FormData {
    Email: string;
    Password: string;
}

export default function LoginForm() {
    const params = useParams();
    const { id, Title} = params as { id: string; Title: string };
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
    } = useForm<FormData>();
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = (data: FormData) => {
        console.log('Form submitted:', data);
        // Call your API here
    };

    const VisitUrl = (bookId: any, name: any, action: string) => {
        console.log(`Redirecting to ${action} with`, { bookId, name });
    };

    return (
        <>
            <div className="row mt-4">
                <div className="main-heading text-center">
                    <h1>      {Title}    </h1>
                </div>
            </div>
            <div className="row w-100 mx-0 auth-page wrapper mt-5">
                <div className="col-md-12 col-xl-12 mx-auto">
                    <div className="row">

                        <div className="col-md-6 pe-md-0  d-none d-lg-block" style={{
                            height: '40rem',
                            backgroundImage: 'url(https://www.lpu.in/lpu-assets/images/cif/login-left.png)',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                        }} >
                        </div>
                        <div className="col-md-5 ">
                            <div className="auth-form-wrapper px-4 py-5 p-5">
                                <div className="col-md-12 text-center">
                                    <h2 className="nobleui-logo d-block mb-2"> User <span>Login Page</span></h2>
                                </div>
                                <form className="forms-sample" onSubmit={handleSubmit(onSubmit)}>
                                    {/* Email Field */}
                                    <div className="row mb-2 mt-5">
                                        <div className="col-md-1" />
                                        <div className="col-md-4">
                                            <label htmlFor="email" className="col-md-6 form-label">
                                                Username
                                            </label>
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                                type="email"
                                                placeholder="Enter Email Id"
                                                className="col-md-6 form-control"
                                                id="email"
                                                {...register('Email', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                                            />
                                            {isSubmitted && errors.Email && (
                                                <div className="text-danger">
                                                    {errors.Email.type === 'required' && <small>Email is required.</small>}
                                                    {errors.Email.type === 'pattern' && <small>Enter a valid email address.</small>}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-1" />
                                    </div>

                                    {/* Password Field */}
                                    <div className="row mb-2 mt-3">
                                        <div className="col-md-1" />
                                        <div className="col-md-4">
                                            <label htmlFor="password" className="col-md-6 form-label">
                                                Password
                                            </label>
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                                type="password"
                                                placeholder="Enter Password"
                                                className="col-md-6 form-control"
                                                id="password"
                                                {...register('Password', { required: true, minLength: 6 })}
                                            />
                                            {isSubmitted && errors.Password && (
                                                <div className="text-danger">
                                                    {errors.Password.type === 'required' && <small>Password is required.</small>}
                                                    {errors.Password.type === 'minLength' && (
                                                        <small>Password must be at least 6 characters long.</small>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-1" />
                                    </div>

                                    {/* Error Message Display */}
                                    <div className="row mb-2 mt-5">
                                        <div className="col-md-12 p-2 ms-4 text-center">
                                            <span className="fs-5 text-danger">{errorMessage}</span>
                                        </div>
                                    </div>

                                    {/* Submit & Other Actions */}
                                    <div className="row mb-2 mt-3 d-flex justify-content-center">
                                        <div className="col-md-4 text-center">
                                            <button type="submit" className="loginButton">
                                                Submit
                                            </button>
                                        </div>
                                        <div className="col-md-4 text-center">
                                            <button
                                                type="button"
                                                className="loginButton"
                                                onClick={() => VisitUrl('BookId', 'name', 'signup')}
                                            >
                                                Register Now
                                            </button>
                                        </div>
                                        
                                    </div>

                                    
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
