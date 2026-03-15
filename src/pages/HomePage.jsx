import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LadyIllustration from '../components/LadyIllustration'
import GentlemanIllustration from '../components/GentlemanIllustration'
import './HomePage.css'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
}

const staggerFast = {
  visible: { transition: { staggerChildren: 0.08 } },
}

const carouselImages = [
  { src: '/assets/images/palauig-1.jpg', label: 'Magalawa Island' },
  { src: '/assets/images/palauig-2.jpg', label: 'Locloc Beach' },
  { src: '/assets/images/palauig-3.jpg', label: 'Mount Tapulao' },
  { src: '/assets/images/palauig-4.jpg', label: 'Bagsit River' },
  { src: '/assets/images/palauig-5.jpg', label: 'San Juan Beach' },
]

const HomePage = () => {
  const audioRef = useRef(null)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    // Pick up audio started from envelope page, or create new
    if (window.__weddingAudio) {
      audioRef.current = window.__weddingAudio
      setIsMusicPlaying(!window.__weddingAudio.paused)
    }

    const playMusic = () => {
      if (!audioRef.current) {
        const audio = new Audio('/assets/music/wedding-song.mp3')
        audio.volume = 0.3
        audio.loop = true
        audioRef.current = audio
      }
      if (audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsMusicPlaying(true)
        }).catch(() => {})
      }
    }

    const timer = setTimeout(playMusic, 300)

    const handleInteraction = () => {
      playMusic()
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
      window.removeEventListener('scroll', handleInteraction)
    }

    window.addEventListener('click', handleInteraction)
    window.addEventListener('touchstart', handleInteraction)
    window.addEventListener('scroll', handleInteraction)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
      window.removeEventListener('scroll', handleInteraction)
    }
  }, [])

  // Background carousel auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isMusicPlaying) {
      audioRef.current.pause()
      setIsMusicPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        setIsMusicPlaying(true)
      }).catch(() => {})
    }
  }

  const entourage = {
    principal: [
      { role: 'Father of the Groom', name: 'Mr. Roberto Santos' },
      { role: 'Mother of the Groom', name: 'Mrs. Maria Santos' },
      { role: 'Father of the Bride', name: 'Mr. Antonio Reyes' },
      { role: 'Mother of the Bride', name: 'Mrs. Elena Reyes' },
    ],
    sponsors: [
      'Mr. & Mrs. Carlos Cruz',
      'Mr. & Mrs. David Garcia',
      'Mr. & Mrs. Miguel Torres',
      'Mr. & Mrs. Rafael Dela Cruz',
    ],
    bestMan: 'Marco Santos',
    maidOfHonor: 'Angela Reyes',
    groomsmen: ['Luis Santos', 'Kevin Garcia', 'Patrick Cruz', 'James Torres'],
    bridesmaids: ['Maria Garcia', 'Sofia Cruz', 'Diana Torres', 'Nina Reyes'],
    flowerGirls: ['Emma Santos', 'Mia Cruz'],
    ringBearer: 'Lucas Garcia',
    bibleBearers: ['Gabriel Santos', 'Isabella Reyes'],
    cordSponsors: ['Mr. & Mrs. Fernando Lim', 'Mr. & Mrs. Ricardo Tan'],
    veilSponsors: ['Mr. & Mrs. Eduardo Sy', 'Mr. & Mrs. Benjamin Go'],
    candleSponsors: ['Mr. & Mrs. Manuel Uy', 'Mr. & Mrs. Lorenzo Ang'],
  }

  return (
    <div className="home-page">
      {/* Music control */}
      <button className="music-toggle" onClick={toggleMusic} aria-label="Toggle music">
        {isMusicPlaying ? '♫' : '♪'}
        <span className={`music-bars ${isMusicPlaying ? 'playing' : ''}`}>
          <span></span><span></span><span></span>
        </span>
      </button>

      {/* Hero Section */}
      <motion.section
        className="hero-section"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {/* Background image carousel */}
        <div className="hero-bg-carousel">
          <AnimatePresence mode="sync">
            <motion.div
              key={currentSlide}
              className="hero-bg-slide"
              style={{ backgroundImage: `url(${carouselImages[currentSlide].src})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </AnimatePresence>
        </div>
        <div className="hero-bg-overlay" />

<motion.div className="hero-ornament top-ornament" variants={fadeInUp}>
          ✦ ✦ ✦
        </motion.div>
        <motion.p className="hero-subtitle" variants={fadeInUp}>
          Together with their families
        </motion.p>
        <motion.h1 className="hero-names" variants={fadeInUp}>
          <motion.span
            className="groom-name"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Jay-ar
          </motion.span>
          <motion.span
            className="ampersand"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            &
          </motion.span>
          <motion.span
            className="bride-name"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Katleen
          </motion.span>
        </motion.h1>
        <motion.div className="hero-divider" variants={fadeInUp}>
          <span className="divider-line"></span>
          <span className="divider-heart">♥</span>
          <span className="divider-line"></span>
        </motion.div>
        <motion.p className="hero-tagline" variants={fadeInUp}>
          Request the pleasure of your company at their wedding celebration
        </motion.p>
        <motion.div
          className="hero-date-box"
          variants={scaleIn}
        >
          <p className="date-label">Save the Date</p>
          <h2 className="date-main">April 25, 2026</h2>
          <p className="date-time">2:00 in the Afternoon</p>
          <p className="date-venue">Immaculate Conception Parish, Palauig, Zambales</p>
        </motion.div>
        <motion.div className="hero-ornament bottom-ornament" variants={fadeInUp}>
          ✦ ✦ ✦
        </motion.div>

      </motion.section>

      {/* Couple Section */}
      <motion.section
        className="couple-section"
        initial="hidden"
        style={{ position: 'relative', overflow: 'hidden' }}
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
      >
        {/* Raining petals */}
        <div className="petals">
          {[...Array(35)].map((_, i) => (
            <div
              key={i}
              className="petal-item"
              style={{
                left: `${(i * 2.9) % 100}%`,
                animationDelay: `${(i * 0.5) % 7}s`,
                animationDuration: `${4 + (i % 5) * 1.2}s`,
                fontSize: `${12 + (i % 6) * 3}px`,
                opacity: 0.35 + (i % 4) * 0.15,
              }}
            >
              {i % 3 === 0 ? '❀' : i % 3 === 1 ? '✿' : '❁'}
            </div>
          ))}
        </div>

        <motion.h2 className="section-title" variants={fadeInUp}>
          The Happy Couple
        </motion.h2>
        <motion.div className="section-divider" variants={fadeInUp}>
          <span className="divider-line"></span>
          <span className="divider-heart">♥</span>
          <span className="divider-line"></span>
        </motion.div>

        <motion.div className="couple-showcase" variants={scaleIn}>
          <div className="couple-image-wrapper">
            <video
              className="couple-image"
              src="/assets/images/couple-video.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="couple-image-glow" />
          </div>
        </motion.div>

        <div className="couple-names-row">
          <motion.div className="couple-name-card" variants={fadeInLeft}>
            <h3>Jay-ar</h3>
            <p className="couple-role">The Groom</p>
            <p className="couple-quote">
              &ldquo;My heart knew the moment I saw you that you were the one I&apos;d spend forever with.&rdquo;
            </p>
          </motion.div>

          <motion.div className="couple-heart-divider" variants={scaleIn}>
            <span>♥</span>
          </motion.div>

          <motion.div className="couple-name-card" variants={fadeInRight}>
            <h3>Katleen</h3>
            <p className="couple-role">The Bride</p>
            <p className="couple-quote">
              &ldquo;With you, every day feels like a beautiful dream I never want to wake up from.&rdquo;
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Photo Gallery */}
      <motion.section
        className="gallery-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
      >
        <motion.h2 className="section-title" variants={fadeInUp}>
          Our Love Story
        </motion.h2>
        <motion.div className="section-divider" variants={fadeInUp}>
          <span className="divider-line"></span>
          <span className="divider-heart">♥</span>
          <span className="divider-line"></span>
        </motion.div>

        <motion.div className="gallery-grid" variants={staggerFast}>
          {[
            { label: 'First Date', caption: 'Where it all began' },
            { label: 'The Proposal', caption: 'She said yes!' },
            { label: 'Pre-Nuptial', caption: 'Love in every frame' },
            { label: 'Together', caption: 'Our journey together' },
            { label: 'Adventure', caption: 'Exploring the world' },
            { label: 'Forever', caption: 'Just the beginning' },
          ].map((photo, index) => (
            <motion.div key={index} className="gallery-item" variants={scaleIn}>
              <div className="gallery-photo">
                <div className="gallery-placeholder">
                  <span>{photo.label}</span>
                </div>
              </div>
              <p className="gallery-caption">{photo.caption}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Entourage Section */}
      <motion.section
        className="entourage-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
      >
        <motion.h2 className="section-title" variants={fadeInUp}>
          The Entourage
        </motion.h2>
        <motion.div className="section-divider" variants={fadeInUp}>
          <span className="divider-line"></span>
          <span className="divider-heart">♥</span>
          <span className="divider-line"></span>
        </motion.div>

        <motion.div className="entourage-group" variants={fadeInUp}>
          <h3 className="entourage-role">Parents of the Couple</h3>
          <div className="entourage-names two-column">
            {entourage.principal.map((p, i) => (
              <div key={i} className="entourage-person">
                <p className="person-role">{p.role}</p>
                <p className="person-name">{p.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="entourage-group" variants={fadeInUp}>
          <h3 className="entourage-role">Principal Sponsors (Ninong & Ninang)</h3>
          <div className="entourage-names">
            {entourage.sponsors.map((name, i) => (
              <p key={i} className="person-name">{name}</p>
            ))}
          </div>
        </motion.div>

        <motion.div className="entourage-group side-by-side" variants={fadeInUp}>
          <div className="entourage-half">
            <h3 className="entourage-role">Best Man</h3>
            <p className="person-name">{entourage.bestMan}</p>
          </div>
          <div className="entourage-half">
            <h3 className="entourage-role">Maid of Honor</h3>
            <p className="person-name">{entourage.maidOfHonor}</p>
          </div>
        </motion.div>

        <motion.div className="entourage-group side-by-side" variants={fadeInUp}>
          <div className="entourage-half">
            <h3 className="entourage-role">Groomsmen</h3>
            {entourage.groomsmen.map((name, i) => (
              <p key={i} className="person-name">{name}</p>
            ))}
          </div>
          <div className="entourage-half">
            <h3 className="entourage-role">Bridesmaids</h3>
            {entourage.bridesmaids.map((name, i) => (
              <p key={i} className="person-name">{name}</p>
            ))}
          </div>
        </motion.div>

        <motion.div className="entourage-group" variants={fadeInUp}>
          <h3 className="entourage-role">Cord Sponsors</h3>
          <div className="entourage-names">
            {entourage.cordSponsors.map((name, i) => (
              <p key={i} className="person-name">{name}</p>
            ))}
          </div>
        </motion.div>

        <motion.div className="entourage-group" variants={fadeInUp}>
          <h3 className="entourage-role">Veil Sponsors</h3>
          <div className="entourage-names">
            {entourage.veilSponsors.map((name, i) => (
              <p key={i} className="person-name">{name}</p>
            ))}
          </div>
        </motion.div>

        <motion.div className="entourage-group" variants={fadeInUp}>
          <h3 className="entourage-role">Candle Sponsors</h3>
          <div className="entourage-names">
            {entourage.candleSponsors.map((name, i) => (
              <p key={i} className="person-name">{name}</p>
            ))}
          </div>
        </motion.div>

        <motion.div className="entourage-group" variants={fadeInUp}>
          <h3 className="entourage-role">Flower Girls</h3>
          <div className="entourage-names">
            {entourage.flowerGirls.map((name, i) => (
              <p key={i} className="person-name">{name}</p>
            ))}
          </div>
        </motion.div>

        <motion.div className="entourage-group side-by-side" variants={fadeInUp}>
          <div className="entourage-half">
            <h3 className="entourage-role">Ring Bearer</h3>
            <p className="person-name">{entourage.ringBearer}</p>
          </div>
          <div className="entourage-half">
            <h3 className="entourage-role">Bible Bearers</h3>
            {entourage.bibleBearers.map((name, i) => (
              <p key={i} className="person-name">{name}</p>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Dress Code Section */}
      <motion.section
        className="dresscode-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
      >
        <motion.h2 className="section-title" variants={fadeInUp}>
          Dress Code
        </motion.h2>
        <motion.div className="section-divider" variants={fadeInUp}>
          <span className="divider-line"></span>
          <span className="divider-heart">♥</span>
          <span className="divider-line"></span>
        </motion.div>

        <motion.p className="dresscode-note" variants={fadeInUp}>
          We kindly ask our guests to follow the dress code to make our celebration even more beautiful.
        </motion.p>

        <motion.div className="dresscode-grid" variants={stagger}>
          <motion.div className="dresscode-card" variants={fadeInLeft}>
            <div className="dresscode-illustration">
              <LadyIllustration />
            </div>
            <h3>Ladies</h3>
            <p>Long or cocktail dress</p>
            <div className="color-palette">
              <div className="color-swatch" style={{ background: '#B0E0E6' }} title="Powder Blue"></div>
              <div className="color-swatch" style={{ background: '#87CEEB' }} title="Sky Blue"></div>
              <div className="color-swatch" style={{ background: '#ADD8E6' }} title="Light Blue"></div>
              <div className="color-swatch" style={{ background: '#B4D6E3' }} title="Soft Sky Blue"></div>
            </div>
            <p className="color-labels">Powder Blue · Sky Blue · Light Blue · Soft Sky Blue</p>
          </motion.div>

          <motion.div className="dresscode-card" variants={fadeInRight}>
            <div className="dresscode-illustration">
              <GentlemanIllustration />
            </div>
            <h3>Gentlemen</h3>
            <p>Formal suit or barong</p>
            <div className="color-palette">
              <div className="color-swatch" style={{ background: '#B0E0E6' }} title="Powder Blue"></div>
              <div className="color-swatch" style={{ background: '#87CEEB' }} title="Sky Blue"></div>
              <div className="color-swatch" style={{ background: '#6CA6CD' }} title="Steel Blue"></div>
              <div className="color-swatch" style={{ background: '#ADD8E6' }} title="Light Blue"></div>
            </div>
            <p className="color-labels">Powder Blue · Sky Blue · Steel Blue · Light Blue</p>
          </motion.div>
        </motion.div>

        <motion.div className="dresscode-avoid-wrapper" variants={fadeInUp}>
          <p className="dresscode-avoid">
            Please avoid wearing <strong>white</strong>, <strong>black</strong>, or <strong>red</strong>.
          </p>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.section
        className="footer-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={stagger}
      >
        <motion.div className="footer-ornament" variants={fadeInUp}>✦</motion.div>
        <motion.h2 className="footer-names" variants={scaleIn}>Jay-ar & Katleen</motion.h2>
        <motion.p className="footer-date" variants={fadeInUp}>April 25, 2026</motion.p>
        <motion.p className="footer-message" variants={fadeInUp}>
          We can&apos;t wait to celebrate this special day with you!
        </motion.p>
        <motion.div className="footer-ornament" variants={fadeInUp}>
          ♥
        </motion.div>
        <motion.p className="footer-hashtag" variants={fadeInUp}>
          #JayarAndKatleenForever
        </motion.p>
      </motion.section>
    </div>
  )
}

export default HomePage
