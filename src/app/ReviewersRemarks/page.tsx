'use client';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetAllReviewersRemarkss,  getFromSession } from '../../app/apiCalls/apiCall';
import CommonHeader from '../components/HeaderMenu/CommonHeader';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';


// {"manuscriptId":null,"journalId":45,"emailId":null,"reviewerTerm":"Major Revisions","overallRating":"11",
// "transferResponse":"No","commentsforEditor":"Test Remarks rejects","newSubjectRating":"Agree","newInformationRating":null,
// "newConclusionRating":"Agree","manuscriptRating":"Agree","manuscriptOrganisedRating":"Agree","manuscriptOtherInfoRating":"Agree","commentsForAuthor":"Test case s Rejects","reviewerId":"testCaseUser.id@gmail.com","approvalRemarks":null,"createdOn":"02/25/2025 15:31:00","isApproved":null,"publicationDate":null,"journalTitle":"International-Journal-of-Recent-Advances-in-Health","reviewerName":null,"isActionable":false,"manuscriptApprovalStatus":0,"fileUrl":"45_107764748_22_2025_merged-files.zip","manuScriptFile":"https://files.lpu.in/umsweb/Journal/45_107764748_22_2025_merged-files.zip"}
const displayedReviewersColumnHeaders: string[] = [  
  'reviewerTerm',   'overallRating',
  'transferResponse',   'commentsforEditor',
  'newSubjectRating',   'newInformationRating',
  'newConclusionRating',    'manuscriptRating',
  'manuscriptOrganisedRating',  'commentsForAuthor',
  'existingInformationRating',   
  'approvalStatus',  'journalId',
  'filePath'
];

const columnHeaderLabels: { [key: string]: string } = {

  reviewerTerm: 'Reviewer Term',    overallRating: 'Overall Rating', 
  transferResponse:'Transfer Response',  commentsforEditor:'Comments for Editor',  
  newSubjectRating:'newSubjectRating',    newInformationRating: 'New Info Rating',
  newConclusionRating:'New Conclusion Rating',   manuscriptRating: 'Manuscript Rating',
   manuscriptOrganisedRating:'Manuscript Organised Rating',commentsForAuthor:'Comments ForAuthor',
   existingInformationRating: 'Existing Info Rating', 
  approvalStatus: 'Approval Status',  journalId: 'Actions',
  filePath: 'File',
};

  const ReviewersRemarks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [ReviewerData, setReviewerData] = useState<any[]>([]);
  const userData = getFromSession('userData');
  const [loading, setLoading] = useState(true);

  const changeApproveStatus = (row: any) => {
    console.log('Approve clicked:', row);
    // TODO: Add API call or state update
  };

  const disapproveStatus = (row: any) => {
    console.log('Disapprove clicked:', row);
    // TODO: Add API call or state update
  };
  const onDownload = (row: any) => {        
    window.open(row.manuScriptFile, '_blank');
  };
  const totalPages = Math.ceil(ReviewerData.length / itemsPerPage);
  const paginatedData = ReviewerData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    const journalId = '45';  
    const userId = userData?.EmailId;  

    setTimeout(() => {
      GetAllReviewersRemarkss(journalId)
      .then(data => setReviewerData(data))
      .catch(err => console.error('Error loading Reviewer Remarks', err));
      setLoading(false);
    }, 1500);
  
    

  }, []);
  // if (loading) return <LoadingScreen />;
  return (
    <>
     <CommonHeader/>
     <LoadingScreen isLoading={loading} />
     {!loading && (
     <><div className="vh-150 d-flex p-2 align-items-center justify-content-center">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card-body m-5">
                <h1 className="text-center text-primary">All Reviewer Remarks Details</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div className="container-fluid p-3 mt-1">
      <div className="table-responsive">
        <table className="table table-bordered table-hover mt-3">
          <thead className="table-dark">
            <tr>
              {displayedReviewersColumnHeaders.map((key) => (
                <th key={key}>{columnHeaderLabels[key]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index}>
                {displayedReviewersColumnHeaders.map((col) => (
                  <td key={col}>
                    {col === 'filePath' ? (
                      // <a href={row[col]} download className="btn btn-link p-0">
                      //   Download
                      // </a>
                       <button className="btn btn-dark"  onClick={() => onDownload(row)}> 
                       <i className="bi bi-file-earmark-text"></i>
                     </button>
                    ) : col === 'journalId' ? (
                      row.isActionable != true  && row.isActionable != false ? (
                        <>
                          <button
                            className={`btn btn-sm me-2 ${
                              row.isActionable ? 'btn-success' : 'btn-secondary'
                            }`}
                            onClick={() => changeApproveStatus(row)}
                          >
                            <i className="bi bi-check-circle"></i>
                          </button>
                          <button
                            className={`btn btn-sm ${
                              row.isActionable ? 'btn-danger' : 'btn-secondary'
                            }`}
                            onClick={() => disapproveStatus(row)}
                          >
                            <i className="bi bi-x-circle"></i>
                          </button>
                        </>
                      ) : (
                        <span className='text-danger'>Action Already Taken</span>
                      )
                    ) : col === 'isApproved' ? (
                      <span className={row[col] === '1' ? 'text-success' : 'text-danger'}>
                        {row[col] === '1' ? 'Approved' : 'Not Approved'}
                      </span>
                    ) : col === 'approvalStatus' ? (
                      <span
                        className={
                          row.isActionable == null
                            ? 'text-warning'
                            : row.isActionable === 1
                            ? 'text-success'
                            : 'text-danger'
                        }
                      >
                        {row.isActionable == null
                          ? 'Pending'
                          : row.isActionable === 1
                          ? 'Approved'
                          : 'Rejected'}
                      </span>
                    ) : (
                      row[col] ?? 'N/A'
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-outline-primary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-primary"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </nav>
    </div></>)}
    </>
  );
};

export default ReviewersRemarks;
