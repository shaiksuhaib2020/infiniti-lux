import TravelHero from '@/components/travel/TravelHero';
import TravelCards from '@/components/travel/TravelCards';
import TravelPageCTA from '@/components/travel/TravelPageCTA';

export const metadata = {
  title: 'Travel Services — Infiniti Luxe',
  description: 'Explore our full range of travel services — flights, hotels, holiday packages, tours, honeymoons and cruises. Planned personally by Infiniti Luxe.',
};

export default function TravelPage() {
  return (
    <>
      <TravelHero />
      <TravelCards />
      <TravelPageCTA />
    </>
  );
}
