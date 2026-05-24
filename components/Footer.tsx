'use client'

export default function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 10,
      borderTop: '1px solid rgba(245,246,247,0.07)',
      padding: '40px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg, #79697B 0%, #d4c0d5 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 800, color: '#141314',
        }}>IMS</div>
        <span style={{ fontSize: 14, color: '#4b454b', fontWeight: 600 }}>IMS Consultancy Ltd</span>
      </div>
      <p style={{ fontSize: 13, color: '#363435' }}>
        © {new Date().getFullYear()} IMS Consultancy Ltd. Registered in England & Wales.
      </p>
      <div style={{ display: 'flex', gap: 24 }}>
        {['Privacy', 'Terms', 'Contact'].map(l => (
          <a key={l} href="#" style={{ fontSize: 13, color: '#4b454b', textDecoration: 'none', transition: 'color 0.3s' }}
          onMouseEnter={e => ((e.target as HTMLElement).style.color = '#cdc4cb')}
          onMouseLeave={e => ((e.target as HTMLElement).style.color = '#4b454b')}
          >{l}</a>
        ))}
      </div>
    </footer>
  )
}
