import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './EnvelopePage.css'

const EnvelopePage = () => {
  const [isOpening, setIsOpening] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const navigate = useNavigate()

  const handleEnvelopeClick = () => {
    if (isOpening) return
    setIsOpening(true)

    // Start music on user click so it autoplays on home page
    const audio = new Audio('/assets/music/wedding-song.mp3')
    audio.volume = 0.3
    audio.loop = true
    audio.preload = 'auto'
    audio.addEventListener('canplaythrough', () => {
      audio.currentTime = 5
      audio.play().catch(() => {})
    }, { once: true })
    audio.load()
    window.__weddingAudio = audio

    setTimeout(() => {
      setShowCard(true)
    }, 600)

    setTimeout(() => {
      navigate('/home')
    }, 2500)
  }

  return (
    <div className="envelope-page">
      {/* Floating petals background */}
      <div className="petals-container">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="petal"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
              fontSize: `${12 + Math.random() * 16}px`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
          >
            ✿
          </div>
        ))}
      </div>

      <motion.div
        className="invitation-intro"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <p className="intro-subtitle">Together with their families</p>
        <h1 className="intro-title">You Are Invited</h1>
        <p className="intro-to">to the wedding celebration of</p>
        <h2 className="intro-names">Jay-ar & Katleen</h2>
      </motion.div>

      <motion.div
        className={`envelope-wrapper ${isOpening ? 'opening' : ''}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        onClick={handleEnvelopeClick}
      >
        <div className="envelope">
          {/* Envelope back */}
          <div className="envelope-back"></div>

          {/* Card inside envelope */}
          <AnimatePresence>
            {showCard && (
              <motion.div
                className="envelope-card"
                initial={{ y: 0 }}
                animate={{ y: -180 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <div className="card-content">
                  <p className="card-script">Save the Date</p>
                  <h3>Jay-ar & Katleen</h3>
                  <div className="card-divider">♥</div>
                  <p className="card-date">April 25, 2026</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Envelope front */}
          <div className="envelope-front"></div>

          {/* Envelope flap */}
          <div className={`envelope-flap ${isOpening ? 'open' : ''}`}></div>

          {/* Heart seal */}
          <div className={`envelope-seal ${isOpening ? 'broken' : ''}`}>
            <span>♥</span>
          </div>
        </div>

        {!isOpening && (
          <motion.p
            className="tap-text"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tap to Open
          </motion.p>
        )}
      </motion.div>

      {/* Fade out overlay */}
      <AnimatePresence>
        {showCard && (
          <motion.div
            className="fade-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default EnvelopePage
