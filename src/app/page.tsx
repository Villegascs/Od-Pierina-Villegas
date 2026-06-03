import Link from 'next/link';
import { Heart, Sparkles, Stethoscope, ShieldCheck, Clock, MapPin, Phone, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header / Navbar */}
      <header className="container" style={{ padding: '2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontWeight: 700, fontSize: '1.5rem', color: 'var(--primary)' }}>
          Od. Pierina Villegas
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/login" className="btn btn-outline" style={{ padding: '0.6rem 1.5rem' }}>Iniciar Sesión</Link>
          <Link href="/register" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Agendar Cita <ArrowRight size={18} />
          </Link>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {/* 1. Hero Section */}
        <section style={{ padding: '4rem 1.5rem 6rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Fondo sutil decorativo */}
          <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '300px', height: '300px', background: 'var(--primary-light)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.6, zIndex: -1 }}></div>
          <div style={{ position: 'absolute', bottom: '0', right: '-5%', width: '400px', height: '400px', background: 'var(--secondary)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.2, zIndex: -1 }}></div>
          
          <div className="container animate-fade-in-up" style={{ textAlign: 'center', maxWidth: '800px', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface)', padding: '0.5rem 1rem', borderRadius: '99px', border: '1px solid var(--border)', marginBottom: '2rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
              <Sparkles size={16} className="animate-float" style={{ color: 'var(--warning)' }} /> Odontología de Vanguardia
            </div>
            
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              El arte de crear <br/>
              <span className="text-gradient">sonrisas perfectas.</span>
            </h1>
            
            <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
              Diseñamos tratamientos personalizados enfocados en tu salud y estética dental. Vive la experiencia de una odontología sin dolor y resultados extraordinarios.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/register" className="btn btn-primary" style={{ padding: '1.1rem 2.5rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 8px 24px rgba(18, 53, 47, 0.25)' }}>
                Reservar Consulta
              </Link>
            </div>
            
            <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={18} color="var(--success)" /> Evaluaciones Integrales</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={18} color="var(--success)" /> Atención Personalizada</span>
            </div>
          </div>
        </section>

        {/* 2. Band of features */}
        <section style={{ background: 'var(--primary)', color: 'var(--background)', padding: '3rem 1.5rem' }}>
          <div className="container grid-3" style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <ShieldCheck size={36} color="var(--secondary)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Bioseguridad Estricta</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Protocolos rigurosos para garantizar tu seguridad en cada visita.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <Stethoscope size={36} color="var(--secondary)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Tecnología Avanzada</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Equipos de última generación para diagnósticos precisos.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <Heart size={36} color="var(--secondary)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Atención Empática</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Entendemos tus necesidades y trabajamos para tu tranquilidad.</p>
            </div>
          </div>
        </section>

        {/* 3. Services Section */}
        <section style={{ padding: '6rem 1.5rem', background: 'var(--surface-alt)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: 'var(--primary)', marginBottom: '1rem', fontWeight: 700 }}>Nuestros Tratamientos</h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>Especialistas dedicados a brindarte la mejor atención en diversas áreas de la odontología para que luzcas una sonrisa radiante y saludable.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              <div className="service-card">
                <div style={{ background: 'var(--primary-light)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Sparkles size={28} color="var(--primary)" />
                </div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '1rem', fontWeight: 600 }}>Blanqueamiento Dental</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Aclara el tono de tus dientes y elimina manchas para lograr una sonrisa brillante y rejuvenecida con nuestras técnicas seguras.</p>
              </div>
              
              <div className="service-card">
                <div style={{ background: 'var(--primary-light)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Heart size={28} color="var(--primary)" />
                </div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '1rem', fontWeight: 600 }}>Diseño de Sonrisa</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Mejora la forma, tamaño y color de tus dientes mediante carillas estéticas, adaptadas a la armonía de tu rostro.</p>
              </div>

              <div className="service-card">
                <div style={{ background: 'var(--primary-light)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <ShieldCheck size={28} color="var(--primary)" />
                </div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '1rem', fontWeight: 600 }}>Limpieza Profunda</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Prevén caries y enfermedades periodontales con nuestra profilaxis profesional, dejando tus dientes impecables.</p>
              </div>

              <div className="service-card">
                <div style={{ background: 'var(--primary-light)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Stethoscope size={28} color="var(--primary)" />
                </div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '1rem', fontWeight: 600 }}>Odontología General</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Diagnóstico integral, restauración de caries, endodoncias y tratamientos preventivos para toda la familia.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. About Section */}
        <section style={{ padding: '6rem 1.5rem' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ background: 'var(--primary-light)', borderRadius: '24px', aspectRatio: '4/5', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               {/* Si luego tienes una foto real, cambias esto por un tag <Image> */}
               <div style={{ textAlign: 'center', color: 'var(--primary)' }}>
                 <Stethoscope size={80} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                 <p style={{ fontWeight: 600, opacity: 0.5 }}>Espacio para fotografía <br/> Od. Pierina Villegas</p>
               </div>
            </div>
            <div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: 700 }}>Conoce a la Doctora</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.8 }}>
                Con años de experiencia devolviendo sonrisas a cientos de pacientes, la Odontólogo Pierina Villegas combina la destreza clínica con un profundo sentido humano.
              </p>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.8 }}>
                Su objetivo no es solo tratar dientes, sino tratar personas, asegurando que cada visita al consultorio sea una experiencia confortable, libre de estrés y con resultados que cambian vidas.
              </p>
              <Link href="/register" className="btn btn-outline" style={{ padding: '1rem 2rem' }}>
                Reserva tu evaluación
              </Link>
            </div>
          </div>
        </section>

        {/* 5. Final CTA */}
        <section style={{ padding: '5rem 1.5rem', background: 'var(--primary)', color: 'white', textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '1.5rem' }}>¿Listo para transformar tu sonrisa?</h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
              No dejes para mañana la salud de tus dientes. Agenda hoy mismo y da el primer paso hacia la mejor versión de tu sonrisa.
            </p>
            <Link href="/register" className="btn" style={{ background: 'var(--secondary)', color: 'var(--primary)', padding: '1.25rem 3rem', fontSize: '1.15rem', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)' }}>
              Agendar Cita Ahora
            </Link>
          </div>
        </section>
      </main>

      {/* 6. Footer */}
      <footer style={{ background: '#0a1d1a', color: 'rgba(255, 255, 255, 0.7)', padding: '4rem 1.5rem 2rem 1.5rem' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          
          <div>
            <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Od. Pierina Villegas</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.6 }}>Especialista en estética dental, ortodoncia y diseño de sonrisa. Pasión por la salud bucal.</p>
          </div>

          <div>
            <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Contacto</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                <Phone size={18} color="var(--secondary)" /> +58 (XXX) XXX-XXXX
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                <MessageCircle size={18} color="var(--secondary)" /> @od.pierinavillegas
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem' }}>
                <MapPin size={18} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} /> 
                <span>Centro Médico Odontológico<br/>Ciudad, Estado</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Horario</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Clock size={18} color="var(--secondary)" /> Lunes a Viernes: 8:00 AM - 5:00 PM</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Clock size={18} color="var(--secondary)" /> Sábados: Previa Cita</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Clock size={18} color="var(--secondary)" /> Domingos: Cerrado</li>
            </ul>
          </div>
          
        </div>
        
        <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '2rem', fontSize: '0.85rem' }}>
          © {new Date().getFullYear()} Od. Pierina Villegas. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
