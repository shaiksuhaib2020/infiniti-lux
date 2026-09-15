'use client';
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, CheckCircle, X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import styles from '@/styles/modules/contact/Contact.module.css';

// ─────────────────────────────────────────────
// EMAILJS CONFIGURATION
// To activate email sending, replace the three 
// values below with your EmailJS credentials.
// Service: https://www.emailjs.com
// Target email: infinitiempire0007@gmail.com
// ─────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // TODO
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // TODO
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';    // TODO
const EMAILJS_ENABLED     = false;  // Set to true once credentials are added

export default function ContactForm() {
  const formRef = useRef(null);
  const searchParams = useSearchParams();
  const [state, setState] = useState('idle'); // idle, loading, success, error
  const [preselected, setPreselected] = useState(null);
  
  const [formData, setFormData] = useState({
    from_name: '',
    from_whatsapp: '',
    from_email: '',
    destination: '',
    travel_dates: '',
    travellers: '',
    services: [],
    message: ''
  });
  
  const [errors, setErrors] = useState({});

  const serviceOptions = [
    'Visa', 'Flight', 'Hotel', 'Holiday', 'Tour', 'Honeymoon', 'Corporate', 'Cruise', 'Other'
  ];

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      const mapping = {
        visa: 'Visa',
        flights: 'Flight',
        hotels: 'Hotel',
        holidays: 'Holiday',
        tours: 'Tour',
        honeymoons: 'Honeymoon',
        corporate: 'Corporate',
        cruises: 'Cruise'
      };
      
      const matched = mapping[serviceParam.toLowerCase()];
      if (matched) {
        setFormData(prev => ({ ...prev, services: [matched] }));
        setPreselected(`${matched} enquiry pre-selected`);
      }
    }
  }, [searchParams]);

  const validate = () => {
    const newErrors = {};
    if (!formData.from_name.trim()) newErrors.from_name = 'Name is required';
    if (!formData.from_whatsapp.trim() || formData.from_whatsapp.replace(/\D/g, '').length < 7) {
      newErrors.from_whatsapp = 'Valid WhatsApp number is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.from_email.trim() || !emailRegex.test(formData.from_email)) {
      newErrors.from_email = 'Valid email is required';
    }
    if (formData.services.length === 0) {
      newErrors.services = 'Please select at least one service.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleCheckboxChange = (option) => {
    setFormData(prev => {
      const isChecked = prev.services.includes(option);
      const newServices = isChecked 
        ? prev.services.filter(s => s !== option)
        : [...prev.services, option];
      return { ...prev, services: newServices };
    });
    if (errors.services) setErrors(prev => ({ ...prev, services: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setState('loading');
    
    if (!EMAILJS_ENABLED) {
      console.log('Form data:', formData);
      setTimeout(() => {
        setState('success');
      }, 1000);
      return;
    }
    
    try {
      // We pass the form ref to EmailJS. It will read the input names.
      // Since services is an array in state but we need a string for EmailJS,
      // we will use a hidden input with the joined string.
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      setState('success');
    } catch (err) {
      console.error(err);
      setState('error');
    }
  };

  const constructWaLink = () => {
    let msg = `Hi Infiniti Luxe, I would like help planning my trip.`;
    if (formData.from_name) msg += `\nName: ${formData.from_name}`;
    if (formData.services.length > 0) msg += `\nServices: ${formData.services.join(', ')}`;
    return `https://wa.me/971582109797?text=${encodeURIComponent(msg)}`;
  };

  if (state === 'success') {
    return (
      <div className={styles.formCard}>
        <div className={styles.successBlock} style={{ animation: 'fadeIn 0.4s ease' }}>
          <CheckCircle size={48} color="var(--color-gold)" />
          <h3 className={styles.successHeading}>Enquiry Sent</h3>
          <p className={styles.successBody}>
            We&apos;ve received your enquiry and will respond within 24 hours — via WhatsApp or email, whichever you prefer.
          </p>
          <button className={styles.ghostBtn} onClick={() => {
            setState('idle');
            setFormData({ from_name: '', from_whatsapp: '', from_email: '', destination: '', travel_dates: '', travellers: '', services: [], message: '' });
          }}>
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formCard}>
      {preselected && (
        <div className={styles.preselectTag}>
          {preselected}
          <div className={styles.preselectDismiss} onClick={() => setPreselected(null)}>
            <X size={14} />
          </div>
        </div>
      )}
      
      <form ref={formRef} onSubmit={handleSubmit} style={{ opacity: state === 'loading' ? 0.7 : 1 }}>
        <input type="hidden" name="services" value={formData.services.join(', ')} />
        
        <div className={styles.formRow}>
          <div className={styles.formCol}>
            <label className={styles.inputLabel}>Name</label>
            <input 
              type="text" 
              name="from_name"
              className={`${styles.inputField} ${errors.from_name ? styles.inputError : ''}`}
              placeholder="Your full name"
              value={formData.from_name}
              onChange={handleInputChange}
              disabled={state === 'loading'}
            />
            {errors.from_name && <div className={styles.errorMsg}>{errors.from_name}</div>}
          </div>
          <div className={styles.formCol}>
            <label className={styles.inputLabel}>WhatsApp Number</label>
            <input 
              type="tel" 
              name="from_whatsapp"
              className={`${styles.inputField} ${errors.from_whatsapp ? styles.inputError : ''}`}
              placeholder="+971 50 000 0000"
              value={formData.from_whatsapp}
              onChange={handleInputChange}
              disabled={state === 'loading'}
            />
            {errors.from_whatsapp && <div className={styles.errorMsg}>{errors.from_whatsapp}</div>}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formCol}>
            <label className={styles.inputLabel}>Email</label>
            <input 
              type="email" 
              name="from_email"
              className={`${styles.inputField} ${errors.from_email ? styles.inputError : ''}`}
              placeholder="your@email.com"
              value={formData.from_email}
              onChange={handleInputChange}
              disabled={state === 'loading'}
            />
            {errors.from_email && <div className={styles.errorMsg}>{errors.from_email}</div>}
          </div>
          <div className={styles.formCol}>
            <label className={styles.inputLabel}>Destination</label>
            <select 
              name="destination"
              className={styles.inputField}
              value={formData.destination}
              onChange={handleInputChange}
              disabled={state === 'loading'}
            >
              <option value="" disabled>Where to?</option>
              {['Dubai', 'Maldives', 'Switzerland', 'Turkey', 'France', 'Italy', 'United Kingdom', 'USA', 'Canada', 'Japan', 'Thailand', 'Bali', 'Australia', 'Saudi Arabia', 'Other'].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formCol}>
            <label className={styles.inputLabel}>Travel Dates</label>
            <input 
              type="text" 
              name="travel_dates"
              className={styles.inputField}
              placeholder="Approximate dates"
              value={formData.travel_dates}
              onChange={handleInputChange}
              disabled={state === 'loading'}
            />
          </div>
          <div className={styles.formCol}>
            <label className={styles.inputLabel}>Number of Travellers</label>
            <select 
              name="travellers"
              className={styles.inputField}
              value={formData.travellers}
              onChange={handleInputChange}
              disabled={state === 'loading'}
            >
              <option value="" disabled>How many?</option>
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.formFull}>
          <label className={styles.inputLabel}>Service required</label>
          <div className={`${styles.servicesGroup} ${errors.services ? styles.servicesErrorGroup : ''}`}>
            {serviceOptions.map(opt => (
              <label key={opt} className={styles.checkboxLabel}>
                <input 
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={formData.services.includes(opt)}
                  onChange={() => handleCheckboxChange(opt)}
                  disabled={state === 'loading'}
                />
                <div className={styles.checkboxBox}>
                  {formData.services.includes(opt) && <Check size={14} />}
                </div>
                <span className={styles.checkboxText}>{opt}</span>
              </label>
            ))}
          </div>
          {errors.services && <div className={styles.errorMsg}>{errors.services}</div>}
        </div>

        <div className={styles.formFull}>
          <label className={styles.inputLabel}>Tell us about your trip</label>
          <textarea 
            name="message"
            className={styles.inputField}
            placeholder="Share any details about your trip — destinations, dates, special requirements or anything else we should know."
            value={formData.message}
            onChange={handleInputChange}
            disabled={state === 'loading'}
          ></textarea>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={state === 'loading'}>
          {state === 'loading' ? <div className={styles.spinner}></div> : 'Send Enquiry'}
        </button>

        {state === 'error' && (
          <div className={styles.errorBlock}>
            <div className={styles.errorBlockText}>Something went wrong sending your enquiry. Please try again, or reach us directly on WhatsApp.</div>
            <a href={constructWaLink()} target="_blank" rel="noopener noreferrer" className={styles.errorBlockLink}>WhatsApp us now</a>
          </div>
        )}

        <div className={styles.quickReply}>
          <span className={styles.quickReplyText}>Prefer a quicker reply? </span>
          <a href={constructWaLink()} target="_blank" rel="noopener noreferrer" className={styles.quickReplyLink}>Send via WhatsApp instead</a>
        </div>
      </form>
    </div>
  );
}
