'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './StatsSection.module.css';

function useCountUp(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted, startOnView]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return { count, ref };
}

export default function StatsSection() {
  const stats = [
    { value: 478, suffix: '+', label: 'Aktif Üye', icon: '👥' },
    { value: 5, suffix: '+', label: 'Yıllık Tecrübe', icon: null },
    { value: 98, suffix: '%', label: 'Memnuniyet Oranı', icon: '⭐' }
  ];

  return (
    <section className={styles.stats}>
      {/* Background */}
      <div className={styles.bgImage}></div>
      <div className={styles.bgOverlay}></div>
      
      {/* Decorative plane */}
      <div className={styles.planeDecor}>
        <svg viewBox="0 0 200 60" fill="none">
          <path d="M0 30H160M160 30L140 20M160 30L140 40M180 30C180 35.523 184.477 40 190 40C195.523 40 200 35.523 200 30C200 24.477 195.523 20 190 20C184.477 20 180 24.477 180 30Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Rakamlarla SİHAMED</h2>
          <p className={styles.subtitle}>
            Türkiye&apos;nin en büyük sivil havacılık makina teknik personel topluluğu
          </p>
        </div>

        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index }) {
  const { count, ref } = useCountUp(stat.value, 2000);

  return (
    <div 
      ref={ref}
      className={styles.statCard}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {stat.icon ? <div className={styles.statIcon}>{stat.icon}</div> : null}
      <div className={styles.statValue}>
        {count}
        <span className={styles.statSuffix}>{stat.suffix}</span>
      </div>
      <div className={styles.statLabel}>{stat.label}</div>
    </div>
  );
}
