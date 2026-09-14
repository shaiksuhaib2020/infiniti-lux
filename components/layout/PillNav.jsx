'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './PillNav.css';

export default function PillNav({
  items = [],
  logo = '',
  baseColor = '#07111C',
  pillColor = 'rgba(255,255,255,0.08)',
  pillTextColor = 'rgba(255,255,255,0.85)',
  hoveredPillTextColor = '#C5973A',
  ease = [0.16, 1, 0.3, 1], // approximate power3.out
  initialLoadAnimation = true,
  onMobileMenuClick, // Custom handler for Travel dropdown on mobile
  mobileFooter, // Add this prop
}) {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isExternal = (href) => {
    return href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  };

  const handleMobileMenuClick = (e, item) => {
    if (item.label === 'Travel' && onMobileMenuClick) {
      e.preventDefault();
      onMobileMenuClick(e, item);
      // Let Navbar handle rendering the sub-items inside the popover
    } else {
      setIsMobileOpen(false);
    }
  };

  // Using CSS variables to pass colors down easily
  const styleVars = {
    '--base-color': baseColor,
    '--pill-color': pillColor,
    '--pill-text': pillTextColor,
    '--hover-text': hoveredPillTextColor,
  };

  if (!mounted && initialLoadAnimation) return null; // Avoid hydration mismatch on initial animation load

  return (
    <div className="pill-nav-container" style={styleVars}>
      <motion.div 
        className="pill-nav-items"
        initial={initialLoadAnimation ? { y: -50, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: ease }}
      >
        {items.map((item, i) => {
          const isActive = item.href !== '#' && pathname === item.href;
          
          return (
            <div 
              key={item.label}
              className={`pill-wrapper ${isActive ? 'is-active' : ''}`}
              onMouseEnter={(e) => {
                setHoveredIndex(i);
                if (item.onMouseEnter) item.onMouseEnter(e);
              }}
              onMouseLeave={(e) => {
                setHoveredIndex(null);
                if (item.onMouseLeave) item.onMouseLeave(e);
              }}
            >
              <div className="pill-content">
                {isExternal(item.href) ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={`pill ${isActive ? 'is-active' : ''}`}>
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} className={`pill ${isActive ? 'is-active' : ''}`} onClick={(e) => {
                    if (item.label === 'Travel') e.preventDefault(); // Handled by hover mostly
                  }}>
                    {item.label}
                  </Link>
                )}

                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.div
                      className="pill-hover-bg"
                      layoutId="pill-hover"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                       {/* The duplicated text inside the hover bg creates the color wipe effect */}
                       {isExternal(item.href) ? (
                          <a href={item.href} target="_blank" rel="noopener noreferrer" className="pill-hover-text">
                            {item.label}
                          </a>
                        ) : (
                          <Link href={item.href} className="pill-hover-text" onClick={(e) => {
                            if (item.label === 'Travel') e.preventDefault();
                          }}>
                            {item.label}
                          </Link>
                        )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
        
        {/* Mobile Hamburger Toggle inside PillNav */}
        <button 
          className="mobile-toggle"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.div>

      {/* Mobile Popover */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            className="mobile-menu-popover"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {items.map((item) => {
              const isActive = item.href !== '#' && pathname === item.href;
              return (
                <div key={item.label}>
                  {isExternal(item.href) ? (
                    <a 
                      href={item.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`mobile-menu-link ${isActive ? 'is-active' : ''}`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link 
                      href={item.href} 
                      className={`mobile-menu-link ${isActive ? 'is-active' : ''}`}
                      onClick={(e) => handleMobileMenuClick(e, item)}
                    >
                      {item.label}
                    </Link>
                  )}
                  {/* If the item has mobile children passed via the wrapper, render them */}
                  {item.mobileChildren && item.mobileChildren(setIsMobileOpen)}
                </div>
              );
            })}
            
            {/* The wrapper can inject elements at the bottom (like WhatsApp button) */}
            {mobileFooter}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
