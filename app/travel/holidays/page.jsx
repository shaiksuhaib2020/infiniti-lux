import ServicePageTemplate from '@/components/service/ServicePageTemplate';
import { holidaysConfig } from '@/lib/serviceConfigs';

export const metadata = {
  title: 'Holiday Packages — Infiniti Luxe',
};

export default function Page() {
  return <ServicePageTemplate config={holidaysConfig} />;
}
