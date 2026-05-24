'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GLASS = {
  background: 'linear-gradient(135deg, rgba(121,105,123,0.14) 0%, rgba(26,26,26,0.92) 100%)',
  backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(121,105,123,0.18)',
  borderTop: '1px solid rgba(250,204,21,0.14)',
  borderRadius: 24,
}

const CAL_DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr']
const CAL_TIMES = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']

const STEPS = ['Your Details', 'Your Challenge', 'Confirm']

export default function ConversionHub() {
  const [step, setStep] = useState(0)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [focused, setFocused] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', bottleneck: '', role: '' })
  const [done, setDone] = useState(false)

  const inputStyle = (field: string) => ({
    width: '100%', padding: '13px 15px', borderRadius: 10,
    background: 'rgba(18,18,18,0.7)',
    border: `1px solid ${focused === field ? '#FACC15' : 'rgba(255,255,255,0.08)'}`,
    boxShadow: focused === field ? '0 0 0 3px rgba(250,204,21,0.08)' : 'none',
    fontSize: 14, color: '#f4f4f5', outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s', boxSizing: 'border-box' as const,
  })

  const label = (text: string, required = false) => (
    <div style={{ fontSize: 11, fontWeight: 700, color: '#52525b', letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 8 }}>
      {text} {required && <span style={{ color: '#FACC15' }}>*</span>}
    </div>
  )

  return (
    <section id="audit" style={{ position: 'relative', zIndex: 10, padding: '120px 40px 160px' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{
            display: 'inline-block', padding: '6px 18px', borderRadius: 50, marginBottom: 20,
            background: 'rgba(250,204,21,0.12)', border: '1px solid rgba(250,204,21,0.3)',
            fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#FACC15', textTransform: 'uppercase',
          }}>Free AI Audit</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.025em', color: '#f4f4f5', marginBottom: 16, lineHeight: 1.1 }}>
            Claim Your Free AI Audit<br />
            <span style={{ color: '#FACC15' }}>Worth £2,500</span>
          </h2>
          <p style={{ fontSize: 17, color: '#71717a', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            45 minutes. A senior specialist. A custom roadmap you can act on immediately.
          </p>
        </motion.div>

        <div className="audit-split" style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>

          {/* Left — Glass Calendar */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.85 }}
            style={{ flex: 1, ...GLASS, padding: '32px 28px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#FACC15', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 24 }}>
              📅 Pick a time — May 2026
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              {CAL_DAYS.map((d, i) => (
                <button key={d} onClick={() => setSelectedDay(i)} style={{
                  flex: 1, padding: '14px 0', borderRadius: 12, cursor: 'pointer', fontSize: 14, fontWeight: 700,
                  background: selectedDay === i ? '#FACC15' : 'rgba(255,255,255,0.04)',
                  border: selectedDay === i ? 'none' : '1px solid rgba(255,255,255,0.07)',
                  color: selectedDay === i ? '#121212' : '#71717a',
                  transition: 'all 0.3s', boxSizing: 'border-box',
                }}>{d}<br /><span style={{ fontSize: 11, fontWeight: 400 }}>{7 + i}</span></button>
              ))}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#52525b', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>Available Times</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {CAL_TIMES.map(t => (
                <button key={t} onClick={() => setSelectedTime(t)} style={{
                  padding: '12px', borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  background: selectedTime === t ? 'rgba(250,204,21,0.15)' : 'rgba(255,255,255,0.03)',
                  border: selectedTime === t ? '1px solid rgba(250,204,21,0.4)' : '1px solid rgba(255,255,255,0.06)',
                  color: selectedTime === t ? '#FACC15' : '#71717a',
                  transition: 'all 0.3s', boxSizing: 'border-box',
                }}>{t}</button>
              ))}
            </div>
            {selectedDay !== null && selectedTime && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: 20, padding: '14px 16px', borderRadius: 12, background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.25)', fontSize: 14, color: '#FACC15', fontWeight: 600 }}>
                ✓ {selectedTime} on {CAL_DAYS[selectedDay]} 7 May selected
              </motion.div>
            )}

            {/* Floating WhatsApp */}
            <a href="https://wa.me/447700000000" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24, padding: '14px 18px', borderRadius: 14, background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)', textDecoration: 'none', transition: 'all 0.3s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.2)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.1)')}>
              <span style={{ fontSize: 22 }}>💬</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#25d366' }}>Chat on WhatsApp</div>
                <div style={{ fontSize: 12, color: '#52525b' }}>Typically replies in under 2 hours</div>
              </div>
            </a>
          </motion.div>

          {/* Right — 3-step progressive form */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.85, delay: 0.1 }}
            style={{ flex: 1.2, ...GLASS, padding: '36px 36px' }}>

            {done ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }} style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ fontSize: 52, marginBottom: 20 }}>🎯</div>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: '#f4f4f5', marginBottom: 16 }}>You're booked.</h3>
                <p style={{ fontSize: 16, color: '#a1a1aa', lineHeight: 1.7 }}>
                  A senior IMS specialist will confirm within <strong style={{ color: '#FACC15' }}>24 hours</strong>.
                  Check your email for a prep questionnaire.
                </p>
              </motion.div>
            ) : (
              <>
                {/* Step indicator */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 36, alignItems: 'center' }}>
                  {STEPS.map((s, i) => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, flex: i < 2 ? 1 : 0 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: i < step ? '#FACC15' : i === step ? 'rgba(250,204,21,0.2)' : 'rgba(255,255,255,0.06)',
                        border: i === step ? '2px solid #FACC15' : 'none',
                        fontSize: 12, fontWeight: 800,
                        color: i < step ? '#121212' : i === step ? '#FACC15' : '#52525b',
                        flexShrink: 0,
                      }}>{i < step ? '✓' : i + 1}</div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: i === step ? '#FACC15' : '#52525b' }}>{s}</span>
                      {i < 2 && <div style={{ flex: 1, height: 1, background: i < step ? '#FACC15' : 'rgba(255,255,255,0.06)' }} />}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35 }}>
                      <h3 style={{ fontSize: 20, fontWeight: 700, color: '#f4f4f5', marginBottom: 24 }}>Your Details</h3>
                      <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
                        <div style={{ flex: 1 }}>{label('Full Name', true)}<input required style={inputStyle('name')} value={form.name} placeholder="Jane Smith" onChange={e => setForm(p => ({ ...p, name: e.target.value }))} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} /></div>
                        <div style={{ flex: 1 }}>{label('Job Title')}<input style={inputStyle('role')} value={form.role} placeholder="CEO / COO" onChange={e => setForm(p => ({ ...p, role: e.target.value }))} onFocus={() => setFocused('role')} onBlur={() => setFocused(null)} /></div>
                      </div>
                      <div style={{ marginBottom: 16 }}>{label('Company', true)}<input required style={inputStyle('company')} value={form.company} placeholder="Your Organisation" onChange={e => setForm(p => ({ ...p, company: e.target.value }))} onFocus={() => setFocused('company')} onBlur={() => setFocused(null)} /></div>
                      <div style={{ marginBottom: 16 }}>{label('Email', true)}<input required type="email" style={inputStyle('email')} value={form.email} placeholder="jane@company.com" onChange={e => setForm(p => ({ ...p, email: e.target.value }))} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} /></div>
                      <div style={{ marginBottom: 28 }}>{label('Phone')}<input type="tel" style={inputStyle('phone')} value={form.phone} placeholder="+44 7700 000000" onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} /></div>
                      <button onClick={() => { if (form.name && form.company && form.email) setStep(1) }} style={{ width: '100%', padding: '15px', borderRadius: 12, background: '#FACC15', color: '#121212', border: 'none', fontSize: 15, fontWeight: 800, cursor: 'pointer', transition: 'all 0.4s' }}
                        onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 14px 40px rgba(250,204,21,0.4)'; }}
                        onMouseLeave={e => { const el = e.currentTarget; el.style.transform = ''; el.style.boxShadow = ''; }}>
                        Continue →
                      </button>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
                      <h3 style={{ fontSize: 20, fontWeight: 700, color: '#f4f4f5', marginBottom: 8 }}>Your Bottleneck</h3>
                      <p style={{ fontSize: 14, color: '#71717a', marginBottom: 24, lineHeight: 1.6 }}>Tell us the #1 process that drains your team's time or revenue. Be specific.</p>
                      <div style={{ marginBottom: 28 }}>
                        {label('Tell us your bottleneck *')}
                        <textarea style={{ ...inputStyle('bottleneck'), resize: 'none', height: 140, paddingTop: 12 } as any}
                          value={form.bottleneck} placeholder="E.g. Our sales team manually qualifies 400+ leads/week with no scoring system. We lose hours and miss hot prospects..."
                          onChange={e => setForm(p => ({ ...p, bottleneck: e.target.value }))}
                          onFocus={() => setFocused('bottleneck')} onBlur={() => setFocused(null)} />
                      </div>
                      <div style={{ display: 'flex', gap: 12 }}>
                        <button onClick={() => setStep(0)} style={{ flex: 1, padding: '15px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', color: '#71717a', border: '1px solid rgba(255,255,255,0.08)', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>← Back</button>
                        <button onClick={() => { if (form.bottleneck) setStep(2) }} style={{ flex: 2, padding: '15px', borderRadius: 12, background: '#FACC15', color: '#121212', border: 'none', fontSize: 15, fontWeight: 800, cursor: 'pointer', transition: 'all 0.4s' }}
                          onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 14px 40px rgba(250,204,21,0.4)'; }}
                          onMouseLeave={e => { const el = e.currentTarget; el.style.transform = ''; el.style.boxShadow = ''; }}>
                          Continue →
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
                      <h3 style={{ fontSize: 20, fontWeight: 700, color: '#f4f4f5', marginBottom: 8 }}>Confirm & Book</h3>
                      <p style={{ fontSize: 14, color: '#71717a', marginBottom: 24, lineHeight: 1.6 }}>Review your details below. We'll confirm within 24 hours.</p>
                      <div style={{ padding: '20px', borderRadius: 14, background: 'rgba(18,18,18,0.7)', border: '1px solid rgba(255,255,255,0.07)', marginBottom: 24 }}>
                        {[['Name', form.name], ['Company', form.company], ['Email', form.email], ['Time', selectedTime ? `${selectedTime} ${selectedDay !== null ? 'May ' + (7 + selectedDay) : ''}` : 'TBC']].map(([k, v]) => (
                          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <span style={{ fontSize: 13, color: '#52525b' }}>{k}</span>
                            <span style={{ fontSize: 13, color: '#a1a1aa', fontWeight: 600 }}>{v || '—'}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: 12 }}>
                        <button onClick={() => setStep(1)} style={{ flex: 1, padding: '15px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', color: '#71717a', border: '1px solid rgba(255,255,255,0.08)', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>← Back</button>
                        <button onClick={() => setDone(true)} style={{ flex: 2, padding: '15px', borderRadius: 12, background: '#FACC15', color: '#121212', border: 'none', fontSize: 15, fontWeight: 800, cursor: 'pointer', transition: 'all 0.4s', boxShadow: '0 8px 32px rgba(250,204,21,0.3)' }}
                          onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 18px 50px rgba(250,204,21,0.5)'; }}
                          onMouseLeave={e => { const el = e.currentTarget; el.style.transform = ''; el.style.boxShadow = '0 8px 32px rgba(250,204,21,0.3)'; }}>
                          Book My Free Audit →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Floating WhatsApp sticky button */}
      <a href="https://wa.me/447700000000" target="_blank" rel="noopener noreferrer"
        style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 200, width: 56, height: 56, borderRadius: '50%', background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, textDecoration: 'none', boxShadow: '0 8px 32px rgba(37,211,102,0.4)', transition: 'all 0.4s' }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'scale(1.12)'; el.style.boxShadow = '0 16px 48px rgba(37,211,102,0.55)'; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'scale(1)'; el.style.boxShadow = '0 8px 32px rgba(37,211,102,0.4)'; }}>
        💬
      </a>
    </section>
  )
}
