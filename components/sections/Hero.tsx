'use client'
import { motion } from 'framer-motion'

const GLASS = {
  background: 'linear-gradient(135deg, rgba(121,105,123,0.14) 0%, rgba(26,26,26,0.88) 100%)',
  backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(250,204,21,0.08)',
  borderTop: '1px solid rgba(250,204,21,0.18)',
  borderLeft: '1px solid rgba(250,204,21,0.12)',
  borderRadius: 24,
}

const LOGOS = ['Accenture', 'Deloitte', 'KPMG', 'PwC', 'McKinsey', 'BCG', 'IBM', 'SAP', 'Oracle', 'Salesforce']

const STEPS = [
  { n: '01', title: 'Diagnose', desc: 'We map every bottleneck, redundancy, and manual process draining your revenue.' },
  { n: '02', title: 'Deploy', desc: 'Custom AI workflows built and integrated into your existing stack in weeks, not months.' },
  { n: '03', title: 'Scale', desc: 'Continuous optimisation and monitoring that compounds your ROI over time.' },
]

export default function Hero() {
  return (
    <section style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 40px 80px', textAlign: 'center' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
        style={{ maxWidth: 900, width: '100%' }}>

        {/* Pill */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ marginBottom: 32 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 20px', borderRadius: 50,
            background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.3)',
            fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#FACC15', textTransform: 'uppercase',
          }}>
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#FACC15', display: 'inline-block' }} />
            AI Automation Consultancy
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.03em', color: '#f5f5f5', marginBottom: 28 }}>
          Scale Your Revenue<br />
          <span style={{ background: 'linear-gradient(90deg, #FACC15 0%, #fbbf24 50%, #FACC15 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            with AI
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          style={{ fontSize: 19, lineHeight: 1.7, color: '#a1a1aa', maxWidth: 600, margin: '0 auto 48px' }}>
          We deploy intelligent automation systems that eliminate waste, accelerate revenue, and give your team an unfair competitive advantage.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 72 }}>
          <a href="#audit" style={{
            padding: '16px 40px', borderRadius: 50, background: '#FACC15', color: '#121212',
            fontSize: 16, fontWeight: 800, textDecoration: 'none',
            boxShadow: '0 8px 40px rgba(250,204,21,0.35)', transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-3px) scale(1.02)'; el.style.boxShadow = '0 20px 60px rgba(250,204,21,0.5)'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.boxShadow = '0 8px 40px rgba(250,204,21,0.35)'; }}>
            Get Started →
          </a>
          <a href="#results" style={{
            padding: '16px 40px', borderRadius: 50,
            background: 'rgba(121,105,123,0.15)', border: '1px solid rgba(121,105,123,0.4)',
            color: '#d4c0d5', fontSize: 16, fontWeight: 600, textDecoration: 'none',
            backdropFilter: 'blur(8px)', transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
          }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(121,105,123,0.28)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(121,105,123,0.15)')}>
            See Results
          </a>
        </motion.div>

        {/* Business outcomes stats */}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
          style={{ ...GLASS, padding: '0', maxWidth: 640, margin: '0 auto 72px', overflow: 'hidden' }}>
          <div className="hero-stats" style={{ display: 'flex' }}>
            {[
              { n: '+85%', l: 'Revenue Increase' },
              { n: '3.5×', l: 'Average ROI' },
              { n: '60%', l: 'Cost Reduction' },
            ].map((s, i) => (
              <div key={s.n} style={{ flex: 1, textAlign: 'center', padding: '30px 20px', borderRight: i < 2 ? '1px solid rgba(250,204,21,0.08)' : 'none' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#FACC15', lineHeight: 1, marginBottom: 6 }}>{s.n}</div>
                <div style={{ fontSize: 12, color: '#71717a', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Marquee logo strip */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }}
          style={{ marginBottom: 80, overflow: 'hidden' }}>
          <p style={{ fontSize: 11, color: '#52525b', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
            Trusted by teams from
          </p>
          <div style={{ display: 'flex', gap: 0, position: 'relative', overflow: 'hidden' }}>
            <motion.div style={{ display: 'flex', gap: 48, whiteSpace: 'nowrap', alignItems: 'center' }}
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
              {[...LOGOS, ...LOGOS].map((logo, i) => (
                <span key={i} style={{ fontSize: 14, fontWeight: 700, color: '#3f3f46', letterSpacing: '0.06em', textTransform: 'uppercase', flexShrink: 0 }}>
                  {logo}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* 3-step What We Do */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, maxWidth: 900, margin: '0 auto' }}>
          {STEPS.map((step, i) => (
            <motion.div key={step.n}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 + i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.5 } }}
              style={{ ...GLASS, padding: '28px 24px', textAlign: 'left', cursor: 'default' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#FACC15', letterSpacing: '0.08em', marginBottom: 12 }}>{step.n}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f4f4f5', marginBottom: 10 }}>{step.title}</h3>
              <p style={{ fontSize: 13, color: '#71717a', lineHeight: 1.7 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
        style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', opacity: 0.35 }}>
        <div style={{ width: 22, height: 36, border: '2px solid rgba(250,204,21,0.3)', borderRadius: 11, display: 'flex', justifyContent: 'center', paddingTop: 5 }}>
          <motion.div animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }} transition={{ duration: 2.5, repeat: Infinity }}
            style={{ width: 3, height: 7, background: '#FACC15', borderRadius: 2 }} />
        </div>
      </motion.div>
    </section>
  )
}
