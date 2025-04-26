'use client';
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { GetAllJournalEditorsDetails } from '@/app/apiCalls/apiCall';
import styles from './EditorialData.module.css';
import LoadingScreen from '@/app/components/LoadingScreen/LoadingScreen';

export default function JournalEditorBoard() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
   
  const [editorData, setEditorData] = useState<any>(null);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const { id, Title } = params as { id: string; Title: string };
   
  useEffect(() => {
    setTimeout(() => {
      GetAllJournalEditorsDetails()
        .then(data => setEditorData(data.filter((item: { journalId: any }) => item.journalId === id)))
        .catch(err => console.error('Error loading Journal Editor Details', err));
      setLoading(false);
    }, 1000);
  }, []);

  if (!editorData) {
    return  <LoadingScreen isLoading={loading} />;
  }

  // Categorize the editor data based on the editorType
  const editorInChief =  editorData.filter((editor: any) => editor.editorType === 'Editor in Chief');
  const associateEditor = editorData.filter((editor: any) => editor.editorType === 'Associate Editors');
  const managingEditor = editorData.filter((editor: any) => editor.editorType === 'Managing Editors');
  const editorialBoardMembersNational = editorData.filter((editor: any) => editor.editorType === 'Editorial board members National');
  const editorialBoardMembersInternational = editorData.filter((editor: any) => editor.editorType === 'Editorial board members International');
  const editorialBoardMembersReviews = editorData.filter((editor: any) => editor.editorType === 'Reviewers');

  const name = editorData[0]?.editorName || 'Journal Editor Board';

  return (
      <div className="container section" style={{marginBottom:'15rem'}}>
      
       {!loading && (
          <div className="container-fluid mb-4">
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="main-heading">
                  <h1>{Title.replace(/-/g, ' ')}</h1>
                </div>
                <div className="sub-heading">
                  <h3>Editorial Board</h3>
                </div>
              </div>
            </div>

          <div className="accordion accordion-flush editorial-accordian" id="accordionFlushExample">
            {/* Editor in Chief Section */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button className="accordion-button accordionColor" type="button" data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  Editor in Chief
                </button>
              </h2>
              <div id="flush-collapseOne" className="accordion-collapse collapse show" aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample">
                <div className="accordion-body accordionColor">
                  {editorInChief.length > 0 ? (
                    <div className="row">
                      {editorInChief.map((CEditor: { editorName: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; designation: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; editorAddress: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; email: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: Key | null | undefined) => (
                        <div className="col-md-6" key={index}>
                          <div className="sect-president">
                            <h3>{CEditor.editorName}</h3>
                            <h4>{CEditor.designation}</h4>
                            <p>{CEditor.editorAddress} <br />
                            <strong>Email: &nbsp;</strong> <a>{CEditor.email}</a></p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="fs-4 text-danger text-center">No Record Found!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Managing Editor Section */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingTwo">
                <button className="accordion-button accordionColor collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  Managing Editor
                </button>
              </h2>
              <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo"
                data-bs-parent="#accordionFlushExample">
                <div className="accordion-body accordionColor">
                  {managingEditor.length > 0 ? (
                    <div className="row">
                      {managingEditor.map((MEditor: { editorName: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; designation: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; editorAddress: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; email: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: Key | null | undefined) => (
                        <div className="col-md-6" key={index}>
                          <div className="sect-president">
                            <h3>{MEditor.editorName}</h3>
                            <h4>{MEditor.designation}</h4>
                            <p>{MEditor.editorAddress} <br />
                            <strong>Email: &nbsp;</strong> <a>{MEditor.email}</a></p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="fs-2 text-danger text-center">No Record Found!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Associate Editors Section */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingThree">
                <button className="accordion-button accordionColor collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                  Associate Editors
                </button>
              </h2>
              <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree"
                data-bs-parent="#accordionFlushExample">
                <div className="accordion-body accordionColor">
                  {associateEditor.length > 0 ? (
                    <div className="row">
                      {associateEditor.map((AEditor: { editorName: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; designation: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; editorAddress: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; email: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: Key | null | undefined) => (
                        <div className="col-md-6" key={index}>
                          <div className="sect-president">
                            <h3>{AEditor.editorName}</h3>
                            <h4>{AEditor.designation}</h4>
                            <p>{AEditor.editorAddress} <br />
                            <strong>Email: &nbsp;</strong> <a>{AEditor.email}</a></p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="fs-4 text-danger text-center">No Record Found!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Editorial Board Members National Section */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingFour">
                <button className="accordion-button accordionColor collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                  Editorial board members <span className="small-heading">National</span>
                </button>
              </h2>
              <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour"
                data-bs-parent="#accordionFlushExample">
                <div className="accordion-body accordionColor">
                  {editorialBoardMembersNational.length > 0 ? (
                    <div className="row">
                      {editorialBoardMembersNational.map((national: { editorName: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; designation: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; editorAddress: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; email: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: Key | null | undefined) => (
                        <div className="col-md-6" key={index}>
                          <div className="sect-president">
                            <h3>{national.editorName}</h3>
                            <h4>{national.designation}</h4>
                            <p>{national.editorAddress} <br />
                            <strong>Email: &nbsp;</strong> <a>{national.email}</a></p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="fs-4 text-danger text-center">No Record Found!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Editorial Board Members International Section */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingFive">
                <button className="accordion-button accordionColor collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                  Editorial board members <span className="small-heading">International</span>
                </button>
              </h2>
              <div id="flush-collapseFive" className="accordion-collapse collapse" aria-labelledby="flush-headingFive"
                data-bs-parent="#accordionFlushExample">
                <div className="accordion-body accordionColor">
                  {editorialBoardMembersInternational.length > 0 ? (
                    <div className="row">
                      {editorialBoardMembersInternational.map((international: { editorName: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; designation: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; editorAddress: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; email: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: Key | null | undefined) => (
                        <div className="col-md-6" key={index}>
                          <div className="sect-president">
                            <h3>{international.editorName}</h3>
                            <h4>{international.designation}</h4>
                            <p>{international.editorAddress} <br />
                            <strong>Email: &nbsp;</strong> <a>{international.email}</a></p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="fs-4 text-danger text-center">No Record Found!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) }
    </div>
  );
}
