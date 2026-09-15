import ServicePageTemplate from '@/components/service/ServicePageTemplate';
import { corporateConfig } from '@/lib/serviceConfigs';

export const metadata = {
  title: 'Corporate Travel — Infiniti Luxe',
};

export default function Page() {
  return <ServicePageTemplate config={corporateConfig} />;
}
