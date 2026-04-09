'use client';

import { useState, useRef } from 'react';
import styles from './MembershipSection.module.css';

const MONTHS = [
  { v: '01', l: 'Ocak' },
  { v: '02', l: 'Şubat' },
  { v: '03', l: 'Mart' },
  { v: '04', l: 'Nisan' },
  { v: '05', l: 'Mayıs' },
  { v: '06', l: 'Haziran' },
  { v: '07', l: 'Temmuz' },
  { v: '08', l: 'Ağustos' },
  { v: '09', l: 'Eylül' },
  { v: '10', l: 'Ekim' },
  { v: '11', l: 'Kasım' },
  { v: '12', l: 'Aralık' }
];

const currentYear = new Date().getFullYear();
const BIRTH_YEARS = Array.from({ length: 100 }, (_, i) => currentYear - i);

export default function MembershipSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    unvan: '',
    tcKimlik: '',
    birthDay: '',
    birthMonth: '',
    birthYear: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });
  const termsRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTcChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 11);
    setFormData({ ...formData, tcKimlik: digits });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage({ type: '', text: '' });
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFormMessage({
          type: 'error',
          text:
            data.error ||
            'Gönderim başarısız oldu. Lütfen daha sonra tekrar deneyin.'
        });
        return;
      }
      setFormMessage({
        type: 'success',
        text: 'Başvurunuz alındı. En kısa sürede sizinle iletişime geçeceğiz.'
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        unvan: '',
        tcKimlik: '',
        birthDay: '',
        birthMonth: '',
        birthYear: ''
      });
      if (termsRef.current) termsRef.current.checked = false;
    } catch {
      setFormMessage({
        type: 'error',
        text: 'Bağlantı hatası. İnternetinizi kontrol edip tekrar deneyin.'
      });
    } finally {
      setIsSubmitting(false);
    }
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
                    <label htmlFor="unvan">Unvan *</label>
                    <input
                      type="text"
                      id="unvan"
                      name="unvan"
                      value={formData.unvan}
                      onChange={handleChange}
                      required
                      placeholder="Örn. Uçak Teknisyeni"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="tcKimlik">TC Kimlik Numarası *</label>
                    <input
                      type="text"
                      id="tcKimlik"
                      name="tcKimlik"
                      inputMode="numeric"
                      autoComplete="off"
                      value={formData.tcKimlik}
                      onChange={handleTcChange}
                      required
                      minLength={11}
                      maxLength={11}
                      pattern="[0-9]{11}"
                      title="11 haneli TC kimlik numarası"
                      placeholder="11 haneli numara"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <span className={styles.birthDateLabel} id="birthDateLabel">
                    Doğum Tarihi (Gün / Ay / Yıl) *
                  </span>
                  <div
                    className={styles.birthDateRow}
                    role="group"
                    aria-labelledby="birthDateLabel"
                  >
                    <select
                      id="birthDay"
                      name="birthDay"
                      value={formData.birthDay}
                      onChange={handleChange}
                      required
                      aria-label="Gün"
                    >
                      <option value="">Gün</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={String(d).padStart(2, '0')}>
                          {d}
                        </option>
                      ))}
                    </select>
                    <select
                      id="birthMonth"
                      name="birthMonth"
                      value={formData.birthMonth}
                      onChange={handleChange}
                      required
                      aria-label="Ay"
                    >
                      <option value="">Ay</option>
                      {MONTHS.map((m) => (
                        <option key={m.v} value={m.v}>
                          {m.l}
                        </option>
                      ))}
                    </select>
                    <select
                      id="birthYear"
                      name="birthYear"
                      value={formData.birthYear}
                      onChange={handleChange}
                      required
                      aria-label="Yıl"
                    >
                      <option value="">Yıl</option>
                      {BIRTH_YEARS.map((y) => (
                        <option key={y} value={String(y)}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.formCheckbox}>
                  <input ref={termsRef} type="checkbox" id="terms" required />
                  <label htmlFor="terms">
                    <a href="/kvkk">KVKK Aydınlatma Metni</a>'ni okudum ve kabul ediyorum
                  </label>
                </div>

                {formMessage.text ? (
                  <p
                    className={
                      formMessage.type === 'error'
                        ? styles.formMessageError
                        : styles.formMessageSuccess
                    }
                    role="alert"
                  >
                    {formMessage.text}
                  </p>
                ) : null}

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Başvuru Yap'}
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden>
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
