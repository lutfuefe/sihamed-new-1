'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './SihamedVideoBanner.module.css';

const HERO_SOURCES_DESKTOP = [
  { src: '/videos/aviation-hero.mp4', type: 'video/mp4' },
  { src: '/videos/hero-logo-animated.mp4', type: 'video/mp4' },
  { src: '/videos/aviation-power-hero.mp4', type: 'video/mp4' },
];

const HERO_SOURCES_MOBILE = [
  { src: '/videos/hero-mobil.mp4', type: 'video/mp4' },
  { src: '/videos/hero-mobil-2.mp4', type: 'video/mp4' },
];

const MOBILE_MAX_PX = 768;

export default function SihamedVideoBanner() {
  const videoRef0 = useRef(null);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRefs = [videoRef0, videoRef1, videoRef2];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_PX}px)`);
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const sources = isMobile ? HERO_SOURCES_MOBILE : HERO_SOURCES_DESKTOP;

  useEffect(() => {
    setActiveIndex(0);
  }, [isMobile]);

  useEffect(() => {
    const v = videoRefs[activeIndex].current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [activeIndex, isMobile]);

  useEffect(() => {
    if (activeIndex !== 0) videoRef0.current?.pause();
    if (activeIndex !== 1) videoRef1.current?.pause();
    if (activeIndex !== 2) videoRef2.current?.pause();
  }, [activeIndex]);

  const handleVideoEnded = (index) => {
    videoRefs[index].current?.pause();
    setActiveIndex((index + 1) % sources.length);
  };

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.videoContainer}>
        <div className={styles.videoStack}>
          {sources.map((source, i) => (
            <div
              key={source.src}
              className={`${styles.videoMotion} ${
                activeIndex === i ? styles.videoLayerVisible : styles.videoLayerHidden
              }`}
            >
              <video
                ref={videoRefs[i]}
                className={styles.video}
                autoPlay={i === 0}
                muted
                playsInline
                preload="auto"
                onEnded={() => handleVideoEnded(i)}
              >
                <source src={source.src} type={source.type} />
              </video>
            </div>
          ))}
        </div>

        {/* Overlay layers */}
        <div className={styles.overlay}></div>
        <div className={styles.noiseOverlay}></div>
        
        {/* Decorative elements */}
        <div className={styles.gridLines}></div>

        {/* Content */}
        <div className={styles.content}>
          {/* Uçak ikonu ile badge */}
          <div className={styles.badge}>Türkiye'nin Havacılık Profesyonelleri</div>
          
          <h1 className={styles.title}>
            <span className={styles.titleLine}>SİHAMED</span>
            <span className={styles.titleLineOrg}>
              <span className={styles.titleHighlight}>Sivil Havacılık Mekaniği</span>
              <br />
              Teknik Elemanları Derneği
            </span>
          </h1>
          
          <p className={styles.subtitle}>
            Gökyüzünün güvenliği, teknik mükemmeliyetle başlar. 
            Havacılık mekaniği alanında Türkiye'nin en güçlü profesyonel ağı.
          </p>

          <div className={styles.buttons}>
            <a href="#uyelik" className={styles.btnPrimary}>
              <span>Üye Ol</span>
            </a>
            <a href="#hakkimizda" className={styles.btnSecondary}>
              <span>Keşfet</span>
            </a>
          </div>

          {/* Stats preview */}
          <div className={styles.statsPreview}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>465+</span>
              <span className={styles.statLabel}>Aktif Üye</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>5+</span>
              <span className={styles.statLabel}>Yıllık Tecrübe</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Eğitim Programı</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollMouse}>
            <div className={styles.scrollWheel}></div>
          </div>
          <span>Keşfetmek için kaydır</span>
        </div>

        {/* Side decoration */}
        <div className={styles.sideDecor}>
          <div className={styles.decorLine}></div>
          <span>EST. 2021</span>
          <div className={styles.decorLine}></div>
        </div>
      </div>
    </section>
  );
}
