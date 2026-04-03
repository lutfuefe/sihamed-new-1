'use client';

import SihamedVideoBanner from '@/components/SihamedVideoBanner';
import Navbar from '@/components/Navbar';
import AboutSection from '@/components/AboutSection';
import StatsSection from '@/components/StatsSection';
import ActivitiesSection from '@/components/ActivitiesSection';
import TeamSection from '@/components/TeamSection';
import LegislationSection from '@/components/LegislationSection';
import MembershipSection from '@/components/MembershipSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <SihamedVideoBanner />
      <AboutSection />
      <StatsSection />
      <ActivitiesSection />
      <TeamSection />
      <LegislationSection />
      <MembershipSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
