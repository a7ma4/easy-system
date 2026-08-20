import { useState, useEffect } from 'react'
import logoImg from '@/imports/loogo.webp'
import { projects as projectsData } from './projects'
import emailjs from '@emailjs/browser'
// ─── Tokens ────────────────────────────────────────────────────────────────
const BG = '#07111F'
const BG2 = '#0D1A2D'
const BORDER = 'rgba(148,163,184,0.18)'
const ACCENT = '#7CB8FF'
// const ACCENT_STRONG = '#8B5CF6'
const ACCENT_DIM = 'rgba(124,184,255,0.14)'
const TEXT = '#F8FAFC'
const TEXT_MUTED = '#A8B6CC'
const TEXT_SUBTLE = '#6B7A90'

type PageKey = 'home' | 'about' | 'services' | 'projects' | 'contact'

const navigationLinks: Array<{ label: string; page: PageKey }> = [
  { label: 'Home', page: 'home' },
  { label: 'About', page: 'about' },
  { label: 'Services', page: 'services' },
  { label: 'Projects', page: 'projects' },
  { label: 'Contact', page: 'contact' },
]

// ─── Navbar ────────────────────────────────────────────────────────────────
function Navbar({ currentPage, onNavigate }: { currentPage: PageKey; onNavigate: (page: PageKey) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isHomePage = currentPage === 'home'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavigate = (page: PageKey) => {
    setMenuOpen(false)
    onNavigate(page)
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: isHomePage
          ? scrolled ? 'rgba(7,17,31,0.96)' : 'rgba(7,17,31,0.38)'
          : 'rgba(7,17,31,0.93)',
        borderBottom: isHomePage
          ? scrolled ? `1px solid ${BORDER}` : '1px solid transparent'
          : `1px solid ${BORDER}`,
        backdropFilter: 'blur(14px)',
        transition: 'all 0.3s ease',
        boxShadow: isHomePage ? (scrolled ? '0 8px 24px rgba(2,8,20,0.18)' : 'none') : '0 8px 24px rgba(2,8,20,0.18)',
      }}
    >
      <div className="nav-shell" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div className="nav-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => handleNavigate('home')}>
            <img
              src={logoImg}
              alt="Easy System logo"
              style={{ height: 65, width: 'auto', objectFit: 'contain' }}
            />
            <h2 style={{fontWeight:"bolder"}}>Easy-System</h2>
          </div>

          {!isHomePage ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden-mobile">
              {navigationLinks.map(link => (
                <button
                  key={link.label}
                  onClick={() => handleNavigate(link.page)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: currentPage === link.page ? TEXT : TEXT_MUTED,
                    fontSize: 14,
                    fontWeight: currentPage === link.page ? 600 : 500,
                    cursor: 'pointer',
                    padding: '4px 0',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'color 0.2s',
                    opacity: 1,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
                  onMouseLeave={e => (e.currentTarget.style.color = currentPage === link.page ? TEXT : TEXT_MUTED)}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavigate('contact')}
                style={{
                  background: 'rgba(124,184,255,0.12)',
                  border: `1px solid ${BORDER}`,
                  color: TEXT,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: '10px 22px',
                  borderRadius: 10,
                  fontFamily: 'Inter, sans-serif',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Get Started
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden-mobile">
              {navigationLinks.map(link => (
                <button
                  key={link.label}
                  onClick={() => handleNavigate(link.page)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: currentPage === link.page ? TEXT : TEXT_MUTED,
                    fontSize: 14,
                    fontWeight: currentPage === link.page ? 600 : 500,
                    cursor: 'pointer',
                    padding: '4px 0',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'color 0.2s',
                    opacity: 1,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
                  onMouseLeave={e => (e.currentTarget.style.color = currentPage === link.page ? TEXT : TEXT_MUTED)}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavigate('contact')}
                style={{
                  background: 'linear-gradient(135deg, #7CB8FF 0%, #8B5CF6 100%)',
                  border: 'none',
                  color: TEXT,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: '10px 22px',
                  borderRadius: 10,
                  fontFamily: 'Inter, sans-serif',
                  transition: 'opacity 0.2s',
                  boxShadow: '0 10px 30px rgba(124,184,255,0.18)',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Get Started
              </button>
            </div>
          )}

          <button
            className="show-mobile"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'rgba(15,23,42,0.9)',
              border: `1px solid ${BORDER}`,
              color: TEXT,
              cursor: 'pointer',
              padding: '8px 10px',
              borderRadius: 8,
              display: 'none',
            }}
          >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                {menuOpen ? (
                  <>
                    <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </>
                )}
              </svg>
          </button>
        </div>

        {menuOpen && (
          <div
            style={{
              borderTop: `1px solid ${BORDER}`,
              background: 'rgba(7,17,31,0.97)',
              padding: '16px 0 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              boxShadow: '0 20px 40px rgba(2,8,20,0.35)',
            }}
          >
            {navigationLinks.map(link => (
              <button
                key={link.label}
                onClick={() => handleNavigate(link.page)}
                style={{
                  background: currentPage === link.page ? 'rgba(124,184,255,0.08)' : 'none',
                  border: 'none',
                  borderRadius: 10,
                  color: currentPage === link.page ? TEXT : TEXT_MUTED,
                  fontSize: 15,
                  fontWeight: currentPage === link.page ? 700 : 500,
                  cursor: 'pointer',
                  padding: '12px 12px',
                  textAlign: 'left',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavigate('contact')}
              style={{
                background: 'linear-gradient(135deg, #7CB8FF 0%, #8B5CF6 100%)',
                border: 'none',
                color: TEXT,
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                padding: '12px 22px',
                borderRadius: 10,
                marginTop: 8,
                width: 'fit-content',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

function MobileBottomNav({ currentPage, onNavigate }: { currentPage: PageKey; onNavigate: (page: PageKey) => void }) {
  const items: Array<{ label: string; page: PageKey; icon: React.ReactNode }> = [
    { label: 'Home', page: 'home', icon: <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /> },
    { label: 'Services', page: 'services', icon: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></> },
    { label: 'Projects', page: 'projects', icon: <><path d="M4 5h16v14H4z" /><path d="m8 15 3-3 2 2 3-4" /></> },
    { label: 'Process', page: 'home', icon: <><circle cx="6" cy="6" r="2" /><circle cx="18" cy="12" r="2" /><circle cx="6" cy="18" r="2" /><path d="M8 7.5 16 11M16 13l-8 3.5" /></> },
    { label: 'Contact', page: 'contact', icon: <><path d="M4 5h16v14H4z" /><path d="m5 7 7 5 7-5" /></> },
  ]

  const goToProcess = () => {
    onNavigate('home')
    window.setTimeout(() => document.querySelector('.process-section')?.scrollIntoView({ behavior: 'smooth' }), 80)
  }

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      {items.map(item => (
        <button
          key={item.label}
          className={item.label === 'Process' ? 'mobile-nav-process' : ''}
          onClick={item.label === 'Process' ? goToProcess : () => onNavigate(item.page)}
          aria-label={item.label}
        >
          <span className={`mobile-nav-icon ${currentPage === item.page && item.label !== 'Process' ? 'is-active' : ''}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              {item.icon}
            </svg>
          </span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return (
    <section
      id="home"
      className="hero-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 72,
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(circle at top left, rgba(124,184,255,0.16), transparent 24%), radial-gradient(circle at bottom right, rgba(139,92,246,0.12), transparent 30%)',
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(${BORDER} 1px, transparent 1px), linear-gradient(90deg, ${BORDER} 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 40%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px', width: '100%', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 64, alignItems: 'center' }} className="hero-grid">
          <div>
            {/* <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: ACCENT_DIM,
              border: `1px solid rgba(124,184,255,0.26)`,
              borderRadius: 100,
              padding: '6px 14px',
              marginBottom: 28,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                Web Design & Development Studio
              </span>
            </div> */}

            <h1 style={{
              fontSize: 'clamp(38px, 4.8vw, 68px)',
              fontWeight: 800,
              lineHeight: 1.03,
              letterSpacing: '-0.04em',
              color: TEXT,
              marginBottom: 22,
            }}>
              We build websites that help your business look stronger and{' '}
              <span style={{ color: ACCENT }}>grow faster</span>
            </h1>

            <p style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: TEXT_MUTED,
              marginBottom: 36,
              maxWidth: 530,
              fontFamily: 'Inter, sans-serif',
            }}>
              Easy System helps businesses in Egypt and the Arab market build websites that look professional, communicate clearly, and turn visitors into real customers.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate('projects')}
                style={{
                  background: 'linear-gradient(135deg, #7CB8FF 0%, #8B5CF6 100%)',
                  border: 'none',
                  color: TEXT,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: '15px 30px',
                  borderRadius: 12,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  boxShadow: '0 18px 40px rgba(124,184,255,0.25)',
                  transition: 'transform 0.2s ease, opacity 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.opacity = '0.94'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                View Our Work
              </button>
              <button
                onClick={() => onNavigate('contact')}
                style={{
                  background: 'transparent',
                  border: `1px solid ${BORDER}`,
                  color: TEXT,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '15px 30px',
                  borderRadius: 12,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = ACCENT
                  e.currentTarget.style.color = ACCENT
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = BORDER
                  e.currentTarget.style.color = TEXT
                }}
              >
                Book a Call
              </button>
              <a
                href="https://wa.me/201272005142"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#25D366',
                  border: 'none',
                  color: '#07111F',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: '15px 22px',
                  borderRadius: 12,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 12px 32px rgba(37, 211, 102, 0.18)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.52 3.48A11.79 11.79 0 0 0 12.1 0C5.58 0 .2 5.38.2 12.02c0 2.12.56 4.2 1.62 6.02L0 24l6.1-1.6A11.94 11.94 0 0 0 12.1 24c6.52 0 11.9-5.38 11.9-12.02 0-3.2-1.26-6.2-3.48-8.5ZM12.1 21.9c-1.92 0-3.8-.52-5.44-1.5l-.39-.24-3.62.94 1-3.54-.26-.38A9.9 9.9 0 0 1 2.2 12.02c0-5.48 4.46-9.94 9.9-9.94 2.64 0 5.12 1.03 6.98 2.9A9.82 9.82 0 0 1 22.04 12c0 5.46-4.46 9.9-9.94 9.9Zm5.44-7.4c-.3-.15-1.78-.88-2.05-1-.27-.12-.47-.18-.67.18-.2.36-.77 1-.94 1.2-.17.18-.34.2-.64.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.67-2.1-.18-.3-.02-.46.13-.6.14-.14.3-.34.46-.5.15-.17.2-.3.3-.5.1-.18.04-.34-.02-.5-.06-.15-.67-1.62-.92-2.22-.24-.57-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.34-.28.28-1.06 1.03-1.06 2.52 0 1.5 1.09 2.92 1.24 3.12.15.2 2.14 3.26 5.2 4.57.73.32 1.3.52 1.75.67.74.24 1.42.2 1.95.12.59-.09 1.78-.73 2.03-1.43.26-.7.26-1.3.18-1.42-.08-.12-.28-.18-.58-.32Z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="hero-visual">
            <div style={{ position: 'relative', width: '100%', maxWidth: 500 }}>
              <div style={{
                position: 'absolute',
                width: 420,
                height: 420,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(124,184,255,0.18) 0%, rgba(124,184,255,0.05) 32%, transparent 72%)',
                filter: 'blur(10px)',
              }} />

              <div style={{
                position: 'relative',
                background: 'linear-gradient(180deg, rgba(14,22,38,0.96), rgba(9,15,28,0.96))',
                border: `1px solid ${BORDER}`,
                borderRadius: 30,
                padding: 28,
                boxShadow: '0 30px 90px rgba(2,8,20,0.72)',
                backdropFilter: 'blur(14px)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                  <div>
                    <div style={{ fontSize: 11, color: TEXT_SUBTLE, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Growth Snapshot</div>
                    <div style={{ fontSize: 30, fontWeight: 800, color: TEXT, fontFamily: 'Plus Jakarta Sans, sans-serif', marginTop: 8 }}>+72%</div>
                  </div>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: 18,
                    background: 'linear-gradient(135deg, rgba(124,184,255,0.2), rgba(139,92,246,0.16))',
                    border: `1px solid rgba(124,184,255,0.24)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: ACCENT,
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 18h16M7 15l3-3 2 2 5-6"/></svg>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: 12 }}>
                  {[
                    { label: 'UX Strategy', value: '98%' },
                    { label: 'Design System', value: '94%' },
                    { label: 'Development', value: '96%' },
                  ].map((item) => (
                    <div key={item.label} style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: `1px solid ${BORDER}`,
                      borderRadius: 14,
                      padding: '14px 16px',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <span style={{ fontSize: 13, color: TEXT_MUTED, fontFamily: 'Inter, sans-serif' }}>{item.label}</span>
                        <span style={{ fontSize: 12, color: ACCENT, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{item.value}</span>
                      </div>
                      <div style={{ height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                        <div style={{
                          width: item.value,
                          height: '100%',
                          borderRadius: 999,
                          background: 'linear-gradient(90deg, #7CB8FF 0%, #8B5CF6 100%)',
                        }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: 22,
                  borderTop: `1px solid ${BORDER}`,
                  paddingTop: 18,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div>
                    <div style={{ fontSize: 11, color: TEXT_SUBTLE, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Delivery</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: TEXT, fontFamily: 'Plus Jakarta Sans, sans-serif', marginTop: 4 }}>3–6 Weeks</div>
                  </div>
                  <div style={{
                    background: ACCENT_DIM,
                    border: `1px solid rgba(124,184,255,0.25)`,
                    borderRadius: 999,
                    padding: '8px 12px',
                    color: ACCENT,
                    fontWeight: 700,
                    fontSize: 12,
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    Ready to launch
                  </div>
                </div>
              </div>

              <div style={{
                position: 'absolute',
                top: 18,
                right: -6,
                background: 'rgba(13,26,45,0.9)',
                border: `1px solid ${BORDER}`,
                borderRadius: 12,
                padding: '10px 14px',
                zIndex: 3,
                boxShadow: '0 10px 30px rgba(2,8,20,0.45)',
              }}>
                <div style={{ fontSize: 11, color: TEXT_SUBTLE, fontFamily: 'Inter, sans-serif' }}>Projects</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: TEXT, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>20+</div>
              </div>
              <div style={{
                position: 'absolute',
                bottom: 18,
                left: -10,
                background: 'rgba(13,26,45,0.9)',
                border: `1px solid ${BORDER}`,
                borderRadius: 12,
                padding: '10px 14px',
                zIndex: 3,
                boxShadow: '0 10px 30px rgba(2,8,20,0.45)',
              }}>
                <div style={{ fontSize: 11, color: TEXT_SUBTLE, fontFamily: 'Inter, sans-serif' }}>Clients</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: TEXT, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>15+</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes spin-reverse { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(-360deg); } }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .hero-visual { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  )
}

// ─── About ─────────────────────────────────────────────────────────────────
function About() {
  const stats = [
    { value: '10+', label: 'Projects Delivered' },
    { value: '7+', label: 'Clients Served' },
    { value: '2+', label: 'Years in Web' },
  ]

  return (
    <section id="about" className="about-section" style={{ padding: '120px 32px', backgroundColor: BG }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="two-col">
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
              About Us
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.02em', color: TEXT, marginBottom: 24 }}>
              Built for businesses that want a stronger online presence.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: TEXT_MUTED, marginBottom: 18, fontFamily: 'Inter, sans-serif' }}>
              Easy System helps businesses turn ideas into practical digital solutions. We create websites that are clean, easy to understand, and built to support sales and growth.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: TEXT_MUTED, fontFamily: 'Inter, sans-serif' }}>
              Whether it’s a business website, landing page, or online storefront, we design and build experiences that feel premium and work for real business goals.
            </p>
          </div>

          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }} className="stats-grid">
              {stats.map(stat => (
                <div key={stat.label} style={{
                  background: BG2,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 14,
                  padding: '28px 20px',
                  textAlign: 'center',
                  boxShadow: '0 15px 30px rgba(2,8,20,0.18)',
                }}>
                  <div style={{ fontSize: 'clamp(28px,3vw,40px)', fontWeight: 800, color: TEXT, fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: '-0.02em' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 13, color: TEXT_MUTED, marginTop: 6, lineHeight: 1.4, fontFamily: 'Inter, sans-serif' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 20,
              background: BG2,
              border: `1px solid ${BORDER}`,
              borderRadius: 14,
              padding: '24px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: ACCENT_DIM,
                border: `1px solid rgba(124,184,255,0.25)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>On-time delivery</div>
                <div style={{ fontSize: 13, color: TEXT_MUTED, marginTop: 2, fontFamily: 'Inter, sans-serif' }}>Every project is planned to be clear, efficient, and ready when you need it.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr !important; gap: 48px !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}

// ─── Services ──────────────────────────────────────────────────────────────
const services = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    title: 'Web Development',
    desc: 'Fast, accessible, and scalable web applications built with modern stacks.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.5-6.5-2.1 2.1M6.6 17.4l-2.1 2.1m0-13 2.1 2.1m10.7 10.7 2.1 2.1"/>
      </svg>
    ),
    title: 'Custom Systems',
    desc: 'Tailored software systems engineered around your specific business logic.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
    title: 'E-Commerce Solutions',
    desc: 'End-to-end online stores with seamless payment, inventory, and analytics.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v6m6-6v6"/>
      </svg>
    ),
    title: 'UI/UX Design',
    desc: 'Interfaces that are intuitive, consistent, and enjoyable to use every day.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2z"/><path d="M7 7h.01"/>
      </svg>
    ),
    title: 'Business Automation',
    desc: 'Eliminate repetitive tasks with smart workflows that run themselves.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Technical Support',
    desc: 'Ongoing maintenance, monitoring, and expert support for your digital systems.',
  },
]

function Services() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="services" className="services-section" style={{ padding: '120px 32px', backgroundColor: BG2 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 64, maxWidth: 560 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: ACCENT, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
            Services
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: TEXT }}>
            Strategic digital solutions for growing businesses
          </h2>
          <p style={{ fontSize: 16, color: TEXT_MUTED, marginTop: 16, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
            A focused set of capabilities designed to help you build trust, improve conversion, and move faster online.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="services-grid">
          {services.map((svc, i) => (
            <div
              key={svc.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i ? 'linear-gradient(180deg, rgba(17,24,39,0.96), rgba(12,19,31,0.9))' : BG,
                border: `1px solid ${hovered === i ? 'rgba(42,110,232,0.3)' : BORDER}`,
                borderRadius: 20,
                padding: '28px 24px',
                cursor: 'default',
                transition: 'all 0.25s ease',
                boxShadow: hovered === i ? '0 18px 42px rgba(2,8,20,0.22)' : 'none',
              }}
            >
              <div style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                background: hovered === i ? ACCENT_DIM : 'rgba(255,255,255,0.04)',
                border: `1px solid ${hovered === i ? 'rgba(42,110,232,0.25)' : BORDER}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: hovered === i ? ACCENT : TEXT_MUTED,
                marginBottom: 18,
                transition: 'all 0.2s ease',
              }}>
                {svc.icon}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 8, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {svc.title}
              </h3>
              <p style={{ fontSize: 14, color: TEXT_MUTED, lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>
                {svc.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .services-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 600px) and (max-width: 900px) { .services-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  )
}

// ─── Projects ──────────────────────────────────────────────────────────────
type ProjectItem = {
  id: string
  name: string
  category: string
  location: string
  url: string
  year: string
  description: string
  image: string
  tags: string[]
}

const projects: ProjectItem[] = Array.isArray(projectsData) ? (projectsData as ProjectItem[]) : []

function Projects() {
  const [active, setActive] = useState(0)

  return (
    <section id="projects" className="projects-section" style={{ padding: '120px 32px', backgroundColor: BG }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: ACCENT, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
              Projects
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: TEXT }}>
              Selected Work
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 32 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === active ? ACCENT : BORDER,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 38, alignItems: 'center' }} className="project-grid">
          <div style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', background: BG2, border: `1px solid ${BORDER}`, boxShadow: '0 24px 60px rgba(2,8,20,0.35)' }}>
            <img
              src={projects[active].image}
              alt={projects[active].name}
              style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', display: 'block', opacity: 0.92 }}
            />
            <div style={{
              position: 'absolute',
              top: 16,
              left: 16,
              background: 'rgba(8,12,24,0.8)',
              backdropFilter: 'blur(8px)',
              border: `1px solid ${BORDER}`,
              borderRadius: 10,
              padding: '6px 12px',
            }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: ACCENT, fontFamily: 'Inter, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {projects[active].category}
              </span>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {projects.map((proj, i) => (
                <div
                  key={proj.id}
                  onClick={() => setActive(i)}
                  style={{
                    padding: '22px 20px',
                    borderRadius: 18,
                    border: `1px solid ${i === active ? 'rgba(42,110,232,0.3)' : BORDER}`,
                    background: i === active ? 'linear-gradient(180deg, rgba(124,184,255,0.08), rgba(17,24,39,0.45))' : 'rgba(255,255,255,0.01)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: i === active ? '0 16px 32px rgba(2,8,20,0.18)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: i === active ? TEXT : TEXT_MUTED, margin: 0, fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'color 0.2s' }}>
                      {proj.name}
                    </h3>
                    <span style={{ fontSize: 11, color: TEXT_SUBTLE, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                      {proj.year}
                    </span>
                  </div>
                  {i === active && (
                    <>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                        {proj.tags.map(tag => (
                          <span
                            key={tag}
                            style={{
                              display: 'inline-block',
                              fontSize: 11,
                              color: ACCENT,
                              background: 'rgba(124,184,255,0.08)',
                              border: `1px solid rgba(124,184,255,0.2)`,
                              borderRadius: 999,
                              padding: '6px 10px',
                              fontFamily: 'Inter, sans-serif',
                              fontWeight: 600,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p style={{ fontSize: 14, color: TEXT_MUTED, lineHeight: 1.65, marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
                        {proj.description}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 12, color: TEXT_SUBTLE, fontFamily: 'Inter, sans-serif' }}>
                          {proj.location}
                        </span>
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            background: 'none',
                            border: `1px solid ${ACCENT}`,
                            color: ACCENT,
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: '8px 18px',
                            borderRadius: 8,
                            fontFamily: 'Inter, sans-serif',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            textDecoration: 'none',
                          }}
                        >
                          View Project
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </a>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .project-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

// ─── Why Easy System ───────────────────────────────────────────────────────
const advantages = [
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    title: 'Clean & Reliable',
    desc: 'Every platform is carefully built to be dependable, stable, and easy to trust from day one.',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    title: 'Fast & Scalable',
    desc: 'Designed to perform well now and keep supporting your growth as the business expands.',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
    title: 'Business-Focused',
    desc: 'Technology is built around your goals, not the other way around, so it supports decisions and growth.',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    title: 'Modern Stack',
    desc: 'We use proven modern tools and keep the system efficient, secure, and easy to maintain.',
  },
]

function WhyUs() {
  return (
    <section className="why-section" style={{ padding: '120px 32px', backgroundColor: BG2 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64, maxWidth: 560, margin: '0 auto 64px' }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: ACCENT, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
            Why Us
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: TEXT }}>
            Why businesses choose Easy System
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="why-grid">
          {advantages.map((adv) => (
            <div key={adv.title} style={{
              background: 'linear-gradient(180deg, rgba(10,17,29,0.92), rgba(7,17,31,0.96))',
              border: `1px solid ${BORDER}`,
              borderRadius: 20,
              padding: '28px 24px',
              boxShadow: '0 16px 36px rgba(2,8,20,0.18)',
            }}>
              <div style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: ACCENT_DIM,
                border: `1px solid rgba(42,110,232,0.25)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: ACCENT,
                marginBottom: 18,
              }}>
                {adv.icon}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 10, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {adv.title}
              </h3>
              <p style={{ fontSize: 14, color: TEXT_MUTED, lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>
                {adv.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .why-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .why-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

// ─── Process ───────────────────────────────────────────────────────────────
const steps = [
  { num: '01', title: 'Discover', desc: 'We listen to your business goals, audience, and challenges before planning the right solution.' },
  { num: '02', title: 'Design', desc: 'We map the structure and experience to make sure the interface feels clear, premium, and practical.' },
  { num: '03', title: 'Build', desc: 'We develop in clear phases with regular updates so you can review progress and provide feedback.' },
  { num: '04', title: 'Launch', desc: 'We test, optimize, and deliver a final product that feels polished and ready for real use.' },
]

function Process() {
  return (
    <section className="process-section" style={{ padding: '120px 32px', backgroundColor: BG }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72, maxWidth: 560, margin: '0 auto 72px' }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: ACCENT, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
            Process
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: TEXT }}>
            A simple process built around clarity and momentum
          </h2>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Connector line — desktop */}
          <div style={{
            position: 'absolute',
            top: 28,
            left: 'calc(12.5% + 20px)',
            right: 'calc(12.5% + 20px)',
            height: 1,
            background: `linear-gradient(90deg, transparent, ${BORDER} 10%, ${BORDER} 90%, transparent)`,
          }} className="connector-line" />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }} className="process-grid">
            {steps.map((step) => (
              <div key={step.num} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: BG2,
                  border: `1px solid ${BORDER}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: ACCENT, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{step.num}</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: TEXT, marginBottom: 10, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: TEXT_MUTED, lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .process-grid { grid-template-columns: 1fr !important; gap: 40px !important; text-align: left !important; }
          .process-grid > div { display: flex; gap: 20px; align-items: flex-start; text-align: left !important; }
          .process-grid > div > div:first-child { margin: 0; flex-shrink: 0; }
          .connector-line { display: none !important; }
        }
      `}</style>
    </section>
  )
}

// ─── CTA ───────────────────────────────────────────────────────────────────
function CTA({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return (
    <section className="cta-section" style={{ padding: '80px 32px', backgroundColor: BG2 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          background: BG,
          border: `1px solid rgba(42,110,232,0.2)`,
          borderRadius: 20,
          padding: 'clamp(48px, 8vw, 80px) clamp(32px, 6vw, 80px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 40,
          flexWrap: 'wrap',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: -80,
            right: 80,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(42,110,232,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: 520 }}>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em', color: TEXT, marginBottom: 16 }}>
              Have an idea?<br />Let's build it.
            </h2>
            <p style={{ fontSize: 16, color: TEXT_MUTED, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
              Let's turn your business idea into a simple, powerful digital system.
            </p>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            style={{
              background: ACCENT,
              border: 'none',
              color: TEXT,
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              padding: '16px 36px',
              borderRadius: 12,
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              whiteSpace: 'nowrap',
              transition: 'opacity 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Start a Project
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Contact ───────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
   try { await emailjs.send(
    'service_mhf4j05',    // من EmailJS dashboard
    'template_n68prx7',   // من EmailJS dashboard
    {
      from_name: form.name,
      from_email: form.email,
      message: form.message,
    },
    'HFjLJypwzrXSEjSA7'     // من EmailJS dashboard
  )
  
  setSent(true)
}

 catch (_err) {
    alert('Something went wrong, please try again.')
  }
}

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 10,
    padding: '13px 16px',
    fontSize: 14,
    color: TEXT,
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" className="contact-section" style={{ padding: '120px 32px', backgroundColor: BG }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} className="contact-grid">
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: ACCENT, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
              Contact
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: TEXT, marginBottom: 20 }}>
              Get In Touch
            </h2>
            <p style={{ fontSize: 16, color: TEXT_MUTED, lineHeight: 1.7, marginBottom: 48, fontFamily: 'Inter, sans-serif' }}>
              Ready to start a project or ask a question? We’re here to help. We usually reply within one business day.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { label: 'Email', value: 'easysystem1519@gmail.com' },
                { label: 'WhatsApp', value: '01272005142', href: 'https://wa.me/201272005142' },
                { label: 'WhatsApp', value: '01288235581', href: 'https://wa.me/201288235581' },
                { label: 'Location', value: 'Zagazig, Egypt' },
                { label: 'Availability', value: 'Open for projects in 2026' },
              ].map(item => (
                <div key={`${item.label}-${item.value}`} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: ACCENT,
                    marginTop: 7,
                    flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SUBTLE, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Inter, sans-serif', marginBottom: 2 }}>{item.label}</div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontSize: 15, color: TEXT, fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div style={{ fontSize: 15, color: TEXT, fontFamily: 'Inter, sans-serif' }}>{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ background: BG2, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 32 }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: ACCENT_DIM,
                  border: `1px solid rgba(42,110,232,0.3)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: ACCENT,
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: TEXT, marginBottom: 8, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Message Sent</h3>
                <p style={{ fontSize: 14, color: TEXT_MUTED, fontFamily: 'Inter, sans-serif' }}>We'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: TEXT_MUTED, display: 'block', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>Name</label>
                  <input
                    style={inputStyle}
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    onFocus={e => (e.target.style.borderColor = ACCENT)}
                    onBlur={e => (e.target.style.borderColor = BORDER)}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: TEXT_MUTED, display: 'block', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>Email</label>
                  <input
                    style={inputStyle}
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    onFocus={e => (e.target.style.borderColor = ACCENT)}
                    onBlur={e => (e.target.style.borderColor = BORDER)}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: TEXT_MUTED, display: 'block', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>Message</label>
                  <textarea
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                    placeholder="Tell us about your project..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={e => (e.target.style.borderColor = ACCENT)}
                    onBlur={e => (e.target.style.borderColor = BORDER)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    background: ACCENT,
                    border: 'none',
                    color: TEXT,
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: 'pointer',
                    padding: '14px',
                    borderRadius: 10,
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    marginTop: 4,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
      `}</style>
    </section>
  )
}

// ─── Footer ────────────────────────────────────────────────────────────────
function Footer({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return (
    <footer className="site-footer" style={{ backgroundColor: BG2, borderTop: `1px solid ${BORDER}`, padding: '64px 32px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }} className="footer-grid">
          <div>
            <img src={logoImg} alt="Easy System" style={{ height: 36, objectFit: 'contain', marginBottom: 16 }} />
            <p style={{ fontSize: 14, color: TEXT_MUTED, lineHeight: 1.7, maxWidth: 260, fontFamily: 'Inter, sans-serif' }}>
              Building practical digital solutions for businesses that want to grow with clarity and confidence.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              {[{ name: 'instagram', href: 'https://www.instagram.com/easysystem2026?igsh=NjB2MzlwYW04eW4x' }].map(social => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: BG,
                    border: `1px solid ${BORDER}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: TEXT_MUTED,
                    textDecoration: 'none',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = ACCENT
                    ;(e.currentTarget as HTMLElement).style.color = ACCENT
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = BORDER
                    ;(e.currentTarget as HTMLElement).style.color = TEXT_MUTED
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 20, letterSpacing: '0.04em', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {navigationLinks.map(link => (
                <button
                  key={link.label}
                  onClick={() => onNavigate(link.page)}
                  style={{ background: 'none', border: 'none', color: TEXT_MUTED, fontSize: 14, cursor: 'pointer', padding: 0, textAlign: 'left', fontFamily: 'Inter, sans-serif', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
                  onMouseLeave={e => (e.currentTarget.style.color = TEXT_MUTED)}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 20, letterSpacing: '0.04em', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Web Development', 'Custom Systems', 'E-Commerce', 'UI/UX Design', 'Automation'].map(svc => (
                <span key={svc} style={{ fontSize: 14, color: TEXT_MUTED, fontFamily: 'Inter, sans-serif' }}>{svc}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 20, letterSpacing: '0.04em', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ fontSize: 14, color: TEXT_MUTED, fontFamily: 'Inter, sans-serif' }}>easysystem1519@gmail.com</span>
              <a href="https://wa.me/201272005142" target="_blank" rel="noreferrer" style={{ fontSize: 14, color: TEXT_MUTED, fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}>01272005142</a>
              <a href="https://wa.me/201288235581" target="_blank" rel="noreferrer" style={{ fontSize: 14, color: TEXT_MUTED, fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}>01288235581</a>
              <span style={{ fontSize: 14, color: TEXT_MUTED, fontFamily: 'Inter, sans-serif' }}>Zagazig, Egypt</span>
              <span style={{ fontSize: 14, color: TEXT_MUTED, fontFamily: 'Inter, sans-serif' }}>Mon–Fri, 9am–6pm</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontSize: 13, color: TEXT_SUBTLE, fontFamily: 'Inter, sans-serif' }}>
            © 2026 Easy System. All rights reserved.
          </span>
          <span style={{ fontSize: 13, color: TEXT_SUBTLE, fontFamily: 'Inter, sans-serif' }}>
            Built with precision.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}

function getInitialPage(): PageKey {
  if (typeof window === 'undefined') return 'home'

  const path = window.location.pathname.replace(/\/$/, '').toLowerCase()
  const current = path.split('/').filter(Boolean)[0]

  if (current === 'about' || current === 'services' || current === 'projects' || current === 'contact') {
    return current
  }

  return 'home'
}

// ─── Root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState<PageKey>(getInitialPage)

  const navigate = (page: PageKey) => {
    setCurrentPage(page)
    const targetPath = page === 'home' ? '/' : `/${page}`
    window.history.pushState({}, '', targetPath)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const onPopState = () => setCurrentPage(getInitialPage())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />
      case 'services':
        return <Services />
      case 'projects':
        return <Projects />
      case 'contact':
        return <Contact />
      case 'home':
      default:
        return (
          <>
            <Hero onNavigate={navigate} />
            <About />
            <Services />
            <Projects />
            <WhyUs />
            <Process />
            <CTA onNavigate={navigate} />
          </>
        )
    }
  }

  return (
    <div style={{ backgroundColor: BG, minHeight: '100vh' }}>
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      {renderPage()}
      {currentPage === 'contact' ? null : <Contact />}
      <Footer onNavigate={navigate} />
      <MobileBottomNav currentPage={currentPage} onNavigate={navigate} />
    </div>
  )
}
