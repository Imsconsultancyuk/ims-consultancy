'use client'
import { motion } from 'framer-motion'

const GLASS = {
  background: 'linear-gradient(135deg, rgba(121,105,123,0.12) 0%, rgba(26,26,26,0.88) 100%)',
  backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(121,105,123,0.15)',
  borderTop: '1px solid rgba(250,204,21,0.1)',
  borderRadius: 20,
}

function RotatingShape({ type, size, color, duration, delay, style }: any) {
  return (
    <motion.div
      animate={{ rotateY: [0, 360], rotateZ: [0, 15, -15, 0] }}
      transition={{ rotateY: { duration, repeat: Infinity, ease: 'linear' }, rotateZ: { duration: duration * 0.7, repeat: Infinity, ease: 'easeInOut' } }}
      style={{
        width: size, height: size,
        background: `linear-gradient(135deg, rgba(${color},0.25) 0%, rgba(${color},0.05) 100%)`,
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
        border: `1px solid rgba(${color},0.25)`,
        borderRadius: type === 'cube' ? 16 : type === 'pyramid' ? '50% 50% 50% 50% / 30% 30% 70% 70%' : '50%',
        boxShadow: `0 0 30px rgba(${color},0.15)`,
        ...style,
      }} />
  )
}

const APPROACH = [
  { n: '01', title: 'Why We Exist', body: 'Most AI consultancies sell complexity. We sell clarity. IMS was built to translate the power of AI into business outcomes that executives can see on a P&L — not in a Jupyter notebook.' },
  { n: '02', title: 'Our Approach', body: 'We embed with your team for the first 2 weeks. We map every process, every tool, every friction point. Then we build. No templates. No copy-paste. Every deployment is bespoke.' },
]

const CREDS = [
  { icon: '🏛️', l: 'ISO 27001' }, { icon: '🔒', l: 'GDPR' }, { icon: '✅', l: 'FCA Regulated' }, { icon: '🤝', l: 'Microsoft Partner' },
  { icon: '☁️', l: 'AWS Advanced' }, { icon: '🇬🇧', l: 'UK-Based' },
]

export default function Authority() {
  return (
    <section id="about" style={{ position: 'relative', zIndex: 10, padding: '120px 40px' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 72 }}>
          <span style={{
            display: 'inline-block', padding: '6px 18px', borderRadius: 50, marginBottom: 20,
            background: 'rgba(121,105,123,0.18)', border: '1px solid rgba(121,105,123,0.35)',
            fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#d4c0d5', textTransform: 'uppercase',
          }}>Why IMS</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.025em', color: '#f4f4f5', marginBottom: 16, lineHeight: 1.1 }}>
            Sharp Strategy.<br />Precise Execution.
          </h2>
        </motion.div>

        <div className="authority-split" style={{ display: 'flex', gap: 32, alignItems: 'stretch' }}>

          {/* Left — mission + approach */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.85 }}
            style={{ flex: 1.4, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {APPROACH.map((a, i) => (
              <motion.div key={a.n}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover={{ y: -4, transition: { duration: 0.4 } }}
                style={{ ...GLASS, padding: '32px 32px', display: 'flex', gap: 24 }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(250,204,21,0.1)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = '')}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#FACC15', letterSpacing: '0.06em', flexShrink: 0, paddingTop: 3 }}>{a.n}</div>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: '#f4f4f5', marginBottom: 12 }}>{a.title}</h3>
                  <p style={{ fontSize: 15, color: '#71717a', lineHeight: 1.8 }}>{a.body}</p>
                </div>
              </motion.div>
            ))}

            {/* Credentials */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
              style={{ ...GLASS, padding: '28px 32px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#79697B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>Accreditations</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {CREDS.map(c => (
                  <div key={c.l} style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px',
                    background: 'rgba(18,18,18,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10,
                  }}>
                    <span style={{ fontSize: 16 }}>{c.icon}</span>
                    <span style={{ fontSize: 12, color: '#a1a1aa', fontWeight: 600 }}>{c.l}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — 3D rotating shapes + promise */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.85, delay: 0.1 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* 3D shapes visual */}
            <div style={{ ...GLASS, padding: '48px 32px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: 280 }}>
              <div style={{ position: 'relative', width: 200, height: 200 }}>
                <RotatingShape type="cube" size={80} color="250,204,21" duration={8} delay={0} style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }} />
                <RotatingShape type="orb" size={60} color="121,105,123" duration={12} delay={2} style={{ position: 'absolute', bottom: 0, left: 10 }} />
                <RotatingShape type="pyramid" size={70} color="250,204,21" duration={10} delay={4} style={{ position: 'absolute', bottom: 0, right: 10 }} />
              </div>
              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#FACC15' }}>15+</div>
                <div style={{ fontSize: 13, color: '#52525b', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>AI Specialists</div>
              </div>
              <div style={{ display: 'flex', gap: 32, marginTop: 20 }}>
                {[['8', 'Verticals'], ['12yr', 'Experience'], ['4.9★', 'Rating']].map(([n, l]) => (
                  <div key={l} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#f4f4f5' }}>{n}</div>
                    <div style={{ fontSize: 11, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Promise */}
            <div style={{
              ...GLASS, padding: '28px 32px',
              background: 'linear-gradient(135deg, rgba(250,204,21,0.1) 0%, rgba(26,26,26,0.9) 100%)',
              border: '1px solid rgba(250,204,21,0.2)',
            }}>
              <div style={{ fontSize: 20, marginBottom: 12 }}>💡</div>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#f4f4f5', marginBottom: 10 }}>The IMS Promise</h4>
              <p style={{ fontSize: 14, color: '#a1a1aa', lineHeight: 1.7 }}>
                If we don't identify at least <strong style={{ color: '#FACC15' }}>£50,000 in annual savings</strong> in your free audit, we'll tell you straight and refer you to a better-fit partner.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
