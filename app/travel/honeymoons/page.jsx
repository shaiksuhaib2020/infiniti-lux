import ServicePageTemplate from '@/components/service/ServicePageTemplate';
import { honeymoonsConfig } from '@/lib/serviceConfigs';

export const metadata = {
  title: 'Honeymoon Planning — Infiniti Luxe',
};

export default function Page() {
  return <ServicePageTemplate config={honeymoonsConfig} />;
}
