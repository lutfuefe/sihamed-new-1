'use client';

import SihamedVideoBanner from '@/components/SihamedVideoBanner';
import Navbar from '@/components/Navbar';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import StatsSection from '@/components/StatsSection';
import ActivitiesSection from '@/components/ActivitiesSection';
import TeamSection from '@/components/TeamSection';
import LegislationSection from '@/components/LegislationSection';
import NewsSection from '@/components/NewsSection';
import MembershipSection from '@/components/MembershipSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <SihamedVideoBanner />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <ActivitiesSection />
      <TeamSection />
      <LegislationSection />
      <NewsSection />
      <MembershipSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
