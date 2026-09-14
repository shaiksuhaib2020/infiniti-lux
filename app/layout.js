import '@/styles/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import LenisProvider from '@/components/layout/LenisProvider';

export const metadata = {
  title: 'Infiniti Luxe | Travel Beyond Boundaries',
  description: 'Explore the world with confidence. Flights, holidays, tours, visas, hotels, and corporate travel.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </LenisProvider>
      </body>
    </html>
  );
}
