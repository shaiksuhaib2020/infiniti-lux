import ServicePageTemplate from '@/components/service/ServicePageTemplate';
import { hotelsConfig } from '@/lib/serviceConfigs';

export const metadata = {
  title: 'Hotels — Infiniti Luxe',
};

export default function Page() {
  return <ServicePageTemplate config={hotelsConfig} />;
}
