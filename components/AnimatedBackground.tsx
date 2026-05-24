'use client'
import { motion } from 'framer-motion'

export default function AnimatedBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Large purple orb - top left */}
      <motion.div style={{
        position: 'absolute', top: '-15%', left: '-10%',
        width: 750, height: 750, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(121,105,123,0.32) 0%, transparent 70%)',
        filter: 'blur(70px)',
      }} animate={{ x: [0, 200, 60, 0], y: [0, 130, 240, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }} />

      {/* Gold orb - bottom right */}
      <motion.div style={{
        position: 'absolute', bottom: '-12%', right: '-8%',
        width: 650, height: 650, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(250,204,21,0.16) 0%, transparent 70%)',
        filter: 'blur(80px)',
      }} animate={{ x: [0, -170, -50, 0], y: [0, -110, -210, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 7 }} />

      {/* Small gold orb - mid left */}
      <motion.div style={{
        position: 'absolute', top: '40%', left: '-5%',
        width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(250,204,21,0.1) 0%, transparent 70%)',
        filter: 'blur(50px)',
      }} animate={{ x: [0, 80, -40, 0], y: [0, -80, 60, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 4 }} />

      {/* Purple mid */}
      <motion.div style={{
        position: 'absolute', top: '20%', right: '15%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(121,105,123,0.2) 0%, transparent 70%)',
        filter: 'blur(55px)',
      }} animate={{ x: [0, 70, -80, 0], y: [0, -100, 70, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />

      {/* Glass shards — floating translucent polygons */}
      {[
        { top: '8%', left: '12%', w: 80, h: 80, rotate: 45, delay: 0 },
        { top: '60%', left: '8%', w: 60, h: 60, rotate: 20, delay: 3 },
        { top: '30%', right: '10%', w: 100, h: 100, rotate: 60, delay: 6 },
        { top: '75%', right: '18%', w: 70, h: 70, rotate: 30, delay: 9 },
        { top: '50%', left: '45%', w: 50, h: 50, rotate: 15, delay: 12 },
      ].map((s, i) => (
        <motion.div key={i} style={{
          position: 'absolute', top: s.top, left: (s as any).left, right: (s as any).right,
          width: s.w, height: s.h,
          background: 'linear-gradient(135deg, rgba(250,204,21,0.06) 0%, rgba(121,105,123,0.08) 100%)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          border: '1px solid rgba(250,204,21,0.12)',
          borderRadius: 8,
          transform: `rotate(${s.rotate}deg)`,
        }}
          animate={{ y: [-15, 15, -15], rotate: [s.rotate, s.rotate + 20, s.rotate], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: s.delay }} />
      ))}
    </div>
  )
}
