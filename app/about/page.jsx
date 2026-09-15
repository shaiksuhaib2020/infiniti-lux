import AboutHero from '@/components/about/AboutHero';
import Manifesto from '@/components/about/Manifesto';
import WhatWeDo from '@/components/about/WhatWeDo';
import OurValues from '@/components/about/OurValues';
import DubaiPresence from '@/components/about/DubaiPresence';
import AboutCTA from '@/components/about/AboutCTA';

export const metadata = {
  title: 'About Us — Infiniti Luxe',
  description: 'Based in Dubai, Infiniti Luxe is a modern global travel company offering flights, holidays, hotels, visa assistance and more. Travel with confidence.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Manifesto />
      <WhatWeDo />
      <OurValues />
      <DubaiPresence />
      <AboutCTA />
    </>
  );
}
