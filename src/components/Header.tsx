'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Si hacemos scroll hacia abajo y pasamos los 100px, ocultamos el header
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } 
      // Si hacemos scroll hacia arriba, mostramos el header
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header style={{
      background: 'var(--secondary)',
      borderBottom: '1px solid var(--secondary-hover)',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
      transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'transform 0.3s ease-in-out'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        {/* Logo (Left) */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image 
            src="/images/logo.png" 
            alt="Od. Pierina Villegas Logo" 
            width={180} 
            height={50} 
            style={{ objectFit: 'contain', height: 'auto', maxHeight: '50px' }} 
            priority
          />
        </Link>

        {/* Navigation Links (Center) */}
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/#tratamientos" className="nav-link-light">Tratamientos</Link>
          <Link href="/#doctora" className="nav-link-light">Doctora</Link>
          <Link href="/#contacto" className="nav-link-light">Contacto</Link>
        </nav>

        {/* Action Buttons (Right) */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/login" className="btn btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>Iniciar Sesión</Link>
          <Link href="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem', background: 'white', color: 'var(--primary)' }}>Agendar Cita</Link>
        </div>
      </div>
    </header>
  );
}
