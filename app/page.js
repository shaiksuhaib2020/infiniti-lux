import Hero from '@/components/home/Hero';
import TripSearch from '@/components/home/TripSearch';
import ServiceCards from '@/components/home/ServiceCards';
import DestinationGallery from '@/components/home/DestinationGallery';
import VisaHighlight from '@/components/home/VisaHighlight';
import TrustSection from '@/components/home/TrustSection';
import FinalCTA from '@/components/home/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <TripSearch />
      <ServiceCards />
      <DestinationGallery />
      <VisaHighlight />
      <TrustSection />
      <FinalCTA />
    </>
  );
}
