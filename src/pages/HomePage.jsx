import { useEffect, useRef, useState, useCallback } from 'react'
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

const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = targetDate - new Date()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = targetDate - new Date()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(timer)
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return timeLeft
}

const WEDDING_DATE = new Date('2026-04-25T14:00:00')

const galleryItems = [
  { label: 'First New Year', caption: 'First New Year Together', image: '/assets/images/firstNewYear.png' },
  { label: 'The Proposal', caption: 'She said yes!', image: '/assets/images/ItsAYes.png' },
  { label: 'Our Moment', caption: 'Our Moment', type: 'video', src: '/assets/images/IMG_0668.mov' },
  { label: 'Together', caption: 'Our journey together', image: '/assets/images/together.jpg' },
  { label: 'Adventure', caption: 'Exploring the world', image: '/assets/images/Adventure.jpg' },
  { label: 'Beach Time', caption: 'Sun, sand & love', image: '/assets/images/beachtime.jpeg' },
  { label: 'Ligawan Stage', caption: 'A beautiful stage of love', image: '/assets/images/Ligawan Stage.jpg' },

  { label: 'Forever', caption: 'Just the beginning', image: '/assets/images/atTheBigening.jpg' },
]

const GalleryCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef(null)
  const autoPlayRef = useRef(null)
  const videoPlayingRef = useRef(false)
  const itemCount = galleryItems.length
  // Duplicate items 3x for seamless looping
  const repeatedItems = [...galleryItems, ...galleryItems, ...galleryItems]
  const offsetIndex = itemCount // start from the middle set

  const scrollToIndex = useCallback((index) => {
    if (!trackRef.current) return
    const track = trackRef.current
    const items = track.querySelectorAll('.gallery-carousel-item')
    const targetItem = items[index + offsetIndex]
    if (!targetItem) return
    const trackRect = track.parentElement.getBoundingClientRect()
    const itemRect = targetItem.getBoundingClientRect()
    const scrollLeft = track.parentElement.scrollLeft + itemRect.left - trackRect.left - (trackRect.width / 2) + (itemRect.width / 2)
    track.parentElement.scrollTo({ left: scrollLeft, behavior: 'smooth' })
  }, [offsetIndex])

  const advanceToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % itemCount)
  }, [itemCount])

  // Auto-advance (skip interval when video is playing)
  useEffect(() => {
    const currentItem = galleryItems[activeIndex]
    if (currentItem.type === 'video') {
      videoPlayingRef.current = true
      clearInterval(autoPlayRef.current)
      return
    }
    videoPlayingRef.current = false
    autoPlayRef.current = setInterval(() => {
      advanceToNext()
    }, 3000)
    return () => clearInterval(autoPlayRef.current)
  }, [activeIndex, itemCount, advanceToNext])

  // Scroll to active item when it changes
  useEffect(() => {
    scrollToIndex(activeIndex)
  }, [activeIndex, scrollToIndex])

  // Center the carousel on mount
  useEffect(() => {
    if (!trackRef.current) return
    const wrapper = trackRef.current.parentElement
    const items = trackRef.current.querySelectorAll('.gallery-carousel-item')
    const targetItem = items[offsetIndex]
    if (!targetItem) return
    const wrapperRect = wrapper.getBoundingClientRect()
    const itemRect = targetItem.getBoundingClientRect()
    wrapper.scrollLeft = wrapper.scrollLeft + itemRect.left - wrapperRect.left - (wrapperRect.width / 2) + (itemRect.width / 2)
  }, [offsetIndex])

  const handleItemClick = (realIndex) => {
    setActiveIndex(realIndex)
  }

  const activeItem = galleryItems[activeIndex]

  return (
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

      {/* Carousel Strip */}
      <div className="gallery-carousel-wrapper">
        <div className="gallery-carousel-track" ref={trackRef}>
          {repeatedItems.map((item, index) => {
            const realIndex = index % itemCount
            return (
              <div
                key={index}
                className={`gallery-carousel-item ${realIndex === activeIndex ? 'active' : ''}`}
                onClick={() => handleItemClick(realIndex)}
              >
                <div className="gallery-photo">
                  {item.type === 'video' ? (
                    <video
                      className="gallery-image"
                      src={item.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : item.image ? (
                    <img src={item.image} alt={item.label} className="gallery-image" loading="lazy" />
                  ) : (
                    <div className="gallery-placeholder">
                      <span>{item.label}</span>
                    </div>
                  )}
                </div>
                <p className="gallery-caption">{item.caption}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Large Preview */}
      <div className="gallery-preview">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="gallery-preview-content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {activeItem.type === 'video' ? (
              <video
                className="gallery-preview-media"
                src={activeItem.src}
                autoPlay
                muted
                playsInline
                onEnded={() => {
                  videoPlayingRef.current = false
                  advanceToNext()
                }}
              />
            ) : activeItem.image ? (
              <img src={activeItem.image} alt={activeItem.label} className="gallery-preview-media" loading="lazy" />
            ) : (
              <div className="gallery-preview-placeholder">
                <span>{activeItem.label}</span>
              </div>
            )}
            <p className="gallery-preview-caption">{activeItem.caption}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

const HomePage = () => {
  const audioRef = useRef(null)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const countdown = useCountdown(WEDDING_DATE)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setShowScrollTop(scrolled > docHeight * 0.7)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
        audio.preload = 'auto'
        audioRef.current = audio
        audio.addEventListener('canplaythrough', () => {
          audio.currentTime = 5
          audio.play().then(() => {
            setIsMusicPlaying(true)
          }).catch(() => { })
        }, { once: true })
        audio.load()
        return
      }
      if (audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsMusicPlaying(true)
        }).catch(() => { })
      }
    }

    // Auto-play immediately
    playMusic()

    // Fallback: retry on first user interaction (browsers may block autoplay)
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
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
      window.removeEventListener('scroll', handleInteraction)
    }
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isMusicPlaying) {
      audioRef.current.pause()
      setIsMusicPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        setIsMusicPlaying(true)
      }).catch(() => { })
    }
  }

  const entourage = {
    principalSponsors: [
      { ninong: 'Hon. Vice Mayor Billy Aceron', ninang: 'Mrs. Magdalena Maranoc' },
      { ninong: 'Hon. SB. Bernard Aceron', ninang: 'Mrs. Nida Caancan' },
      { ninong: 'Hon. SB. Franklin Nancin', ninang: 'Mrs. Vilma Arangorin' },
      { ninong: 'Hon. SB. Eric Alba', ninang: 'Mrs. Rose Marie Arangorin' },
      { ninong: 'Former BM Ricardo Yabut', ninang: 'Mrs. Floremia Yabut' },
      { ninong: 'Former SB Atty. Christopher Laurence Monato', ninang: 'Mrs. Irene Globio' },
      { ninong: 'Hon. ABC Brgy. Capt. Lloyd Ambuyoc', ninang: 'Mrs. Editha Ambuyoc' },
      { ninong: 'Hon. Brgy. Capt. Antonio Asis', ninang: 'Hon. Brgy. Kgwd Paz Ambuyoc' },
      { ninong: 'Hon. Brgy. Capt. Joy Escobal', ninang: 'Mrs. Anna Marie Dalit' },
      { ninong: 'Hon. Brgy. Kgwd Jimuel Fronda', ninang: 'Mrs. Anita Sevilla' },
      { ninong: 'Mr. Rudy Mercurio', ninang: 'Hon. Brgy. Capt. Lyn Mercurio' },
      { ninong: 'Engr. Richard Abdon', ninang: 'Mrs. Emilie Segismundo' },
      { ninong: 'Dist. Supv. Richard Doctolero', ninang: 'Mrs. Ruby Doctolero' },
      { ninong: 'Mr. Alex Revelar', ninang: 'Mrs. Mariz Revelar' },
      { ninong: 'Mr. Sarly Aninzo', ninang: 'Mrs. Mary Jane Maranoc' },
      { ninong: 'Mr. Isagani Ginez', ninang: 'Mrs. Cristina Surop' },
      { ninong: 'Mr. Jeffrey Ginez', ninang: 'Mrs. Sheryl Arangorin' },
      { ninong: 'Mr. Enrique Quinto', ninang: 'Mrs. Carina Maranoc' },
      { ninong: 'Mr. Edgar Araboy', ninang: 'Mrs. Arlene Quijano' },
      { ninong: 'Mr. Mario Anoche', ninang: 'Mrs. Glorife Arconado' },
      { ninong: 'Mr. David Amistad', ninang: 'Mrs. Chonchita Ordonia' },
      { ninong: 'Mr. Val Obviasca', ninang: 'Mrs. Feliciana De Leon' },
      { ninong: 'Mr. Jerrel Aragon', ninang: 'Mrs. Christy Umayam' },
      { ninong: 'Mr. Neil Asis', ninang: 'Mrs. Elsa Ambuyoc' },
      { ninong: 'Mr. Rolando Tuazon', ninang: 'Mrs. Levi Forones' },
      { ninong: 'Mr. Carlo Arangorin', ninang: 'Mrs. Dina Arangorin' },
      { ninong: 'Mr. Ernie Quijano', ninang: 'Mrs. Marilyn Altares' },
      { ninong: 'Mr. Maynard Altares', ninang: 'Mrs. Vilma Custodio' },
      { ninong: 'Mr. Silvino Moreno III', ninang: 'Mrs. Nina Moreno' },
      { ninong: 'Mr. Nestor Aguas', ninang: 'Mrs. Maria Doromal' },
      { ninong: 'Mr. Leo Portin', ninang: 'Mrs. Marieta Portin' },
      { ninong: 'Mr. Celso Navarro', ninang: 'Mrs. Nancy Navarro' },
      { ninong: 'Mr. Obet Globio', ninang: 'Mrs. Jeaneth Globio' },
      { ninong: 'Mr. Luis Labuton', ninang: 'Mrs. Elsa Labuton' },
      { ninong: 'Mr. Larry Miranda', ninang: 'Mrs. Mila Miranda' },
      { ninong: 'Mr. Pablito Edora', ninang: 'Mrs. Maria Elisa Edora' },
      { ninong: 'Mr. Nestor Aledo', ninang: 'Mrs. Brendalie Aledo' },
      { ninong: 'Mr. Delfin Abaga', ninang: 'Mrs. Analyn Abaga' },
      { ninong: 'Mr. Roy Manalo', ninang: 'Mrs. Jeanette Manalo' },
      { ninong: 'Mr. John Arangorin', ninang: 'Mrs. Rosali Arangorin' },
      { ninong: 'Mr. Ramoncito Pecson', ninang: 'Mrs. Olivia Pecson' },
      { ninong: 'Mr. Jerry Angeles', ninang: 'Mrs. Heidi Louise Monato' },
      { ninong: 'Hon. Brgy. Kgwd Felipe Manzano', ninang: 'Mrs. Michelle Erandio' },
      { ninong: 'Mr. Marlon Edquibal', ninang: 'Mrs. Rita Edquibal' }
    ],
    sponsorCouples: [],
    parents: {
      groom: [
        { role: "Groom's Father", name: 'Fred Abaga' },
        { role: "Groom's Mother", name: 'Elsie Maranoc' },
      ],
      bride: [
        { role: "Bride's Father", name: 'Rony Olea' },
        { role: "Bride's Mother", name: 'Glenda Olea' },
      ],
    },
    bestMan: 'Romnick Globio',
    maidOfHonor: 'Dianne Ritz Gines',
    groomsmen: ['Gerone Ginez', 'Aldrin Maranoc', 'Fermar Victoria', 'Justine Navarro', 'Laurence Maranoc', 'Roldan Ambuyoc', 'Thomas Arvin Custodio', 'Denis Aguas'],
    bridesmaids: ['April Banaag', 'Jessica Ginez', 'Christine May Abaga', 'Glenda Kempis', 'Kimberly Guanzon', 'Baybee Jeanne Oben', 'Camille Labuton', 'Laura Alexandra Gaspardis'],
    ringBearer: 'Nicolo Globio',
    coinBearer: 'Gian Frey Arangorin',
    bibleBearer: 'Owen Anoche',
    flowerGirls: ['Gelexza Yuliriegn Ginez', 'Dea Marcela', 'Amira Arangorin'],
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
        {/* Background video */}
        <div className="hero-bg-carousel">
          <video
            className="hero-bg-video"
            src="/assets/images/vecteezy_slow-motion-of-a-woman-standing-alone-at-the-beach_2383783.mp4"
            autoPlay
            loop
            muted
            playsInline
            ref={(el) => { if (el) el.playbackRate = 0.5 }}
          />
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
        <motion.div className="countdown-container" variants={fadeInUp}>
          <div className="countdown-grid">
            {[
              { value: countdown.days, label: 'Days' },
              { value: countdown.hours, label: 'Hours' },
              { value: countdown.minutes, label: 'Minutes' },
              { value: countdown.seconds, label: 'Seconds' },
            ].map((item) => (
              <div className="countdown-item" key={item.label}>
                <span className="countdown-value">{String(item.value).padStart(2, '0')}</span>
                <span className="countdown-label">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div className="hero-ornament bottom-ornament" variants={fadeInUp}>
          ✦ ✦ ✦
        </motion.div>

        <motion.div
          className="hero-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="scroll-text">Scroll Down</span>
          <span className="scroll-arrow">▾</span>
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
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="petal-item"
              style={{
                left: `${(i * 6.7) % 100}%`,
                animationDelay: `${(i * 1.2) % 10}s`,
                animationDuration: `${5 + (i % 5) * 1.5}s`,
                fontSize: `${12 + (i % 6) * 3}px`,
                opacity: 0.15 + (i % 4) * 0.08,
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
          <div className="couple-frame">
            {/* Top-right floral corner */}
            <svg className="floral-corner floral-top-right" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Rose petal shape */}
                <path id="petal" d="M0,-12 C5,-10 10,-5 10,2 C10,8 5,12 0,12 C-5,12 -10,8 -10,2 C-10,-5 -5,-10 0,-12Z" />
                {/* Leaf shape */}
                <path id="leaf" d="M0,0 C5,-3 20,-8 35,0 C20,8 5,3 0,0Z" />
              </defs>

              {/* Eucalyptus branches */}
              <g opacity="0.7">
                <path d="M120,95 Q95,70 80,30" fill="none" stroke="#8AAE7F" strokeWidth="1.5" />
                <use href="#leaf" x="95" y="55" fill="#8FBC8F" transform="rotate(-50 95 55) scale(0.7)" />
                <use href="#leaf" x="105" y="75" fill="#9DC09D" transform="rotate(-30 105 75) scale(0.6)" />
                <use href="#leaf" x="87" y="38" fill="#8FBC8F" transform="rotate(-65 87 38) scale(0.55)" />

                <path d="M180,130 Q200,100 210,60" fill="none" stroke="#8AAE7F" strokeWidth="1.5" />
                <use href="#leaf" x="195" y="85" fill="#9DC09D" transform="rotate(20 195 85) scale(0.65)" />
                <use href="#leaf" x="205" y="70" fill="#8FBC8F" transform="rotate(35 205 70) scale(0.5)" />

                <path d="M140,110 Q120,130 90,120" fill="none" stroke="#8AAE7F" strokeWidth="1.2" />
                <use href="#leaf" x="115" y="120" fill="#9DC09D" transform="rotate(-170 115 120) scale(0.5)" />
              </g>

              {/* Large blue rose - top right */}
              <g transform="translate(165, 55)">
                <use href="#petal" fill="#4A90C4" transform="rotate(0) scale(2.8)" />
                <use href="#petal" fill="#5A9FD4" transform="rotate(45) scale(2.6)" />
                <use href="#petal" fill="#5A9FD4" transform="rotate(90) scale(2.5)" />
                <use href="#petal" fill="#6BAFE0" transform="rotate(135) scale(2.3)" />
                <use href="#petal" fill="#6BAFE0" transform="rotate(180) scale(2.2)" />
                <use href="#petal" fill="#7DBDE8" transform="rotate(225) scale(2.0)" />
                <use href="#petal" fill="#7DBDE8" transform="rotate(270) scale(1.8)" />
                <use href="#petal" fill="#95CDF0" transform="rotate(315) scale(1.6)" />
                <use href="#petal" fill="#95CDF0" transform="rotate(20) scale(1.3)" />
                <use href="#petal" fill="#B0DCF5" transform="rotate(70) scale(1.0)" />
                <use href="#petal" fill="#C8E8FA" transform="rotate(140) scale(0.7)" />
                <circle cx="0" cy="0" r="4" fill="#D4EFFF" />
              </g>

              {/* Medium rose */}
              <g transform="translate(120, 40)">
                <use href="#petal" fill="#6CA6CD" transform="rotate(15) scale(1.8)" />
                <use href="#petal" fill="#7DB8D8" transform="rotate(65) scale(1.7)" />
                <use href="#petal" fill="#7DB8D8" transform="rotate(115) scale(1.6)" />
                <use href="#petal" fill="#8EC8E5" transform="rotate(165) scale(1.4)" />
                <use href="#petal" fill="#8EC8E5" transform="rotate(215) scale(1.3)" />
                <use href="#petal" fill="#A0D6EF" transform="rotate(265) scale(1.1)" />
                <use href="#petal" fill="#B4E0F5" transform="rotate(315) scale(0.9)" />
                <use href="#petal" fill="#C8EAFC" transform="rotate(30) scale(0.6)" />
                <circle cx="0" cy="0" r="3" fill="#D4EFFF" />
              </g>

              {/* Small rose bud */}
              <g transform="translate(200, 100)">
                <use href="#petal" fill="#87CEEB" transform="rotate(10) scale(1.4)" />
                <use href="#petal" fill="#99D6EF" transform="rotate(80) scale(1.2)" />
                <use href="#petal" fill="#99D6EF" transform="rotate(150) scale(1.1)" />
                <use href="#petal" fill="#ADD8E6" transform="rotate(220) scale(0.9)" />
                <use href="#petal" fill="#C0E4F0" transform="rotate(290) scale(0.7)" />
                <circle cx="0" cy="0" r="2.5" fill="#D4EFFF" />
              </g>

              {/* Tiny bud */}
              <g transform="translate(145, 95)">
                <use href="#petal" fill="#ADD8E6" transform="rotate(30) scale(0.9)" />
                <use href="#petal" fill="#B8E0F0" transform="rotate(120) scale(0.8)" />
                <use href="#petal" fill="#C8EAFC" transform="rotate(210) scale(0.6)" />
              </g>

              {/* Gold geometric lines */}
              <line x1="100" y1="8" x2="240" y2="8" stroke="#C9A96E" strokeWidth="0.7" opacity="0.35" />
              <line x1="242" y1="8" x2="242" y2="140" stroke="#C9A96E" strokeWidth="0.7" opacity="0.35" />
              <line x1="105" y1="14" x2="236" y2="14" stroke="#C9A96E" strokeWidth="0.5" opacity="0.2" />
              <line x1="236" y1="14" x2="236" y2="135" stroke="#C9A96E" strokeWidth="0.5" opacity="0.2" />
            </svg>

            {/* Bottom-left floral corner */}
            <svg className="floral-corner floral-bottom-left" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <path id="petal2" d="M0,-12 C5,-10 10,-5 10,2 C10,8 5,12 0,12 C-5,12 -10,8 -10,2 C-10,-5 -5,-10 0,-12Z" />
                <path id="leaf2" d="M0,0 C5,-3 20,-8 35,0 C20,8 5,3 0,0Z" />
              </defs>

              {/* Eucalyptus branches */}
              <g opacity="0.7">
                <path d="M130,155 Q155,180 170,220" fill="none" stroke="#8AAE7F" strokeWidth="1.5" />
                <use href="#leaf2" x="155" y="195" fill="#8FBC8F" transform="rotate(130 155 195) scale(0.7)" />
                <use href="#leaf2" x="145" y="175" fill="#9DC09D" transform="rotate(150 145 175) scale(0.6)" />
                <use href="#leaf2" x="163" y="212" fill="#8FBC8F" transform="rotate(115 163 212) scale(0.55)" />

                <path d="M70,120 Q50,150 40,190" fill="none" stroke="#8AAE7F" strokeWidth="1.5" />
                <use href="#leaf2" x="55" y="165" fill="#9DC09D" transform="rotate(-160 55 165) scale(0.65)" />
                <use href="#leaf2" x="45" y="180" fill="#8FBC8F" transform="rotate(-145 45 180) scale(0.5)" />

                <path d="M110,140 Q130,120 160,130" fill="none" stroke="#8AAE7F" strokeWidth="1.2" />
                <use href="#leaf2" x="135" y="130" fill="#9DC09D" transform="rotate(10 135 130) scale(0.5)" />
              </g>

              {/* Large blue rose */}
              <g transform="translate(85, 195)">
                <use href="#petal2" fill="#4A90C4" transform="rotate(0) scale(2.8)" />
                <use href="#petal2" fill="#5A9FD4" transform="rotate(45) scale(2.6)" />
                <use href="#petal2" fill="#5A9FD4" transform="rotate(90) scale(2.5)" />
                <use href="#petal2" fill="#6BAFE0" transform="rotate(135) scale(2.3)" />
                <use href="#petal2" fill="#6BAFE0" transform="rotate(180) scale(2.2)" />
                <use href="#petal2" fill="#7DBDE8" transform="rotate(225) scale(2.0)" />
                <use href="#petal2" fill="#7DBDE8" transform="rotate(270) scale(1.8)" />
                <use href="#petal2" fill="#95CDF0" transform="rotate(315) scale(1.6)" />
                <use href="#petal2" fill="#95CDF0" transform="rotate(20) scale(1.3)" />
                <use href="#petal2" fill="#B0DCF5" transform="rotate(70) scale(1.0)" />
                <use href="#petal2" fill="#C8E8FA" transform="rotate(140) scale(0.7)" />
                <circle cx="0" cy="0" r="4" fill="#D4EFFF" />
              </g>

              {/* Medium rose */}
              <g transform="translate(130, 210)">
                <use href="#petal2" fill="#6CA6CD" transform="rotate(15) scale(1.8)" />
                <use href="#petal2" fill="#7DB8D8" transform="rotate(65) scale(1.7)" />
                <use href="#petal2" fill="#7DB8D8" transform="rotate(115) scale(1.6)" />
                <use href="#petal2" fill="#8EC8E5" transform="rotate(165) scale(1.4)" />
                <use href="#petal2" fill="#8EC8E5" transform="rotate(215) scale(1.3)" />
                <use href="#petal2" fill="#A0D6EF" transform="rotate(265) scale(1.1)" />
                <use href="#petal2" fill="#B4E0F5" transform="rotate(315) scale(0.9)" />
                <use href="#petal2" fill="#C8EAFC" transform="rotate(30) scale(0.6)" />
                <circle cx="0" cy="0" r="3" fill="#D4EFFF" />
              </g>

              {/* Small rose bud */}
              <g transform="translate(50, 150)">
                <use href="#petal2" fill="#87CEEB" transform="rotate(10) scale(1.4)" />
                <use href="#petal2" fill="#99D6EF" transform="rotate(80) scale(1.2)" />
                <use href="#petal2" fill="#99D6EF" transform="rotate(150) scale(1.1)" />
                <use href="#petal2" fill="#ADD8E6" transform="rotate(220) scale(0.9)" />
                <use href="#petal2" fill="#C0E4F0" transform="rotate(290) scale(0.7)" />
                <circle cx="0" cy="0" r="2.5" fill="#D4EFFF" />
              </g>

              {/* Tiny bud */}
              <g transform="translate(105, 155)">
                <use href="#petal2" fill="#ADD8E6" transform="rotate(30) scale(0.9)" />
                <use href="#petal2" fill="#B8E0F0" transform="rotate(120) scale(0.8)" />
                <use href="#petal2" fill="#C8EAFC" transform="rotate(210) scale(0.6)" />
              </g>

              {/* Gold geometric lines */}
              <line x1="150" y1="242" x2="8" y2="242" stroke="#C9A96E" strokeWidth="0.7" opacity="0.35" />
              <line x1="8" y1="242" x2="8" y2="110" stroke="#C9A96E" strokeWidth="0.7" opacity="0.35" />
              <line x1="145" y1="236" x2="14" y2="236" stroke="#C9A96E" strokeWidth="0.5" opacity="0.2" />
              <line x1="14" y1="236" x2="14" y2="115" stroke="#C9A96E" strokeWidth="0.5" opacity="0.2" />
            </svg>

            <div className="couple-image-wrapper">
              <video
                className="couple-image"
                src="/assets/images/couple-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="none"
              />
              <div className="couple-image-glow" />
            </div>
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

      {/* Our Love Story Carousel */}
      <GalleryCarousel />

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

        {/* Parents */}
        <motion.div className="entourage-group side-by-side" variants={fadeInUp}>
          <div className="entourage-half">
            <h3 className="entourage-role">Groom&apos;s Parents</h3>
            {entourage.parents.groom.map((p, i) => (
              <p key={i} className="person-name">{p.name}</p>
            ))}
          </div>
          <div className="entourage-half">
            <h3 className="entourage-role">Bride&apos;s Parents</h3>
            {entourage.parents.bride.map((p, i) => (
              <p key={i} className="person-name">{p.name}</p>
            ))}
          </div>
        </motion.div>

        {/* Principal Sponsors */}
        <motion.div className="entourage-group" variants={fadeInUp}>
          <h3 className="entourage-role">Principal Sponsors</h3>
          <div className="sponsors-table">
            <div className="sponsors-header">
              <span>Ninong</span>
              <span>#</span>
              <span>Ninang</span>
            </div>
            {entourage.principalSponsors.map((pair, i) => (
              <div key={i} className="sponsors-row">
                <span className="person-name">{pair.ninong || ''}</span>
                <span className="sponsor-number">{i + 1}</span>
                <span className="person-name">{pair.ninang || ''}</span>
              </div>
            ))}
          </div>
          <div className="sponsor-couples">
            {entourage.sponsorCouples.map((name, i) => (
              <p key={i} className="person-name">{name}</p>
            ))}
          </div>
        </motion.div>

        {/* Best Man & Maid of Honor */}
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

        {/* Groomsmen & Bridesmaids */}
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

        {/* Bearers & Flower Girls */}
        <motion.div className="entourage-group" variants={fadeInUp}>
          <div style={{ marginBottom: '32px' }}>
            <h3 className="entourage-role">Ring Bearer</h3>
            <p className="person-name">{entourage.ringBearer}</p>
          </div>
          <div style={{ marginBottom: '32px' }}>
            <h3 className="entourage-role">Coin Bearer</h3>
            <p className="person-name">{entourage.coinBearer}</p>
          </div>
          <div style={{ marginBottom: '32px' }}>
            <h3 className="entourage-role">Bible Bearer</h3>
            <p className="person-name">{entourage.bibleBearer}</p>
          </div>
          <div>
            <h3 className="entourage-role">Flower Girls</h3>
            {entourage.flowerGirls.map((name, i) => (
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
              <div className="color-swatch" style={{ background: '#000000' }} title="Black"></div>
              <div className="color-swatch" style={{ background: '#000080' }} title="Navy Blue"></div>
              <div className="color-swatch" style={{ background: '#FFFFFF' }} title="White"></div>
            </div>
            <p className="color-labels">Black · Navy Blue · White</p>
          </motion.div>
        </motion.div>

        <motion.div className="dresscode-avoid-wrapper" variants={fadeInUp}>

        </motion.div>
      </motion.section>

      {/* Reception Location */}
      <motion.section
        className="reception-section"
        style={{ padding: '80px 20px', background: '#fff', textAlign: 'center', position: 'relative' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
      >
        <motion.h2 className="section-title" variants={fadeInUp}>
          Reception Location
        </motion.h2>
        <motion.div className="section-divider" variants={fadeInUp}>
          <span className="divider-line"></span>
          <span className="divider-heart">♥</span>
          <span className="divider-line"></span>
        </motion.div>

        <motion.div
          className="map-wrapper"
          variants={fadeInUp}
          style={{ maxWidth: '800px', margin: '0 auto', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 16px 40px rgba(13, 59, 102, 0.12)', position: 'relative' }}
        >
          {/* Invisible overlay link that captures all clicks on the map */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=15.452598,119.920680"
            target="_blank"
            rel="noopener noreferrer"
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10, cursor: 'pointer' }}
            aria-label="Open in Google Maps app or browser"
            title="Click to open in Google Maps"
          ></a>
          <iframe
            title="Reception Map"
            src="https://maps.google.com/maps?q=15.452598,119.920680&hl=en&z=15&output=embed"
            width="100%"
            height="400"
            style={{ border: 0, display: 'block' }}
            allowFullScreen={false}
            loading="lazy"
          ></iframe>
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
          #Jr&amp;KatSayIdo
        </motion.p>
      </motion.section>

      {/* Scroll to top FAB */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-top-fab"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
          >
            ▲
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HomePage
