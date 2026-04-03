'use client';

import { useState } from 'react';
import styles from './MembershipSection.module.css';

export default function MembershipSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    experience: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Başvurunuz alındı! En kısa sürede sizinle iletişime geçeceğiz.');
  };

  return (
    <section className={styles.membership} id="uyelik">
      {/* Background */}
      <div className={styles.bgPattern}></div>
      
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.label}>
            <span>Üyelik</span>
          </div>
          <h2 className={styles.title}>
            Ailemize <span className={styles.highlight}>Katılın</span>
          </h2>
          <p className={styles.subtitle}>
            SİHAMED üyesi olun, havacılık sektörünün en güçlü profesyonel ağına dahil olun
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.feeSidebar}>
            <div className={styles.feeCard}>
              <div className={styles.feeHeader}>
                <span className={styles.feeLabel}>Aylık Üyelik Aidatı</span>
                <div className={styles.feePrice}>
                  <span className={styles.feeCurrency}>₺</span>
                  <span className={styles.feeAmount}>250</span>
                  <span className={styles.feePeriod}>/ay</span>
                </div>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className={styles.formWrapper}>
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Üyelik Başvurusu</h3>
              <p className={styles.formDesc}>
                Formu doldurun, başvurunuzu değerlendirelim
              </p>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Ad Soyad *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Adınız ve soyadınız"
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">E-posta *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="ornek@email.com"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Telefon *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="0532 XXX XX XX"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="company">Çalıştığınız Kurum</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Şirket adı"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="position">Pozisyon</label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder="Göreviniz"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="experience">Deneyim Süresi</label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                  >
                    <option value="">Seçiniz</option>
                    <option value="0-2">0-2 Yıl</option>
                    <option value="2-5">2-5 Yıl</option>
                    <option value="5-10">5-10 Yıl</option>
                    <option value="10+">10+ Yıl</option>
                  </select>
                </div>

                <div className={styles.formCheckbox}>
                  <input type="checkbox" id="terms" required />
                  <label htmlFor="terms">
                    <a href="/kvkk">KVKK Aydınlatma Metni</a>'ni okudum ve kabul ediyorum
                  </label>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Başvuru Yap
                  <svg viewBox="0 0 20 20" fill="none">
                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
