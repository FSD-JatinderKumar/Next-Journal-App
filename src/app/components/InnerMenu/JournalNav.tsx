'use client';
import react ,{ useEffect, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useParams } from 'next/navigation';
import styles from "./JournalNav.module.css";
import { ChevronDown } from "lucide-react";

const JournalNav = () => {

  const params = useParams();
  // console.log('Params:', params);  // Log params to check if id and journalTitle are available
  const { id, Title } = params as { id: string; Title: string };

  const [loginStatus, setLoginStatus] = useState(false);
  const [bookId, setBookId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      const idParam = searchParams.get("id");
      const nameParam = searchParams.get("name");
      setBookId(id);
      setName(Title);
      setLoginStatus(checkUserLogin());
    }
  }, [searchParams]);
  
  const checkUserLogin = () => {
    const cookie = Cookies.get("authData");
    return cookie !== undefined;
  };

  const visitUrl = (id: any, name: any, suffix: any) => {
    if (!id || !name || !suffix) return; 
    const cleanName = name.split('(')[0].trim().replace(/\s+/g, '-').replace(/-$/, '');
    router.push(`/${id}/${cleanName}/${suffix}`);
  };
  
  const logout = () => {
    Cookies.remove("authData");
    Cookies.remove("BookData");
    sessionStorage.clear();
    localStorage.clear();
    setLoginStatus(false);
    router.push("/Home");
    setTimeout(() => {
      location.reload();
    }, 500);
    
  };

  return (
    <div className={styles.customNav}>
        <label htmlFor="drop" className={styles.navToggle}>
          <div
            className={styles.mobileIcon}
            onClick={(e) => e.currentTarget.classList.toggle(styles.change)}
          >
            <div className={styles.bar1}></div>
            <div className={styles.bar2}></div>
            <div className={styles.bar3}></div>
          </div>
        </label>
        <ul className={styles.navMenu}>
          <li>
            <a onClick={() => visitUrl(bookId, name, "About")}>About</a>
          </li>
          <li>
            <a onClick={() => visitUrl(bookId, name, "EditorialBoard")}>
              Editorial Board
            </a>
          </li>
          <li className={styles.dropdown}>
            <label htmlFor="drop-1" className={styles.navToggle}>
              Author Guidelines
            </label>
            <a className={styles.navLink}>
              Author Guidelines <ChevronDown size={16} />
            </a>
            <input type="checkbox" id="drop-1" />
            <ul>
              <li>
                <a
                  onClick={() =>
                    visitUrl(bookId, name, "ManuscriptPrepare")
                  }
                >
                  Manuscript Preparation
                </a>
              </li>
              <li>
                <a
                  onClick={() =>
                    visitUrl(bookId, name, "ManuScriptWorkFlow")
                  }
                >
                  Manuscript Workflow
                </a>
              </li>
            </ul>
          </li>
          <li className={styles.dropdown}>
            <label htmlFor="drop-2" className={styles.navToggle}>
              Policies
            </label>
            <a className={styles.navLink}>
              Policies <ChevronDown size={16} />
            </a>
            <input type="checkbox" id="drop-2" />
            <ul>
              <li>
                <a onClick={() => visitUrl(bookId, name, "Policies/EditorialPolicy")}>
                  Editorial Policy
                </a>
              </li>
              <li>
                <a
                  onClick={() => visitUrl(bookId, name, "Policies/PeerReviewPolicy")}
                >
                  Peer Review Policy
                </a>
              </li>
              <li>
                <a onClick={() => visitUrl(bookId, name, "Policies/OpenAccessPolicy")}>
                  Open Access Policy
                </a>
              </li>
              <li>
                <a onClick={() => visitUrl(bookId, name, "Policies/PlagiarismPolicy")}>
                  Plagiarism Policy
                </a>
              </li>
              <li>
                <a onClick={() => visitUrl(bookId, name, "Policies/ComplaintPolicy")}>
                  Complaint Policy
                </a>
              </li>
              <li>
                <a onClick={() => visitUrl(bookId, name, "Policies/CrossMarkPolicy")}>
                  Cross Mark Policy
                </a>
              </li>
              <li>
                <a
                  onClick={() => visitUrl(bookId, name, "Policies/ConflictInterestPolicy")}
                >
                  Conflict Of Interest Policy
                </a>
              </li>
              <li>
                <a onClick={() => visitUrl(bookId, name, "Policies/CopyrightPolicy")}>
                  Copyright And Licencing Policy
                </a>
              </li>
              <li>
                <a
                  onClick={() =>
                    visitUrl(bookId, name, "Policies/CorrectionsRetractionPolicy")
                  }
                >
                  Corrections Retraction Withdrawal Authorship Policy
                </a>
              </li>
              <li>
                <a
                  onClick={() =>
                    visitUrl(bookId, name, "Policies/DigitalandSelfPolicy")
                  }
                >
                  Digital And Self Archiving Policy
                </a>
              </li>
              <li>
                <a
                  onClick={() =>
                    visitUrl(bookId, name, "Policies/PublicationChargePolicy")
                  }
                >
                  Publication Charge/Waiver Policy
                </a>
              </li>
            </ul>
          </li>

          {loginStatus ? (
            <>
              <li className={styles.dropdown}>
                <label htmlFor="drop-3" className={styles.navToggle}>
                  Manuscript
                </label>
                <a className={styles.navLink}>
                  Manuscript <ChevronDown size={16} />
                </a>
                <input type="checkbox" id="drop-3" />
                <ul>
                  <li>
                    <a onClick={() => visitUrl(bookId, name, "SubmitManuScript")}>
                      Submit Manuscript
                    </a>
                  </li>
                  <li>
                    <a onClick={() => visitUrl(bookId, name, "MyManuScript")}>
                      My Requests
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </>
          ) : (
            <li>
              <a onClick={() => visitUrl(bookId, name, "ExternalLogin")}>
                Submit Manuscript
              </a>
            </li>
          )}
        </ul>
    </div>
  );
};

export default JournalNav;
