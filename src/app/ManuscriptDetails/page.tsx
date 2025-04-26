'use client';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllManuscriptsForJournal, getReviewerDetailsForEditor, getFromSession } from '@/app/apiCalls/apiCall';
import CommonHeader from '../components/HeaderMenu/CommonHeader';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';


const ManuscriptDetails = () => {
  const [editorData, setEditorData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReviewerId, setSelectedReviewerId] = useState('');
  const [journalTitle, setJournalTitle] = useState('Sample Journal');
  const [reviewerList, setReviewerList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const displayedEditorColumns = ['editorInChief','emailId','journalTitle','manuScript' ,'filePath','journalId'];
  const displayedEditorColumnHeaders: any = {
    editorInChief:'Editor',
    emailId:'Email Id',   
    journalTitle:'Journal',
    manuScript:'Manu Script', filePath: 'File',
    journalId: 'Action',
  };

  const totalPages = Math.ceil(editorData.length / 10);
  const paginatedData = editorData.slice((currentPage - 1) * 10, currentPage * 10);

  const previousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  const onTakeAction = (row: any) => {
    // console.log('Taking action for', row);
    setJournalTitle(row.title || 'Sample Journal');
  };
  const onDownload = (row: any) => {
    window.open(row.filePath, '_blank');
  };

  const assignReviewer = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Assigning reviewer:', selectedReviewerId);
    // Call assign reviewer API here if available
  };

  useEffect(() => {
    const userData = getFromSession('userData');
    const journalId = '45'; // Replace with dynamic journalId as needed
    const userId = userData?.EmailId; // Replace with actual logged-in userId

    // console.log(userData?.EmailId); // Access a specific field
    setTimeout(() => {
      getAllManuscriptsForJournal(journalId)
      .then(data => setEditorData(data))
      .catch(err => console.error('Error loading manuscripts', err));

      getReviewerDetailsForEditor(journalId)
      .then(data => setReviewerList(data))
      .catch(err => console.error('Error loading reviewers', err));

      setLoading(false);
    }, 1500); 


   

    // Fetch reviewers data
   
  }, []);

  return (
    <>
      <CommonHeader />
      <LoadingScreen isLoading={loading} />
     {!loading && (
     <>
      <div className="vh-150 d-flex p-2 align-items-center justify-content-center">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card-body m-5">
                <h1 className="text-center text-primary">All Manuscript Details</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex p-2 align-items-center justify-content-center">
        <div className="container-fluid">
          {editorData.length > 0 ? (
            <div className="col-md-12 stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          {displayedEditorColumns.map(col => (
                            <th key={col}>{displayedEditorColumnHeaders[col]}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {displayedEditorColumns.map(col => (
                              <td key={col}>
                                {col === 'filePath' ? (
                                  <button className="btn btn-dark"  onClick={() => onDownload(row)}> 
                                    <i className="bi bi-file-earmark-text"></i>
                                  </button>
                                ) : col === 'journalId' ? (
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => onTakeAction(row)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#assignReviewerModal"
                                  >
                                    <i className="bi bi-exclamation-circle"></i>
                                  </button>
                                ) : (
                                  row[col]
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="pagination-controls d-flex justify-content-between">
                      <button onClick={previousPage} disabled={currentPage === 1}>
                        Previous
                      </button>
                      <span>
                        Page {currentPage} of {totalPages}
                      </span>
                      <button onClick={nextPage} disabled={currentPage === totalPages}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-danger text-center">
              <h2>No Manuscript Found</h2>
            </div>
          )}
        </div>
      </div>

     
      <div
        className="modal fade"
        id="assignReviewerModal"
        tabIndex={-1}
        aria-labelledby="assignReviewerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={assignReviewer}>
              <div className="modal-header">
                <h5 className="modal-title">Assign Reviewer</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Journal</label>
                  <input type="text" className="form-control" value={journalTitle} readOnly />
                </div>

                <div className="mb-3">
                  <label htmlFor="reviewerDropdown" className="form-label">
                    Select Reviewer:
                  </label>
                  <select
                    id="reviewerDropdown"
                    className="form-select"
                    value={selectedReviewerId}
                    onChange={e => setSelectedReviewerId(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select Reviewer
                    </option>
                    {reviewerList.map(reviewer => (
                      <option key={reviewer.emailId} value={reviewer.emailId}>
                        {reviewer.candidateName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-success" disabled={!selectedReviewerId}>
                  Assign Reviewer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </>)}
    </>
  );
};

export default ManuscriptDetails;
