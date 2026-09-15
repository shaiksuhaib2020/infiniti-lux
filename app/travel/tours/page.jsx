import ServicePageTemplate from '@/components/service/ServicePageTemplate';
import { toursConfig } from '@/lib/serviceConfigs';

export const metadata = {
  title: 'Tours & Experiences — Infiniti Luxe',
};

export default function Page() {
  return <ServicePageTemplate config={toursConfig} />;
}
