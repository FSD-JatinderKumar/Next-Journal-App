'use client';

import { useState } from 'react';

interface Item {
  introduction: string;
  scopeofJournal: string;
  thrustArea: string;
  articleType: string;
}

interface Props {
  itemsArray: Item[];
}

export default function EditorDetailsTabs({ itemsArray }: Props) {
  const [activeTab, setActiveTab] = useState('introduction');
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <section className="container-fluid journal-details-tabs mt-4">
      <div className="row mb-5">
        <ul className="nav flex-column col-lg-3 d-none d-lg-flex border-0">
          {['Introduction', 'Scope of Journal', 'Thrust Areas', 'Article Types'].map((label, idx) => {
            const key = label.toLowerCase().replace(/ /g, '-');
            return (
              <li key={idx} className="nav-item">
                <a
                  className={`nav-link ${activeTab === key ? 'active' : ''}`}
                  onClick={() => handleTabClick(key)}
                  role="tab"
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="tab-content col-lg-9 col-md-12">
          {itemsArray.map((item, index) => (
            <div key={index}>
              {/* Introduction */}
              {activeTab === 'introduction' && (
                <div className="tab-pane fade show active mb-4" role="tabpanel">
                  <div className="accordion-body tab-scroll">
                    <div dangerouslySetInnerHTML={{ __html: item.introduction }} />
                  </div>
                </div>
              )}

              {/* Scope of Journal */}
              {activeTab === 'scope-of-journal' && (
                <div className="tab-pane fade show active mb-4" role="tabpanel">
                  <div className="accordion-body tab-scroll">
                    <div dangerouslySetInnerHTML={{ __html: item.scopeofJournal }} />
                  </div>
                </div>
              )}

              {/* Thrust Areas */}
              {activeTab === 'thrust-areas' && (
                <div className="tab-pane fade show active mb-5" id="thrust-scroll" role="tabpanel">
                {/* aria-labelledby="Thrust-Areas-tab" tabIndex={0}>  */}
                <div className="accordion-body tab-scroll">             
                    <p dangerouslySetInnerHTML={{ __html: item.thrustArea }} />
                </div>
                </div>
              )}

              {/* Article Types */}
              {activeTab === 'article-types' && (
                <div className="tab-pane fade show active mb-4" role="tabpanel">
                  <div className="accordion-body tab-scroll">
                    <div dangerouslySetInnerHTML={{ __html: item.articleType }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
  .tab-scroll {
    max-height: 400px;
    overflow-y: auto;
    padding-right: 10px;
    text-align: justify;
    scrollbar-width: thin;
    scrollbar-color: #E77000 transparent;
  }

  .tab-scroll::-webkit-scrollbar {
    width: 6px;
  }

  .tab-scroll::-webkit-scrollbar-thumb {
    background-color: #E77000;
    border-radius: 4px;
  }

  .tab-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
 
        .tab-scroll {
          max-height: 340px;
          overflow-y: auto;
          padding-right: 10px;
          text-align: justify;
        }

        .nav-link {
          cursor: pointer;
          padding: 0.75rem 1rem;
          border-radius: 0;
          border-left: 4px solid transparent;
        }

        .nav-link.active {
          font-weight: 600;
          // background-color: #f5f5f5;
          // border-left: 4px solid #E77000;
          // color: #E77000;
        }
      `}</style>
    </section>
  );
}
