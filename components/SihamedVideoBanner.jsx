'use client';

import { useEffect, useRef } from 'react';
import styles from './SihamedVideoBanner.module.css';

export default function SihamedVideoBanner() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Autoplay blocked:', err);
      });
    }
  }, []);

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/aviation-hero.mp4" type="video/mp4" />
          <source src="/videos/aviation-hero.webm" type="video/webm" />
        </video>

        {/* Overlay layers */}
        <div className={styles.overlay}></div>
        <div className={styles.noiseOverlay}></div>
        
        {/* Decorative elements */}
        <div className={styles.gridLines}></div>

        {/* Çapraz uçan uçak animasyonu */}
        <div className={styles.flyingPlane}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
          </svg>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Uçak ikonu ile badge */}
          <div className={styles.badge}>
            <svg className={styles.planeIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
            </svg>
            Türkiye'nin Havacılık Profesyonelleri
          </div>
          
          <h1 className={styles.title}>
            <span className={styles.titleLine}>SİHAMED</span>
            <span className={styles.titleLine}>
              <span className={styles.titleHighlight}>Sivil Havacılık</span> Derneği
            </span>
          </h1>
          
          <p className={styles.subtitle}>
            Gökyüzünün güvenliği, teknik mükemmeliyetle başlar. 
            Havacılık mekaniği alanında Türkiye'nin en güçlü profesyonel ağı.
          </p>

          <div className={styles.buttons}>
            <a href="#uyelik" className={styles.btnPrimary}>
              <svg className={styles.btnPlaneIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
              <span>Üye Ol</span>
            </a>
            <a href="#hakkimizda" className={styles.btnSecondary}>
              <span>Keşfet</span>
            </a>
          </div>

          {/* Stats preview */}
          <div className={styles.statsPreview}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>2500+</span>
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
