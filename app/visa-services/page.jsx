import VisaHero from '@/components/visa/VisaHero';
import VisaProcess from '@/components/visa/VisaProcess';
import WhyAssistance from '@/components/visa/WhyAssistance';
import VisaFAQ from '@/components/visa/VisaFAQ';
import VisaEnquiryCTA from '@/components/visa/VisaEnquiryCTA';

export const metadata = {
  title: 'Visa Services — Infiniti Luxe',
  description: 'Professional visa application assistance for destinations worldwide. Document guidance, application preparation and submission support.',
};

export default function VisaServicesPage() {
  return (
    <>
      <VisaHero />
      <VisaProcess />
      <WhyAssistance />
      <VisaFAQ />
      <VisaEnquiryCTA />
    </>
  );
}
