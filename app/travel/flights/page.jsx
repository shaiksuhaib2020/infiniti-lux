import ServicePageTemplate from '@/components/service/ServicePageTemplate';
import { flightConfig } from '@/lib/serviceConfigs';

export const metadata = {
  title: 'Flights — Infiniti Luxe',
};

export default function Page() {
  return <ServicePageTemplate config={flightConfig} />;
}
