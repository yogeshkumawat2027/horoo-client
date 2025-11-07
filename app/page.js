'use client'

import CommercialSection from "@/components/Home/CommercialSection";
import FlatSection from "@/components/Home/FlatSection";

import HeroLG from "@/components/Home/HeroLG";
import HostelSection from "@/components/Home/HostelSection";

import RoomSection from "@/components/Home/RoomSection";
import FloatingCallButton from "@/components/Home/FloatingCallButton";
import Image from "next/image";
import { useState, useEffect } from 'react';
import ProductionPopup from '@/components/Home/ProductionPopup';

export default function Home() {
  const [showPopup, setShowPopup] = useState(true);

  // Optionally auto-hide after a few seconds
  useEffect(() => {
    const t = setTimeout(() => setShowPopup(false), 10000);
    return () => clearTimeout(t);
  }, []);

  return (
  <>
  
  <HeroLG />
  <RoomSection />
  <FlatSection />
  <HostelSection />
  <CommercialSection />
  </>
  );
}
