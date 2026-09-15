const fs = require('fs');
const path = require('path');

const pages = [
  { path: 'app/travel/flights/page.jsx', config: 'flightConfig', title: 'Flights' },
  { path: 'app/travel/holidays/page.jsx', config: 'holidaysConfig', title: 'Holiday Packages' },
  { path: 'app/travel/tours/page.jsx', config: 'toursConfig', title: 'Tours & Experiences' },
  { path: 'app/travel/hotels/page.jsx', config: 'hotelsConfig', title: 'Hotels' },
  { path: 'app/travel/honeymoons/page.jsx', config: 'honeymoonsConfig', title: 'Honeymoon Planning' },
  { path: 'app/travel/cruises/page.jsx', config: 'cruisesConfig', title: 'Cruise Packages' },
  { path: 'app/corporate-travel/page.jsx', config: 'corporateConfig', title: 'Corporate Travel' },
];

pages.forEach(p => {
  const fileContent = `import ServicePageTemplate from '@/components/service/ServicePageTemplate';
import { ${p.config} } from '@/lib/serviceConfigs';

export const metadata = {
  title: '${p.title} — Infiniti Luxe',
};

export default function Page() {
  return <ServicePageTemplate config={${p.config}} />;
}
`;
  const fullPath = path.join(process.cwd(), p.path);
  // Also remove the .js file if it exists, to avoid next.js conflict
  const jsPath = fullPath.replace('.jsx', '.js');
  if (fs.existsSync(jsPath)) {
    fs.unlinkSync(jsPath);
  }
  fs.writeFileSync(fullPath, fileContent, 'utf8');
});
console.log('Pages generated.');
