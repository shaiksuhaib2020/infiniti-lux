import Manifesto from '@/components/about/Manifesto';
import WhatWeDo from '@/components/about/WhatWeDo';
import OurValues from '@/components/about/OurValues';
import DubaiPresence from '@/components/about/DubaiPresence';
import AboutCTA from '@/components/about/AboutCTA';

export const metadata = {
  title: 'About Us | Infiniti Luxe',
  description: 'Learn about Infiniti Luxe, our values, and how we craft unforgettable travel experiences from our base in Dubai.',
};

export default function AboutPage() {
  return (
    <main>
      <Manifesto />
      <WhatWeDo />
      <OurValues />
      <DubaiPresence />
      <AboutCTA />
    </main>
  );
}
