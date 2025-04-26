'use client';
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/Header/Header";
import JournalCarousel from './components/Carousel/JournalCarousel';
import PopularByGenre from './components/PopularByGens/PopularByGens';
export default function Home() {
  return (
    <>
    <Header/>
    <JournalCarousel/>
    <PopularByGenre/>
    </>
  );
}
