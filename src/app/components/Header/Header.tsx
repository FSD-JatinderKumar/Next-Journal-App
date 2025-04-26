'use client';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import Styles from '@/app/styles/header.module.css'
const Header = () => {
  const [show, setShow] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);

  const toggleSearchForm = () => {
    setShowSearchForm(!showSearchForm);
  };

  return (
    <header>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg p-0">
          <Link className="navbar-brand mx-0" href="/">
            <Image src="/images/logo/logo.svg" alt="Logo" className={Styles.LogoStyle} height={0} width={0} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            {show && (
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" href="/">HOME</Link>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://www.lpu.in/academics/research.php"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    RESEARCH
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://conferences.lpu.in/?_gl=1*19uo6zf*_gcl_au*MTQyMzk3NTE0LjE3MjQxMjQ4Mjk."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CONFERENCES
                  </a>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    href="#Contactus"
                    style={{ pointerEvents: isDisabled ? "none" : "auto", color: isDisabled ? "gray" : "inherit" }}
                  >
                    CONTACT US
                  </Link>
                </li>
                <li className="nav-item srch-icon">
                  <a
                    className="nav-link"
                    style={{ pointerEvents: isDisabled ? "none" : "auto", color: isDisabled ? "gray" : "inherit" }}
                    onClick={toggleSearchForm}
                  >
                    <Image src="/images/icon/search-icon.svg" alt="Search" width={20} height={20} /> SEARCH
                  </a>
                </li>
              </ul>
            )}

            <div className={`search ${!showSearchForm ? "d-none" : ""}`}>
              <form className="d-flex" role="search" method="get">
                <input
                  type="text"
                  className="search-field"
                  placeholder="Type & Hit Enter.."
                  name="s"
                />
                <span className="search-submit" onClick={toggleSearchForm}>
                  <Image src="/images/icon/search-close.svg" alt="Close" width={20} height={20} />
                </span>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
