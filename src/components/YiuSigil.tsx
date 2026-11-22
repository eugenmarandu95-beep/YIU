import { motion } from 'framer-motion'

export function YiuSigil({ size = 40, thinking = false, color = '#00d4ff' }: { size?: number; thinking?: boolean; color?: string }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        {/* Outer ring */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '50px', originY: '50px' }}
        >
          <circle cx="50" cy="50" r="46" fill="none" stroke={color} strokeWidth="0.5" strokeDasharray="4 6" opacity="0.3" />
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180
            const x = 50 + 46 * Math.cos(rad)
            const y = 50 + 46 * Math.sin(rad)
            return <circle key={deg} cx={x} cy={y} r="1.5" fill={color} opacity="0.6" />
          })}
        </motion.g>

        {/* Middle ring — reverse rotation */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '50px', originY: '50px' }}
        >
          <circle cx="50" cy="50" r="36" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180
            const x1 = 50 + 36 * Math.cos(rad)
            const y1 = 50 + 36 * Math.sin(rad)
            const x2 = 50 + 30 * Math.cos(rad)
            const y2 = 50 + 30 * Math.sin(rad)
            return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.8" opacity="0.5" />
          })}
        </motion.g>

        {/* Inner sacred geometry — eye of Horus inspired */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '50px', originY: '50px' }}
        >
          <polygon points="50,20 70,50 50,80 30,50" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
          <polygon points="50,30 63,50 50,70 37,50" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
        </motion.g>

        {/* Core eye */}
        <motion.ellipse
          cx="50"
          cy="50"
          rx="14"
          ry="8"
          fill="none"
          stroke={color}
          strokeWidth="1.2"
          animate={{ opacity: thinking ? [0.4, 1, 0.4] : [0.6, 0.8, 0.6] }}
          transition={{ duration: thinking ? 1 : 3, repeat: Infinity }}
          style={{ filter: `drop-shadow(0 0 ${thinking ? 6 : 3}px ${color})` }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r={thinking ? 4 : 3}
          fill={color}
          animate={{ r: thinking ? [3, 5, 3] : [2.5, 3.5, 2.5], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: thinking ? 1.2 : 3, repeat: Infinity }}
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
        />

        {/* Particle sparks when thinking */}
        {thinking && [0, 72, 144, 216, 288].map((deg) => {
          const rad = (deg * Math.PI) / 180
          return (
            <motion.circle
              key={deg}
              cx={50 + 20 * Math.cos(rad)}
              cy={50 + 20 * Math.sin(rad)}
              r="0.8"
              fill={color}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: deg / 360 }}
            />
          )
        })}
      </svg>
    </div>
  )
}
