'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 72, padding: '0 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(15,14,15,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(245,246,247,0.07)' : 'none',
        transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: 'linear-gradient(135deg, #79697B 0%, #d4c0d5 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 800, color: '#141314', letterSpacing: '0.04em',
        }}>IMS</div>
        <span style={{ fontSize: 17, fontWeight: 700, color: '#e7e1e2', letterSpacing: '-0.01em' }}>
          IMS <span style={{ color: '#79697B' }}>Consultancy</span>
        </span>
      </div>

      {/* Links */}
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        {[['Services', '#services'], ['Results', '#results'], ['About', '#about'], ['Contact', '#audit']].map(([label, href]) => (
          <a key={label} href={href} style={{
            fontSize: 14, fontWeight: 500, color: '#968e95',
            textDecoration: 'none', transition: 'color 0.3s',
          }}
          onMouseEnter={e => ((e.target as HTMLElement).style.color = '#e7e1e2')}
          onMouseLeave={e => ((e.target as HTMLElement).style.color = '#968e95')}
          >{label}</a>
        ))}
      </div>

      {/* CTA */}
      <a href="#audit" style={{
        padding: '10px 26px', borderRadius: 50,
        background: '#FFBB00', color: '#141314',
        fontSize: 14, fontWeight: 700, textDecoration: 'none',
        boxShadow: '0 0 24px rgba(255,187,0,0.22)',
        transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'scale(1.04)'
        el.style.boxShadow = '0 0 36px rgba(255,187,0,0.38)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'scale(1)'
        el.style.boxShadow = '0 0 24px rgba(255,187,0,0.22)'
      }}
      >
        Book AI Audit
      </a>
    </motion.nav>
  )
}
