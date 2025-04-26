'use client';
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import styles from './JournalCarousel.module.css';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GetAllBooksDetails, getFromSession } from "@/app/apiCalls/apiCall";
import { useRouter } from "next/navigation";

const JournalCarousel: React.FC = () => {
  const [imageLoadError, setImageLoadError] = useState<boolean[]>([]);
  const [BookData, setBookData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleImageError = (index: number) => {
    const updatedErrors = [...imageLoadError];
    updatedErrors[index] = true;
    setImageLoadError(updatedErrors);
  };

  const getBackgroundColor = (index: number) => {
    const colors = ['#D298BD', '#F4ACAC', '#95D2E5'];
    return colors[index % colors.length];
  };

  const navigateToUrl = (id: string) => {
    const bookDetails = BookData.length > 0
      ? BookData.filter((x: { id: string }) => x.id === id)
      : [];

    if (bookDetails.length > 0) {
      const journalTitle = bookDetails[0].journalTitle;
      let a = journalTitle.split('(')[0].trim().replace(/\s+/g, '-').replace(/-$/, '');
      router.push(`/${id}/${a}/About`);
    }
  };

  const settings = {
    dots: false, // Disable dots
    arrows: true, // Enable arrows
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: (
      <div className={`${styles.customArrow} ${styles.prevArrow}`}>
        <img src="/images/icon/left-arrow.svg" alt="Previous" />
      </div>
    ),
    nextArrow: (
      <div className={`${styles.customArrow} ${styles.nextArrow}`}>
        <img src="/images/icon/right-arrow.png" alt="Next" />
      </div>
    ),
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const userData = getFromSession('userData');
    setTimeout(() => {
      GetAllBooksDetails()
        .then(data => setBookData(data))
        .catch(err => console.error('Error loading JournalDetails', err));
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={loading} />
      {!loading && (
        <div className={"position-relative " + styles.box}>
          <Slider {...settings}>
            {BookData.map((slide, i) => (
              <div key={slide.id} className={`${styles.book} ${styles.slide}`}>
                <div className={styles.booka}>
                  <div
                    className={`${styles.cover} p-3`}
                    style={{ backgroundColor: getBackgroundColor(i) }}
                  >
                    <div className={styles.JournalTitle}>
                      <h4 className="fs-4">{slide.journalTitle}</h4>
                    </div>
                    <div className={styles.containera}>
                      <div className={styles.about}>
                        <div className={styles.pic}>
                          {!imageLoadError[i] ? (
                            <Image
                              src={slide.imageUrl}
                              alt={slide.journalTitle}
                              width={150}
                              height={200}
                              onError={() => handleImageError(i)}
                              unoptimized
                            />
                          ) : (
                            <p className={styles.errorMessage}>Error loading image</p>
                          )}
                        </div>
                        <div className={styles.text}>
                          <p>
                            {slide.subTitle.split(" ").length > 8
                              ? slide.subTitle.split(" ").slice(0, 8).join(" ") + "..."
                              : slide.subTitle}
                            {slide.subTitle.split(" ").length > 8 && (
                              <a
                                className="ms-3 mt-2 btn badge bg-danger"
                                onClick={() => navigateToUrl(slide.id)}
                              >
                                Read More
                              </a>
                            )}
                          </p>
                          <button className={styles.SliderButton + ' btn '}
                            onClick={() => navigateToUrl(slide.id)}
                          >
                            See The Journal
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default JournalCarousel;


// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import Image from "next/image";
// import styles from './JournalCarousel.module.css';
// import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { GetAllBooksDetails, getFromSession } from "@/app/apiCalls/apiCall";
// import { useRouter } from "next/navigation";

// const JournalCarousel: React.FC = () => {
//   const [imageLoadError, setImageLoadError] = useState<boolean[]>([]);
//   const [BookData, setBookData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   const handleImageError = (index: number) => {
//     const updatedErrors = [...imageLoadError];
//     updatedErrors[index] = true;
//     setImageLoadError(updatedErrors);
//   };

//   const getBackgroundColor = (index: number) => {
//     const colors = ['#D298BD', '#F4ACAC', '#95D2E5'];
//     return colors[index % colors.length];
//   };

//   const navigateToUrl = (id: string) => {
//     const bookDetails = BookData.length > 0
//       ? BookData.filter((x: { id: string }) => x.id === id)
//       : [];

//     if (bookDetails.length > 0) {
//       const journalTitle = bookDetails[0].journalTitle;
//       let a = journalTitle.split('(')[0].trim().replace(/\s+/g, '-').replace(/-$/, '');
//       router.push(`/${id}/${a}/About`);
//     }
//   };

//   // Slider settings with custom arrow images
//   const settings = {
//     dots: false, // Disable dots
//     arrows: true, // Enable arrows
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//        prevArrow: (
//       <div className={`${styles.customArrow} ${styles.prevArrow}`}>
//         <img src="/images/icon/left-arrow.svg" alt="Previous" />
//       </div>
//     ),
//     nextArrow: (
//       <div className={`${styles.customArrow} ${styles.nextArrow}`}>
//         <img src="/images/icon/right-arrow.png" alt="Next" />
//       </div>
//     ),
//     responsive: [
//       {
//         breakpoint: 992,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 576,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   useEffect(() => {
//     const userData = getFromSession('userData');
//     setTimeout(() => {
//       GetAllBooksDetails()
//         .then(data => setBookData(data))
//         .catch(err => console.error('Error loading JournalDetails', err));
//       setLoading(false);
//     }, 1500);
//   }, []);

//   return (
//     <>
//       <LoadingScreen isLoading={loading} />
//       {!loading && (
//         <div className={"position-relative " + styles.box}>
//           <Slider {...settings}>
//             {BookData.map((slide, i) => (
//               <div key={slide.id} className={`${styles.book} ${styles.slide}`}>
//                 <div className={styles.booka}>
//                   <div
//                     className={`${styles.cover} p-3`}
//                     style={{ backgroundColor: getBackgroundColor(i) }}
//                   >
//                     <div className={styles.JournalTitle}>
//                       <h4 className="fs-4">{slide.journalTitle}</h4>
//                     </div>
//                     <div className={styles.containera}>
//                       <div className={styles.about}>
//                         <div className={styles.pic}>
//                           {!imageLoadError[i] ? (
//                             <Image
//                               src={slide.imageUrl}
//                               alt={slide.journalTitle}
//                               width={150}
//                               height={200}
//                               onError={() => handleImageError(i)}
//                               unoptimized // remove this if you configure next.config.js correctly
//                             />
//                           ) : (
//                             <p className={styles.errorMessage}>Error loading image</p>
//                           )}
//                         </div>
//                         <div className={styles.text}>
//                           <p>
//                             {slide.subTitle.split(" ").length > 8
//                               ? slide.subTitle.split(" ").slice(0, 8).join(" ") + "..."
//                               : slide.subTitle}
//                             {slide.subTitle.split(" ").length > 8 && (
//                               <a
//                                 className="ms-3 mt-2 btn badge bg-danger"
//                                 onClick={() => navigateToUrl(slide.id)}
//                               >
//                                 Read More
//                               </a>
//                             )}
//                           </p>
//                           <button className={styles.SliderButton + ' btn '}
//                             onClick={() => navigateToUrl(slide.id)}
//                           >
//                             See The Journal
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       )}
//     </>
//   );
// };

// export default JournalCarousel;

// 'use client';

// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import Image from "next/image";
// import styles from './JournalCarousel.module.css';
// import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { GetAllBooksDetails, getFromSession } from "@/app/apiCalls/apiCall";
// import { useRouter } from "next/navigation";

// const JournalCarousel: React.FC = () => {
//   const [imageLoadError, setImageLoadError] = useState<boolean[]>([]);
//   const [BookData, setBookData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   const handleImageError = (index: number) => {
//     const updatedErrors = [...imageLoadError];
//     updatedErrors[index] = true;
//     setImageLoadError(updatedErrors);
//   };

//   const getBackgroundColor = (index: number) => {
//     const colors = ['#D298BD', '#F4ACAC', '#95D2E5'];
//     return colors[index % colors.length];
//   };

//   const navigateToUrl = (id: string) => {
//     const bookDetails = BookData.length > 0
//       ? BookData.filter((x: { id: string }) => x.id === id)
//       : [];

//     if (bookDetails.length > 0) {
//       const journalTitle = bookDetails[0].journalTitle;
//       let a = journalTitle.split('(')[0].trim().replace(/\s+/g, '-').replace(/-$/, '');
//       router.push(`/${id}/${a}/About`);
//     }
//   };

//   const settings = {
//     dots: false, 
//     arrows: true, 
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     prevArrow: (
//       <div className={`${styles.customArrow} ${styles.prevArrow}`}>
//         <img src="/images/icon/left-arrow.svg" alt="Previous" />
//       </div>
//     ),
//     nextArrow: (
//       <div className={`${styles.customArrow} ${styles.nextArrow}`}>
//         <img src="/images/icon/right-arrow.png" alt="Next" />
//       </div>
//     ),
//     responsive: [
//       {
//         breakpoint: 992,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 576,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   useEffect(() => {
//     const userData = getFromSession('userData');
//     setTimeout(() => {
//       GetAllBooksDetails()
//         .then(data => setBookData(data))
//         .catch(err => console.error('Error loading JournalDetails', err));
//       setLoading(false);
//     }, 1500);
//   }, []);

//   return (
//     <>
//       <LoadingScreen isLoading={loading} />
//       {!loading && (
//         <div className={"position-relative " + styles.box}>
//           <Slider {...settings}>
//             {BookData.map((slide, i) => (
//               <div key={slide.id} className={`${styles.book} ${styles.slide}`}>
//                 <div className={styles.booka}>
//                   <div
//                     className={`${styles.cover} p-3`}
//                     style={{ backgroundColor: getBackgroundColor(i) }}
//                   >
//                     <div className={styles.JournalTitle}>
//                       <h4 className="fs-4">{slide.journalTitle}</h4>
//                     </div>
//                     <div className={styles.containera}>
//                       <div className={styles.about}>
//                         <div className={styles.pic}>
//                           {!imageLoadError[i] ? (
//                             <Image
//                               src={slide.imageUrl}
//                               alt={slide.journalTitle}
//                               width={150}
//                               height={200}
//                               onError={() => handleImageError(i)}
//                               unoptimized // remove this if you configure next.config.js correctly
//                             />
//                           ) : (
//                             <p className={styles.errorMessage}>Error loading image</p>
//                           )}
//                         </div>
//                         <div className={styles.text}>
//                           <p>
//                             {slide.subTitle.split(" ").length > 8
//                               ? slide.subTitle.split(" ").slice(0, 8).join(" ") + "..."
//                               : slide.subTitle}
//                             {slide.subTitle.split(" ").length > 8 && (
//                               <a
//                                 className="ms-3 mt-2 btn badge bg-danger"
//                                 onClick={() => navigateToUrl(slide.id)}
//                               >
//                                 Read More
//                               </a>
//                             )}
//                           </p>
//                           <button className={styles.SliderButton + ' btn '}
                            
//                             onClick={() => navigateToUrl(slide.id)}
//                           >
//                             See The Journal
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       )}
//     </>
//   );
// };

// export default JournalCarousel;
