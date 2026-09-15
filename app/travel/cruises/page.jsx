import ServicePageTemplate from '@/components/service/ServicePageTemplate';
import { cruisesConfig } from '@/lib/serviceConfigs';

export const metadata = {
  title: 'Cruise Packages — Infiniti Luxe',
};

export default function Page() {
  return <ServicePageTemplate config={cruisesConfig} />;
}
