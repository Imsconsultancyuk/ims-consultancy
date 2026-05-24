'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const GLASS = {
  background: 'linear-gradient(135deg, rgba(121,105,123,0.12) 0%, rgba(26,26,26,0.88) 100%)',
  backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(121,105,123,0.15)',
  borderTop: '1px solid rgba(250,204,21,0.1)',
  borderRadius: 20,
}

const BARS = [
  { label: 'Lead Gen', before: 22, after: 87, color: '#FACC15' },
  { label: 'Support', before: 31, after: 94, color: '#79697B' },
  { label: 'Ops', before: 19, after: 84, color: '#FACC15' },
  { label: 'Finance', before: 40, after: 91, color: '#79697B' },
  { label: 'HR', before: 28, after: 78, color: '#FACC15' },
]

const CASES = [
  { industry: 'Retail Group', metric: '280%', label: 'ROI in 6 months', quote: '"IMS automated our entire inventory and supplier chain. 3 FTEs became 1, accuracy up 94%."', role: 'Chief Operations Officer', badge: '£420K saved/yr' },
  { industry: 'Financial Services', metric: '£680K', label: 'Saved annually', quote: '"Compliance reporting dropped from 40 hours to 12 minutes per month. ROI in 60 days."', role: 'Finance Director', badge: '97% time cut' },
  { industry: 'Healthcare', metric: '420hrs', label: 'Reclaimed/month', quote: '"Patient onboarding, referral triage, and admin workflows are now fully automated."', role: 'Head of Digital', badge: '340% productivity' },
]

function AnimatedBar({ before, after, color, label, inView }: any) {
  const [width, setWidth] = useState(0)
  useEffect(() => { if (inView) setTimeout(() => setWidth(after), 200) }, [inView, after])
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#a1a1aa' }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 800, color }}>+{after - before}% gain</span>
      </div>
      <div style={{ position: 'relative', height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        {/* before bar (dim) */}
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${before}%`, background: 'rgba(255,255,255,0.1)', borderRadius: 5 }} />
        {/* after bar (animated) */}
        <motion.div style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: color, borderRadius: 5, boxShadow: `0 0 12px ${color}60` }}
          animate={{ width: inView ? `${after}%` : `${before}%` }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.3 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 11, color: '#52525b' }}>Before: {before}%</span>
        <span style={{ fontSize: 11, color }}>After: {after}%</span>
      </div>
    </div>
  )
}

export default function Results() {
  const chartRef = useRef(null)
  const inView = useInView(chartRef, { once: true, margin: '-100px' })

  return (
    <section id="results" style={{ position: 'relative', zIndex: 10, padding: '120px 40px' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 72 }}>
          <span style={{
            display: 'inline-block', padding: '6px 18px', borderRadius: 50, marginBottom: 20,
            background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.28)',
            fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#FACC15', textTransform: 'uppercase',
          }}>Proven Results</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.025em', color: '#f4f4f5', marginBottom: 16, lineHeight: 1.1 }}>
            80% Faster Workflows.<br />Real Numbers.
          </h2>
        </motion.div>

        {/* Top metrics */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8 }}
          className="metrics-row" style={{ ...GLASS, display: 'flex', marginBottom: 40, overflow: 'hidden' }}>
          {[
            { n: '£2.4M+', l: 'Total Client Savings' },
            { n: '340%', l: 'Average ROI' },
            { n: '1,200+', l: 'Hours Saved/Month' },
            { n: '50+', l: 'Enterprise Clients' },
          ].map((m, i) => (
            <div key={m.n} style={{ flex: 1, textAlign: 'center', padding: '36px 24px', borderRight: i < 3 ? '1px solid rgba(250,204,21,0.06)' : 'none' }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#FACC15', lineHeight: 1, marginBottom: 8 }}>{m.n}</div>
              <div style={{ fontSize: 12, color: '#52525b', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{m.l}</div>
            </div>
          ))}
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 28, marginBottom: 40 }}>
          {/* Bar chart */}
          <motion.div ref={chartRef} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8 }}
            style={{ ...GLASS, padding: '32px 28px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#FACC15', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 28 }}>
              Efficiency Gains by Vertical
            </div>
            {BARS.map(b => <AnimatedBar key={b.label} {...b} inView={inView} />)}
          </motion.div>

          {/* Case studies */}
          <div className="results-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 18 }}>
            {CASES.map((c, i) => (
              <motion.div key={c.industry}
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.4 } }}
                style={{ ...GLASS, padding: '24px 28px', display: 'flex', gap: 24, alignItems: 'flex-start' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(250,204,21,0.1), 0 0 80px rgba(121,105,123,0.08)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = '')}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: '#FACC15', lineHeight: 1 }}>{c.metric}</div>
                  <div style={{ fontSize: 11, color: '#52525b', marginTop: 2 }}>{c.label}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#79697B', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{c.industry}</div>
                  <p style={{ fontSize: 13, color: '#a1a1aa', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 8 }}>{c.quote}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, color: '#52525b' }}>— {c.role}</span>
                    <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 50, background: 'rgba(250,204,21,0.1)', color: '#FACC15', fontWeight: 700 }}>{c.badge}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
