'use client';

import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { setAuthToken, saveUser, logout } from '../apiCalls/apiCall';
import { adminLogin ,addToSession} from '../apiCalls/apiCall';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';
import Header from '../components/Header/Header';

export default function LoginForm() {
  const [form, setForm] = useState({ userName: '', password: '', UserRoles: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ userName: '', password: '', UserRoles: '' });
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  const roles = [
    { label: 'Editor', value: '0' },
    { label: 'Author', value: '1' },
    { label: 'Reviewer', value: '2' },
    { label: 'Publisher', value: '3' },
  ];

  const validate = () => {
    const newErrors: any = {};
    if (!form.userName) newErrors.userName = 'User Id is required.';
    if (!form.password) newErrors.password = 'Password is required.';
    else if (form.password.length < 6) newErrors.password = 'Min 6 characters.';
    if (!form.UserRoles) newErrors.UserRoles = 'Role is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!validate()) return;
    const result = await adminLogin({
      userName: form.userName,
      password: form.password,
    });
    setTimeout(() => {
      adminLogin({
        userName: form.userName,
        password: form.password,
      })
      .then(result => setAuthToken(result.token))
      .catch(err => console.error('Error ', err));
      setLoading(false);
    }, 1500);
  
    if (result.success) {
      setAuthToken(result.token);
      saveUser(result.token);
      // console.log(form.UserRoles)
      localStorage.setItem('userRole', form.UserRoles); // ✅ Save role in localStorage
      // addToSession('userData', form.UserRoles); 
      switch (form.UserRoles) {
        case '0':
          redirect('/EditorDashboard');
        case '1':
          redirect('/AuthorDashboard');
          //Swal.fire('Author Access', 'Author dashboard is under construction.', 'info');
        case '2':
          redirect('/ReviewersDashboard');
          break;
        case '3':
          redirect('/PublisherDashboard');
        default:
          Swal.fire('Unknown Role', 'Unable to determine role.', 'error');
      }
    } else {
      console.warn('🛑 Login failed. Response:', result);
      Swal.fire({
        title: 'Login Failed',
        text: result.message || 'Login details are invalid!',
        icon: 'warning',
      });
      logout();
    }
  };

  return (
    <>       
    <form onSubmit={onSubmit} className="p-4">
      <div className="row mt-3">
        <label className="col-md-3">User Id</label>
        <div className="col-md-6">
          <input
            type="text"
            name="userName"
            className="form-control"
            placeholder='User Id '
            value={form.userName}
            onChange={(e) => setForm({ ...form, userName: e.target.value })}
          />
          {submitted && errors.userName && <small className="text-danger">{errors.userName}</small>}
        </div>
      </div>

      <div className="row mt-2">
        <label className="col-md-3">Password</label>
        <div className="col-md-6">
          <input
            type="password"
            name="password"
            placeholder='password key'
            className="form-control"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {submitted && errors.password && <small className="text-danger">{errors.password}</small>}
        </div>
      </div>

      <div className="row mt-2">
        <label className="col-md-3">Login Role</label>
        <div className="col-md-6">
          <select
            name="UserRoles"
            className="form-select"
            value={form.UserRoles}
            onChange={(e) => setForm({ ...form, UserRoles: e.target.value })}
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
          {submitted && errors.UserRoles && <small className="text-danger">{errors.UserRoles}</small>}
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-3">
          <button type="submit" className="btn btn-danger">Login</button>
        </div>
      </div>
    </form>
    </>
  );
}


// 'use client';

// import { useState } from 'react';
// import { redirect, useRouter } from 'next/navigation';
// import Swal from 'sweetalert2';
// import { adminLogin } from './loginLogic';
// import { setAuthToken, saveUser, logout } from '../actions/userActions';

// export default function LoginForm() {
//   const [form, setForm] = useState({ userName: '', password: '', UserRoles: '' });
//   const [submitted, setSubmitted] = useState(false);
//   const [errors, setErrors] = useState({ userName: '', password: '', UserRoles: '' });
//   const router = useRouter();

//   const roles = [
//     { label: 'Editor', value: '0' },
//     { label: 'Author', value: '1' },
//     { label: 'Reviewer', value: '2' },
//     { label: 'Publisher', value: '3' },
//   ];

//   const validate = () => {
//     const newErrors: any = {};
//     if (!form.userName) newErrors.userName = 'User Id is required.';
//     if (!form.password) newErrors.password = 'Password is required.';
//     else if (form.password.length < 6) newErrors.password = 'Min 6 characters.';
//     if (!form.UserRoles) newErrors.UserRoles = 'Role is required.';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true);
//     if (!validate()) return;

//     console.log('🚀 Submitting login with data:', form);

//     const result = await adminLogin({
//       userName: form.userName,
//       password: form.password,
//     });

    
//     if (result.success) {
//       setAuthToken(result.token);
//       saveUser(result.token);
//       console.log('✅ Login success. Role:', form.UserRoles);

//       // Role-based navigation
//       switch (form.UserRoles) {
//         case '0':
//           // Swal.fire('Editor Access', 'Editor dashboard is under construction.', 'info');
//           redirect('/EditorDashboard');
//           break;
//         case '1':
//           Swal.fire('Author Access', 'Author dashboard is under construction.', 'info');
//           break;
//         case '2':
//           Swal.fire('Reviewer Access', 'Reviewers dashboard is under construction.', 'info');
//           break;
//         case '3':
//           Swal.fire('Publisher Access', 'Publisher dashboard is under construction.', 'info');
//           break;
//         default:
//           Swal.fire('Unknown Role', 'Unable to determine role.', 'error');
//       }

//     } else {
//       console.warn('🛑 Login failed. Response:', result);
//       Swal.fire({
//         title: 'Login Failed',
//         text: result.message || 'Login details are invalid!',
//         icon: 'warning',
//       });
//       logout();
//     }
//   };

//   return (
//     <form onSubmit={onSubmit} className="p-4">
//       {/* User ID */}
//       <div className="row mt-3">
//         <label className="col-md-3">User Id</label>
//         <div className="col-md-6">
//           <input
//             type="text"
//             name="userName"
//             className="form-control"
//             value={form.userName}
//             onChange={(e) => setForm({ ...form, userName: e.target.value })}
//           />
//           {submitted && errors.userName && <small className="text-danger">{errors.userName}</small>}
//         </div>
//       </div>

//       {/* Password */}
//       <div className="row mt-2">
//         <label className="col-md-3">Password</label>
//         <div className="col-md-6">
//           <input
//             type="password"
//             name="password"
//             className="form-control"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//           />
//           {submitted && errors.password && <small className="text-danger">{errors.password}</small>}
//         </div>
//       </div>

//       {/* Role */}
//       <div className="row mt-2">
//         <label className="col-md-3">Login Role</label>
//         <div className="col-md-6">
//           <select
//             name="UserRoles"
//             className="form-select"
//             value={form.UserRoles}
//             onChange={(e) => setForm({ ...form, UserRoles: e.target.value })}
//           >
//             <option value="">Select Role</option>
//             {roles.map((role) => (
//               <option key={role.value} value={role.value}>
//                 {role.label}
//               </option>
//             ))}
//           </select>
//           {submitted && errors.UserRoles && <small className="text-danger">{errors.UserRoles}</small>}
//         </div>
//       </div>

//       {/* Submit */}
//       <div className="row mt-2">
//         <div className="col-md-3">
//           <button type="submit" className="btn btn-danger">Login</button>
//         </div>
//       </div>
//     </form>
//   );
// }


// 'use client';

// import { useState } from 'react';
// import { handleLogin ,adminLogin} from './loginLogic';

// import { useRouter } from 'next/navigation';
// import { getAuthToken,setAuthToken,logout, saveUser } from '../actions/userActions';
// import Swal from 'sweetalert2';

// export default function LoginForm() {
//   const [form, setForm] = useState({ Email: '', password: '', UserRoles: '' });
//   const [submitted, setSubmitted] = useState(false);
//   const [errors, setErrors] = useState({ Email: '', password: '', UserRoles: '' });
//   const [EmployeeDetails, setEmployee]= useState();
//   const router = useRouter();

//   const roles = [
//     { label: 'Editor', value: '0' },
//     { label: 'Author', value: '1' },
//     { label: 'Reviewer', value: '2' },
//     { label: 'Publisher', value: '3' },
//   ];

//   const validate = () => {
//     const newErrors: any = {};
//     if (!form.Email) newErrors.Email = 'User Id is required.';
//     if (!form.password) newErrors.password = 'Password is required.';
//     else if (form.password.length < 6) newErrors.password = 'Min 6 characters.';
//     if (!form.UserRoles) newErrors.UserRoles = 'Role is required.';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true);
//     if (!validate()) return;

//     // const result = await handleLogin(form);
//     const result = await adminLogin({userName:form.Email,password:form.password});
//     if (result.success) {
//       setAuthToken(result.token)
//       saveUser(result.token);  
      
//     } else {
//       Swal.fire({
//         title: 'Login Failed',
//         text: 'Login details are Invalid!',
//         icon: 'warning',
//       })
//       logout();
//     }

//   };

//   return (
//     <form onSubmit={onSubmit} className="p-4">
//       {/* User ID */}
//       <div className="row mt-3">
//         <label className="col-md-3">User Id</label>
//         <div className="col-md-6">
//           <input type="text" name="Email" className="form-control" value={form.Email}
//             onChange={(e) => setForm({ ...form, Email: e.target.value })} />
//           {submitted && errors.Email && <small className="text-danger">{errors.Email}</small>}
//         </div>
//       </div>

//       {/* Password */}
//       <div className="row mt-2">
//         <label className="col-md-3">Password</label>
//         <div className="col-md-6">
//           <input type="password" name="password" className="form-control" value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })} />
//           {submitted && errors.password && <small className="text-danger">{errors.password}</small>}
//         </div>
//       </div>

//       {/* Role */}
//       <div className="row mt-2">
//         <label className="col-md-3">Login Role</label>
//         <div className="col-md-6">
//           <select name="UserRoles" className="form-select" value={form.UserRoles}
//             onChange={(e) => setForm({ ...form, UserRoles: e.target.value })}>
//             <option value="">Select Role</option>
//             {roles.map((role) => (
//               <option key={role.value} value={role.value}>{role.label}</option>
//             ))}
//           </select>
//           {submitted && errors.UserRoles && <small className="text-danger">{errors.UserRoles}</small>}
//         </div>
//       </div>

//       {/* Submit */}
//       <div className="row mt-2">
//         <div className="col-md-3">
//           <button type="submit" className="btn btn-danger">Login</button>
//         </div>
//       </div>
//     </form>
//   );
// }
