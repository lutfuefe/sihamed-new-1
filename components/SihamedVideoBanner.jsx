'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './SihamedVideoBanner.module.css';

/** Masaüstü: 4 klip (4. sırada logo animasyonu), sonra döngü */
const HERO_SOURCES_DESKTOP = [
  { src: '/videos/aviation-hero.mp4', type: 'video/mp4' },
  { src: '/videos/aviation-power-hero.mp4', type: 'video/mp4' },
  { src: '/videos/video-4.mp4', type: 'video/mp4' },
  { src: '/videos/hero-logo-animated.mp4', type: 'video/mp4' },
];

const HERO_SOURCES_MOBILE = [
  { src: '/videos/hero-mobil.mp4', type: 'video/mp4' },
  { src: '/videos/hero-mobil-2.mp4', type: 'video/mp4' },
  { src: '/videos/video-mobil.mp4', type: 'video/mp4' },
];

/** 768px ve üzeri = masaüstü. 767px ve altı = mobil. */
const MOBILE_MAX_PX = 767;

function getIsMobileViewport() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(`(max-width: ${MOBILE_MAX_PX}px)`).matches;
}

export default function SihamedVideoBanner() {
  const videoRef0 = useRef(null);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const videoRefs = [videoRef0, videoRef1, videoRef2, videoRef3];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(getIsMobileViewport);
  const isMobileRef = useRef(isMobile);
  isMobileRef.current = isMobile;

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
    v.muted = true;
    v.volume = 0;
    v.play().catch(() => {});
  }, [activeIndex, isMobile]);

  useEffect(() => {
    videoRefs.forEach((ref, i) => {
      if (i !== activeIndex) ref.current?.pause();
    });
  }, [activeIndex]);

  const handleEnded = (index) => {
    videoRefs[index].current?.pause();
    const len = isMobileRef.current
      ? HERO_SOURCES_MOBILE.length
      : HERO_SOURCES_DESKTOP.length;
    setActiveIndex((index + 1) % len);
  };

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.videoContainer}>
        <div className={styles.videoStack}>
          {sources.map((source, i) => (
            <div
              key={`${i}-${source.src}`}
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
                onEnded={() => handleEnded(i)}
                onError={() => handleEnded(i)}
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

          <div className={styles.statsPreview}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>478+</span>
              <span className={styles.statLabel}>Aktif Üye</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>5+</span>
              <span className={styles.statLabel}>Yıllık Tecrübe</span>
            </div>
          </div>
        </div>

        <div className={styles.scrollIndicator}>
          <div className={styles.scrollMouse}>
            <div className={styles.scrollWheel}></div>
          </div>
          <span>Keşfetmek için kaydır</span>
        </div>

        <div className={styles.sideDecor}>
          <div className={styles.decorLine}></div>
          <span>EST. 2021</span>
          <div className={styles.decorLine}></div>
        </div>
      </div>
    </section>
  );
}
