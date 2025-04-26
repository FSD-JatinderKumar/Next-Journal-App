'use client';

import { useRouter } from 'next/navigation';
import { useCommonHeader } from './CommonHeaderLogic';

export default function CommonHeader() {
  const router = useRouter();
  const { userData, userRole, loginStatus, logout, visitPage } = useCommonHeader();

  if (!loginStatus || !userData) return null;

  const getRoleName = (role: any) => {
    switch (role) {
      case '0': return 'Editor';
      case '1': return 'Author';
      case '2': return 'Reviewer';
      case '3': return 'Publisher';
      default: return 'Unknown';
    }
  };

  // ✅ Custom function to handle navigation to AllUsersDetails page
  const visitUserPage = (menu: string, role: number) => {
    router.push(`/AllUsersDetails/${menu}/${role}`);
  };

  return (
    <>
      <header>
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {userRole === '0' && (
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                      Manuscript
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" onClick={() => visitPage('ManuscriptDetails')}>
                          All Manuscripts
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" onClick={() => visitPage('ReviewersRemarks')}>
                          All Reviewer's Remarks
                        </a>
                      </li>
                    </ul>
                  </li>
                )}

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                    User Details
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" onClick={() => visitUserPage('E', 0)}>
                        Editors
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={() => visitUserPage('E', 1)}>
                        Authors
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={() => visitUserPage('E', 2)}>
                        Reviewers
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={() => visitUserPage('E', 4)}>
                        Managing Editors
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={() => visitUserPage('E', 99)}>
                        View All
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                    Account Setting
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" onClick={() => visitPage('UpdateKey')}>
                        Change Password
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={logout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <div className="container-fluid mt-4">
        <div className="card">
          <div className="card-body">
            <div className="row d-flex justify-content-center">
              <div className="col-2">
                <label className="form-label fw-bolder">User Name</label>
              </div>
              <div className="col-2">
                <label className="form-label fw-bolder">{userData?.CandidateName || '-'}</label>
              </div>
              <div className="col-4 text-center">
                <label className="text-success fs-3 fw-bolder">
                  LPU e-Journal <span className="text-danger">{getRoleName(userRole)} </span>Dashboard
                </label>
              </div>
              <div className="col-2 text-end">
                <label className="form-label fw-bolder">Department</label>
              </div>
              <div className="col-2">
                <label className="form-label text-dark fw-bolder text-end">
                  {userData?.DepartmentName || '-'}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



// 'use client';

// import { useCommonHeader } from './CommonHeaderLogic';

// export default function CommonHeader() {
//   const { userData, userRole, loginStatus, logout, visitPage, visitUserPage } = useCommonHeader();

//   if (!loginStatus || !userData) return null;

//   const getRoleName = (role: any) => {
//     switch (role) {
//       case '0': return 'Editor';
//       case '1': return 'Author';
//       case '2': return 'Reviewer';
//       case '3': return 'Publisher';
//       default: return 'Unknown';
//     }
//   };

//   return (
//     <>
//       <header>
//         <div className="container-fluid">
//           <nav className="navbar navbar-expand-lg">
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarSupportedContent"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>

//             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 {userRole === '0' && (
//                   <li className="nav-item dropdown">
//                     <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
//                       Manuscript
//                     </a>
//                     <ul className="dropdown-menu">
//                       <li>
//                         <a className="dropdown-item" onClick={() => visitPage('ManuscriptDetails')}>
//                           All Manuscripts
//                         </a>
//                       </li>
//                       <li>
//                         <a className="dropdown-item" onClick={() => visitPage('ReviewersRemarks')}>
//                           All Reviewer's Remarks
//                         </a>
//                       </li>
//                     </ul>
//                   </li>
//                 )}

//                 <li className="nav-item dropdown">
//                   <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
//                     User Details
//                   </a>
//                   <ul className="dropdown-menu">
//                     <li>
//                       <a className="dropdown-item" onClick={() => visitUserPage('E', 0, 'AllUsersDetails')}>
//                         Editors
//                       </a>
//                     </li>
//                     <li>
//                       <a className="dropdown-item" onClick={() => visitUserPage('E', 1, 'AllUsersDetails')}>
//                         Authors
//                       </a>
//                     </li>
//                     <li>
//                       <a className="dropdown-item" onClick={() => visitUserPage('E', 2, 'AllUsersDetails')}>
//                         Reviewers
//                       </a>
//                     </li>
//                     <li>
//                       <a className="dropdown-item" onClick={() => visitUserPage('E', 4, 'AllUsersDetails')}>
//                         Managing Editors
//                       </a>
//                     </li>
//                     <li>
//                       <a className="dropdown-item" onClick={() => visitUserPage('E', 99, 'AllUsersDetails')}>
//                         View All
//                       </a>
//                     </li>
//                   </ul>
//                 </li>

//                 <li className="nav-item dropdown">
//                   <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
//                     Account Setting
//                   </a>
//                   <ul className="dropdown-menu">
//                     <li>
//                       <a className="dropdown-item" onClick={() => visitPage('UpdateKey')}>
//                         Change Password
//                       </a>
//                     </li>
//                     <li>
//                       <a className="dropdown-item" onClick={logout}>
//                         Logout
//                       </a>
//                     </li>
//                   </ul>
//                 </li>
//               </ul>
//             </div>
//           </nav>
//         </div>
//       </header>

//       <div className="container-fluid mt-4">
//         <div className="card">
//           <div className="card-body">
//             <div className="row d-flex justify-content-center">
//               <div className="col-2">
//                 <label className="form-label fw-bolder">User Name</label>
//               </div>
//               <div className="col-2">
//                 <label className="form-label fw-bolder">{userData?.CandidateName || '-'}</label>
//               </div>
//               <div className="col-4 text-center">
//                 <label className="text-success fs-3 fw-bolder">LPU e-Journal <span className="text-danger">{getRoleName(userRole)} </span>Dashboard</label>
//               </div>
//               <div className="col-2 text-end">
//                 <label className="form-label fw-bolder">Department</label>
//                 {/* <label className="form-label fw-bolder">Role</label> */}
//               </div>
//               <div className="col-2">
//                 {/* <label className="form-label text-dark fw-bolder text-end">{getRoleName(userRole)}</label> */}
//                 <label className="form-label text-dark fw-bolder text-end">{userData?.DepartmentName || '-'}</label>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
