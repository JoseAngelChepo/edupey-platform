"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { campaignApi, categoryNames, money, type Campaign } from '@/data/api/server/campaigns'
import { useServices } from '@/data/providers/ServicesProvider'
import CampaignShell from './CampaignShell'
import DonationStart from '@/components/donations/DonationStart'
import { CampaignArt } from './CampaignCard'
import styles from './campaigns.module.css'
export default function CampaignDetail({ id }: { id: string }) {
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [error, setError] = useState('')
  const [following, setFollowing] = useState<boolean | null>(null)
  const [busy, setBusy] = useState(false)
  const [actionError, setActionError] = useState('')
  const { isLoggedIn, stateService } = useServices()
  useEffect(() => { let active = true; campaignApi.detail(id).then(c => { if (active) setCampaign(c) }).catch(() => { if (active) setError('La campaña no está disponible o no pudimos conectarnos.') }); return () => { active = false } }, [id])
  useEffect(() => { let active = true; if (isLoggedIn) campaignApi.following().then(items => { if (active) setFollowing(items.some(c => c.id === id)) }).catch(() => { if (active) setActionError('No pudimos comprobar tu seguimiento. Recarga para intentarlo de nuevo.') }); return () => { active = false } }, [id, isLoggedIn])
  async function toggle() { setBusy(true); setActionError(''); try { if (following) await campaignApi.unfollow(id); else await campaignApi.follow(id); setFollowing(!following) } catch { setActionError('No pudimos actualizar el seguimiento. Intenta de nuevo.') } finally { setBusy(false) } }
  const c = campaign
  return <CampaignShell><Link className={styles.back} href="/campanas">← Todas las campañas</Link>
    {error ? <div className={styles.empty} role="alert"><h1>Campaña no disponible</h1><p>{error}</p></div> : !c ? <p role="status">Cargando oportunidad…</p> : <>
    <div className={styles.detailHeader}><div className={styles.tags}><span>{categoryNames[c.category]}</span>{c.isDemo && <span className={styles.demo}>Campaña demo · datos ficticios</span>}</div><h1>{c.title}</h1><p>{c.summary}</p></div>
    <div className={styles.detailGrid}><div><CampaignArt category={c.category}/><section className={styles.prose}><span className={styles.eyebrow}>UNA META CON PROPÓSITO</span><h2>Lo que podemos hacer posible</h2><p>{c.description}</p><div className={styles.goal}><strong>Meta de aprendizaje</strong><p>{c.learningGoal}</p></div><h2>¿A quién llegará el apoyo?</h2><p>{c.beneficiaryCount} participantes previstos. Protegemos sus identidades y compartimos únicamente información educativa autorizada.</p><h3>Criterios de selección</h3><p>{c.selectionCriteria}</p><h2>Cada peso tiene un destino</h2><ul className={styles.budget}>{c.budget.map((b, i) => <li key={i}><span>{b.label}</span><strong>{money(b.amountMinor)}</strong></li>)}<li><strong>Meta total</strong><strong>{money(c.goalMinor)} MXN</strong></li></ul><h3>Si no se alcanza la meta</h3><p>{c.insufficientFundsPolicy}</p><h3>Si se supera la meta</h3><p>{c.surplusPolicy}</p><div className={styles.notice}><strong>El aprendizaje se comprueba.</strong><span>La entrega de beneficios requiere una revisión humana. Las becas se pagan directamente a la institución y los cupones se restringen a recursos educativos.</span></div></section></div>
    <aside className={styles.support}><span className={styles.eyebrow}>CONSTRUYAMOS LA OPORTUNIDAD</span><h2>{money(c.raisedMinor)} <small>MXN</small></h2><p>recaudados de {money(c.goalMinor)} MXN</p><div className={styles.progress} role="progressbar" aria-label="Recaudación" aria-valuenow={c.raisedMinor} aria-valuemin={0} aria-valuemax={c.goalMinor}><span style={{width: `${Math.min(100, 100*c.raisedMinor/c.goalMinor)}%`}}/></div><dl><div><dt>Participantes previstos</dt><dd>{c.beneficiaryCount}</dd></div><div><dt>Fecha límite</dt><dd>{new Date(c.deadline).toLocaleDateString('es-MX', {timeZone:'America/Mexico_City'})}</dd></div><div><dt>Estado</dt><dd>{c.status === 'open' ? 'Abierta' : 'Finalizada'}</dd></div></dl><DonationStart campaign={c}/><p className={styles.caption}>Seguir una campaña no genera ningún cargo.</p>
    {!stateService ? <p role="status">Comprobando sesión…</p> : isLoggedIn ? <button className={styles.secondary} disabled={busy || following === null} onClick={() => void toggle()}>{busy ? 'Guardando…' : following ? '✓ Siguiendo · dejar de seguir' : 'Seguir esta oportunidad ♡'}</button> : <Link className={styles.secondary} href={`/sign-in?redirect=${encodeURIComponent(`/campanas/${id}`)}`}>Entra para seguir esta campaña</Link>}{actionError && <p role="alert">{actionError}</p>}<p className={styles.caption} role="status">{following ? 'Guardada en tu dashboard. Puedes volver cuando quieras.' : ''}</p></aside></div></>}
  </CampaignShell>
}
