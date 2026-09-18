import ContactSplit from '@/components/contact/ContactSplit';
import SocialStrip from '@/components/contact/SocialStrip';

export const metadata = {
  title: "Contact Us — Infiniti Luxe",
  description: "Plan your trip with Infiniti Luxe. Get in touch via WhatsApp, email or our contact form — a real travel consultant will respond."
};

export default function ContactPage() {
  return (
    <>
      <ContactSplit />
      <SocialStrip />
    </>
  );
}

