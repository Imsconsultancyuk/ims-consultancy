'use client'
import { motion } from 'framer-motion'

const GLASS = {
  background: 'linear-gradient(135deg, rgba(121,105,123,0.12) 0%, rgba(26,26,26,0.85) 100%)',
  backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(121,105,123,0.18)',
  borderTop: '1px solid rgba(250,204,21,0.12)',
  borderRadius: 20,
}

const HALO_HOVER = {
  boxShadow: '0 0 40px rgba(250,204,21,0.12), 0 0 80px rgba(121,105,123,0.1)',
  borderColor: 'rgba(250,204,21,0.25)',
}

const CATEGORIES = [
  {
    icon: '🎯',
    category: 'Lead Generation',
    problem: 'Your sales team spends 60% of their time on manual prospecting and follow-up.',
    solution: 'AI-powered lead scoring, automated outreach sequences, and intent-signal monitoring.',
    result: '3× more qualified leads with 80% less manual effort.',
    color: '#FACC15',
  },
  {
    icon: '💬',
    category: 'Customer Support',
    problem: 'Slow response times and repetitive tickets drain your support team and frustrate customers.',
    solution: 'Intelligent triage, AI-drafted responses, and automated resolution for 70% of tickets.',
    result: '90% faster first response. CSAT scores up by 40%.',
    color: '#79697B',
  },
  {
    icon: '⚙️',
    category: 'Workflow Ops',
    problem: 'Disconnected tools, manual data entry, and broken handoffs kill your operational efficiency.',
    solution: 'End-to-end workflow automation that connects your entire tech stack seamlessly.',
    result: '65% reduction in operational overhead. Zero data-entry errors.',
    color: '#FACC15',
  },
]

export default function AutomationSystems() {
  return (
    <section id="services" style={{ position: 'relative', zIndex: 10, padding: '120px 40px' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{ textAlign: 'center', marginBottom: 72 }}>
          <span style={{
            display: 'inline-block', padding: '6px 18px', borderRadius: 50, marginBottom: 20,
            background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.28)',
            fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#FACC15', textTransform: 'uppercase',
          }}>Solutions</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.025em', color: '#f4f4f5', marginBottom: 16, lineHeight: 1.1 }}>
            Problem. Solution. Result.
          </h2>
          <p style={{ fontSize: 17, color: '#71717a', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            We don't sell features. We sell outcomes. Here's exactly what we fix.
          </p>
        </motion.div>

        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {CATEGORIES.map((c, i) => (
            <motion.div key={c.category}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1], delay: i * 0.12 }}
              whileHover={{ y: -8, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
              style={{ ...GLASS, padding: '36px 32px', cursor: 'default', transition: 'box-shadow 0.5s, border-color 0.5s' }}
              onMouseEnter={e => { Object.assign((e.currentTarget as HTMLElement).style, HALO_HOVER) }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = ''; el.style.borderColor = ''; }}>

              {/* Icon with glow */}
              <div style={{ marginBottom: 20, position: 'relative', display: 'inline-block' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `rgba(${c.color === '#FACC15' ? '250,204,21' : '121,105,123'},0.12)`,
                  border: `1px solid rgba(${c.color === '#FACC15' ? '250,204,21' : '121,105,123'},0.25)`,
                  fontSize: 24,
                  boxShadow: `0 0 20px rgba(${c.color === '#FACC15' ? '250,204,21' : '121,105,123'},0.2)`,
                }}>{c.icon}</div>
              </div>

              <div style={{ fontSize: 12, fontWeight: 800, color: c.color, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>{c.category}</div>

              {/* Problem */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#52525b', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>The Problem</div>
                <p style={{ fontSize: 14, color: '#a1a1aa', lineHeight: 1.7 }}>{c.problem}</p>
              </div>

              {/* Solution */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#52525b', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Our Solution</div>
                <p style={{ fontSize: 14, color: '#a1a1aa', lineHeight: 1.7 }}>{c.solution}</p>
              </div>

              {/* Result */}
              <div style={{
                padding: '14px 16px', borderRadius: 12,
                background: `rgba(${c.color === '#FACC15' ? '250,204,21' : '121,105,123'},0.08)`,
                border: `1px solid rgba(${c.color === '#FACC15' ? '250,204,21' : '121,105,123'},0.2)`,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#52525b', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>The Result</div>
                <p style={{ fontSize: 14, fontWeight: 700, color: c.color, lineHeight: 1.5 }}>{c.result}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
