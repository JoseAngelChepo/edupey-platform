"use client"

import { useCallback, useEffect, useState } from "react"
import { campaignApi, type Campaign } from "@/data/api/server/campaigns"
import { PEY_PAYMENT_QR_URL } from "@/config/pey"
import CampaignShell from "./CampaignShell"
import CampaignQrCarousel from "./CampaignQrCarousel"
import styles from "./campaigns.module.css"

export default function CampaignCatalog() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const list = await campaignApi.list()
      setCampaigns(list)
      setActiveIndex(0)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const active = campaigns[activeIndex]

  return (
    <CampaignShell>
      <section className={styles.homeHero} aria-labelledby="home-hero-title">
        <div className={styles.homeCopy}>
          <p className={styles.homeBrand}>
            edu<span>pey</span>
          </p>
          <h1 id="home-hero-title">Financiamos el aprendizaje</h1>
          <p>
            Donaciones colectivas para metas educativas concretas. Escanea el QR
            de una campaña lista para recibir apoyo.
          </p>
          {active ? (
            <a
              className={styles.primary}
              href={PEY_PAYMENT_QR_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Aportar con CoDi
            </a>
          ) : (
            !loading &&
            !error && (
              <span className={styles.caption}>
                Pronto aparecerán las primeras campañas.
              </span>
            )
          )}
        </div>

        <div className={styles.homeAside}>
          {loading ? (
            <p role="status">Cargando campañas…</p>
          ) : error ? (
            <div className={styles.empty} role="alert">
              <h3>No pudimos cargar las campañas</h3>
              <p>Comprueba tu conexión y vuelve a intentarlo.</p>
              <button className={styles.primary} onClick={() => void load()}>
                Reintentar
              </button>
            </div>
          ) : (
            <CampaignQrCarousel
              campaigns={campaigns}
              activeIndex={activeIndex}
              onChange={setActiveIndex}
            />
          )}
        </div>
      </section>

      {campaigns.some((c) => c.isDemo) && (
        <p className={styles.homeNotice}>
          Las campañas marcadas como demo son ejemplos. No representan
          beneficiarios reales ni reciben dinero.
        </p>
      )}
    </CampaignShell>
  )
}
