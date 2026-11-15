"use client"
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { campaignApi, type Campaign } from '@/data/api/server/campaigns'
import { useServices } from '@/data/providers/ServicesProvider'
import CampaignShell from './CampaignShell'
import CampaignCard from './CampaignCard'
import CampaignForm from './CampaignForm'
import DonationHistory from '@/components/donations/DonationHistory'
import AdminOps from '@/components/admin/AdminOps'
import styles from './campaigns.module.css'
export default function CampaignDashboard() {
  const { user, role } = useServices()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const load = useCallback(async () => { setLoading(true); setError(false); try { setCampaigns(await campaignApi.following()) } catch { setError(true) } finally { setLoading(false) } }, [])
  useEffect(() => { void load() }, [load])
  return <CampaignShell><section className={styles.dashboardHero}><span className={styles.eyebrow}>MI SEGUIMIENTO</span><h1>Hola, {typeof user?.firstName === 'string' ? user.firstName : 'qué gusto verte'}.<br/><em>Sigamos abriendo camino.</em></h1><p>Aquí viven las oportunidades que quieres acompañar.</p></section>
    <div className={styles.dashboardStats}><div><span>Campañas que sigues</span><strong>{loading || error ? '—' : campaigns.length}</strong></div><div><span>Tus aportaciones</span><strong><a href="#aportaciones">Ver historial ↗</a></strong><p>Consulta tus pagos y solicitudes pendientes.</p></div><div><span>Niños apadrinados</span><strong>El siguiente paso</strong><p>Se mostrarán al implementar asignaciones y permisos.</p></div></div>
    <section className={styles.section}><div className={styles.sectionTitle}><h2>Tu lista de oportunidades</h2><Link href="/campanas">Explorar más campañas ↗</Link></div>{loading ? <p role="status">Cargando tu seguimiento…</p> : error ? <div className={styles.empty} role="alert"><p>No pudimos cargar tu seguimiento.</p><button className={styles.primary} onClick={() => void load()}>Reintentar</button></div> : campaigns.length ? <div className={styles.grid}>{campaigns.map(c => <CampaignCard key={c.id} campaign={c}/>)}</div> : <div className={styles.empty}><span className={styles.emptyIcon}>♡</span><h2>Tu primera causa te está esperando</h2><p>Explora las campañas y guarda las que te gustaría acompañar. Seguirlas es gratis.</p><Link className={styles.primary} href="/campanas">Encontrar una oportunidad ↗</Link></div>}</section>
    <DonationHistory/>
    {role === 'admin' && <><AdminOps/><CampaignForm/></>}
    <details className={styles.legacy}><summary>Herramientas de la plantilla</summary><p>Conservamos la base original mientras incorporamos las funciones de EduPey.</p><Link href="/dashboard/template">Abrir dashboard de la plantilla →</Link></details>
  </CampaignShell>
}
