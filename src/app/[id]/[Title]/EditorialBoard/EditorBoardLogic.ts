import { useState, useCallback } from 'react';
import { GetAllJournalEditorsDetails } from '@/app/apiCalls/apiCall';

interface Editor {
  journalId: any;
  editorType: string;
  designation: string;
  [key: string]: any; // Allow additional properties
}

export function useJournalEditorBoard() {
  const [name, setName] = useState<string>('');
  const [editorInChief, setEditorInChief] = useState<Editor[]>([]);
  const [associateEditor, setAssociateEditor] = useState<Editor[]>([]);
  const [managingEditor, setManagingEditor] = useState<Editor[]>([]);
  const [editorialBoardMembersNational, setEditorialBoardMembersNational] = useState<Editor[]>([]);
  const [editorialBoardMembersInternational, setEditorialBoardMembersInternational] = useState<Editor[]>([]);
  const [editorialBoardMembersReviews, setEditorialBoardMembersReviews] = useState<Editor[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);

  const importantRoles = ['head', 'dean', 'associate dean', 'associate professor', 'assistant professor'];

  const getPriority = (designation: string) => {
    designation = designation.toLowerCase();
    for (let i = 0; i < importantRoles.length; i++) {
      if (designation.includes(importantRoles[i])) {
        return i + 1;
      }
    }
    return importantRoles.length + 1;
  };

  const prioritizeByDesignation = (editorsList: Editor[]) => {
    return editorsList.sort((a, b) => getPriority(a.designation) - getPriority(b.designation));
  };

  const initializeJournalEditors = useCallback(async (bookId: any, journalName: string) => {
    try {
      const response = await GetAllJournalEditorsDetails();
      if (response?.item1 && response.item1.length > 0) {
        const allEditors = response.item1;
        const filtered = allEditors.filter((item: Editor) => item.journalId === bookId);

        setEditorInChief(filtered.filter((item: { editorType: string; }) => item.editorType.toLowerCase().includes('editor in chief')));
        setAssociateEditor(
          prioritizeByDesignation(
            filtered.filter((item: { editorType: string; }) => item.editorType.toLowerCase().includes('associate editors'))
          )
        );
        setManagingEditor(
          prioritizeByDesignation(
            filtered.filter((item: { editorType: string; }) => item.editorType.toLowerCase().includes('managing editor'))
          )
        );
        setEditorialBoardMembersNational(
          filtered.filter((item: { editorType: string; }) => item.editorType.toLowerCase().includes('editorial board members national'))
        );
        setEditorialBoardMembersInternational(
          filtered.filter((item: { editorType: string; }) => item.editorType.toLowerCase().includes('editorial board members international'))
        );
        setEditorialBoardMembersReviews(
          prioritizeByDesignation(
            filtered.filter((item: { editorType: string; }) => item.editorType.toLowerCase().includes('reviewers'))
          )
        );

        setName(journalName);
      } else {
        setLoadingData(true);
      }
    } catch (error) {
      console.error('Failed to fetch editor details', error);
      setLoadingData(true);
    }
  }, []);

  return {
    name,
    editorInChief,
    associateEditor,
    managingEditor,
    editorialBoardMembersNational,
    editorialBoardMembersInternational,
    editorialBoardMembersReviews,
    loadingData,
    initializeJournalEditors,
  };
}
