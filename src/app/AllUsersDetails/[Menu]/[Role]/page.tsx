'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CommonHeader from '@/app/components/HeaderMenu/CommonHeader';
import LoadingScreen from '@/app/components/LoadingScreen/LoadingScreen';
import { getAllJournalUserDetails } from '@/app/apiCalls/apiCall';

interface User {
  candidateName: string;
  departmentName: string;
  designation: string;
  mobileNumber: string;
  emailId: string;
  userRole: number;
  journalId: number;
}

const userRoleMap: { [key: number]: string } = {
  0: 'Editors',
  1: 'Authors',
  2: 'Reviewers',
  3: 'Publishers',
  4: 'Managing Editors',
  99: 'Users',
};

const getUserRoleText = (userRoles: number | number[] | null | undefined): string => {
  if (userRoles === null || userRoles === undefined) return 'N/A';
  const roles = Array.isArray(userRoles) ? userRoles : [userRoles];
  return roles.map(role => userRoleMap[role] || `Unknown (${role})`).join(', ');
};

const AllUserDetails = () => {
  const params = useParams();
  const storedRole = localStorage.getItem('userRole');
  const roleParam = params?.Role as string;
  const menuParam = params?.Menu as string;

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    
    if (roleParam) {
      const fetchData = async () => {
        // setLoading(true);
        try {
          const response = await getAllJournalUserDetails(roleParam);
          setUsers(response);
        } catch (error) {
          console.error('Error fetching users:', error);
        } finally {
          setLoading(false);
        }
      };

      setTimeout(() => {
        fetchData();
        setLoading(false);
      }, 1500);
      
    }
  }, [roleParam]);

  const paginatedUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <>
      {menuParam === 'E' && <CommonHeader />}
      <LoadingScreen isLoading={loading} />
      {!loading && (
        <div className="container-fluid mt-4">
          <div className="text-center mb-4">
            <h1>
              All <span className="text-danger">{getUserRoleText(Number(roleParam))}</span> Details
            </h1>
          </div>

          {users.length > 0 ? (
            <>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>Sr.No</th>
                      <th>Candidate Name</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th>Mobile Number</th>
                      <th>Email Id</th>
                      <th>User Role</th>
                      <th>Journal Id</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.map((user, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td>{user.candidateName}</td>
                        <td>{user.departmentName}</td>
                        <td>{user.designation}</td>
                        <td>{user.mobileNumber}</td>
                        <td>{user.emailId}</td>
                        <td>{getUserRoleText(user.userRole)}</td>
                        <td>{user.journalId > 0 ? user.journalId : 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-4">
                <button
                  className="btn btn-danger btn-sm me-3"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                  className="btn btn-danger btn-sm ms-3"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p className="fs-4 text-danger text-center">No Data Available.</p>
          )}
        </div>
      )}
    </>
  );
};

export default AllUserDetails;

