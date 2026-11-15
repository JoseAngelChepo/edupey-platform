"use client"

import Link from "next/link"
import Image from "next/image"
import { PEY_PAYMENT_QR_IMAGE, PEY_PAYMENT_QR_URL } from "@/config/pey"
import {
  categoryNames,
  money,
  type Campaign,
} from "@/data/api/server/campaigns"
import styles from "./campaignQrCarousel.module.css"

type Props = {
  campaigns: Campaign[]
  activeIndex: number
  onChange: (index: number) => void
}

export default function CampaignQrCarousel({
  campaigns,
  activeIndex,
  onChange,
}: Props) {
  const campaign = campaigns[activeIndex]

  if (!campaign) {
    return (
      <div className={styles.carousel}>
        <div className={styles.frame}>
          <p className={styles.placeholder}>Aún no hay campañas publicadas.</p>
        </div>
      </div>
    )
  }

  const progress = Math.min(
    100,
    campaign.goalMinor > 0
      ? (100 * campaign.raisedMinor) / campaign.goalMinor
      : 0,
  )
  const canPrev = activeIndex > 0
  const canNext = activeIndex < campaigns.length - 1

  return (
    <div className={styles.carousel}>
      <a
        className={styles.frame}
        href={PEY_PAYMENT_QR_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir pago CoDi de ${campaign.title} en Pey`}
      >
        <Image
          className={styles.qr}
          src={PEY_PAYMENT_QR_IMAGE}
          alt={`QR CoDi Pey para aportar a ${campaign.title}`}
          width={320}
          height={320}
          priority
        />
      </a>

      {campaigns.length > 1 && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.nav}
            aria-label="Campaña anterior"
            disabled={!canPrev}
            onClick={() => onChange(activeIndex - 1)}
          >
            ‹
          </button>
          <div className={styles.dots} role="tablist" aria-label="Campañas">
            {campaigns.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={styles.dot}
                role="tab"
                aria-label={`Campaña ${index + 1}: ${item.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => onChange(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.nav}
            aria-label="Campaña siguiente"
            disabled={!canNext}
            onClick={() => onChange(activeIndex + 1)}
          >
            ›
          </button>
        </div>
      )}

      <div className={styles.meta}>
        <div className={styles.tags}>
          <span className={styles.tag}>{categoryNames[campaign.category]}</span>
          {campaign.isDemo && <span className={`${styles.tag} ${styles.demo}`}>Demo</span>}
          {campaign.status === "closed" && (
            <span className={styles.tag}>Finalizada</span>
          )}
        </div>
        <h2 className={styles.title}>{campaign.title}</h2>
        <p className={styles.amount}>
          <strong>{money(campaign.raisedMinor)}</strong>
          {" de "}
          {money(campaign.goalMinor)} MXN
        </p>
        <div
          className={styles.progress}
          role="progressbar"
          aria-label="Recaudación"
          aria-valuenow={campaign.raisedMinor}
          aria-valuemin={0}
          aria-valuemax={campaign.goalMinor}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className={styles.stats}>
          <span>{campaign.beneficiaryCount} participantes previstos</span>
          <span>
            {new Date(campaign.deadline).toLocaleDateString("es-MX", {
              timeZone: "America/Mexico_City",
            })}
          </span>
        </p>
        <a
          className={styles.cta}
          href={PEY_PAYMENT_QR_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Aportar con CoDi
        </a>
        <Link className={styles.detailLink} href={`/campanas/${campaign.id}`}>
          Ver detalle de la campaña
        </Link>
      </div>
    </div>
  )
}
