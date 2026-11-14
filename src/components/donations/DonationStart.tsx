"use client"
import Link from 'next/link'
import { useRef, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import type { Campaign } from '@/data/api/server/campaigns'
import { donationApi } from '@/data/api/server/donations'
import { useServices } from '@/data/providers/ServicesProvider'
import styles from './donations.module.css'
export default function DonationStart({campaign}:{campaign:Campaign}) {
  const {isLoggedIn,stateService}=useServices()
  const [amount,setAmount]=useState('100')
  const [busy,setBusy]=useState(false)
  const [error,setError]=useState('')
  const request=useRef<{amount:number;key:string}|null>(null)
  const router=useRouter()
  async function submit(event:FormEvent) {
    event.preventDefault();setError('')
    if(!/^\d+(\.\d{1,2})?$/.test(amount)){setError('Introduce un monto con un máximo de dos decimales.');return}
    const minor=Math.round(Number(amount)*100)
    if(!Number.isSafeInteger(minor)||minor<1||minor>100_000_000){setError('Elige un monto entre $0.01 y $1,000,000 MXN.');return}
    if(!request.current||request.current.amount!==minor) request.current={amount:minor,key:crypto.randomUUID()}
    setBusy(true)
    try {const d=await donationApi.create(campaign.id,minor,request.current.key);router.push(`/aportaciones/${d.id}`)}
    catch{setError('No pudimos preparar tu aportación. Reintenta con el mismo monto o revisa tu historial antes de generar otra.');setBusy(false)}
  }
  if(campaign.isDemo) return <div className={styles.notice}><strong>Campaña de demostración</strong><p>Este ejemplo no recibe dinero real. Puedes guardarlo para conocer el seguimiento.</p></div>
  if(campaign.status==='closed') return <p className={styles.notice}>La campaña ha finalizado y ya no genera nuevos cobros.</p>
  if(!campaign.paymentAvailable) return <div className={styles.notice}><strong>Donaciones con CoDi próximamente</strong><p>El cobro de esta campaña todavía no está habilitado.</p></div>
  if(!stateService) return <p role="status">Comprobando sesión…</p>
  if(!isLoggedIn) return <Link className={styles.primary} href={`/sign-in?redirect=${encodeURIComponent(`/campanas/${campaign.id}`)}`}>Entrar para aportar con CoDi →</Link>
  return <form className={styles.start} onSubmit={event=>void submit(event)}><label htmlFor="donation-amount">Tu aportación en pesos mexicanos</label><div className={styles.presets}>{[50,100,250,500].map(value=><button key={value} type="button" aria-pressed={amount===String(value)} disabled={busy} onClick={()=>setAmount(String(value))}>${value}</button>)}</div><div className={styles.amountInput}><span>$</span><input id="donation-amount" inputMode="decimal" type="number" min="0.01" max="1000000" step="0.01" required value={amount} disabled={busy} onChange={e=>setAmount(e.target.value)}/><span>MXN</span></div><button className={styles.primary} disabled={busy}>{busy?'Preparando tu QR…':'Generar QR de CoDi ↗'}</button><p className={styles.caption}>Es una donación a esta campaña. El QR no realiza un cargo automático; autorizas el pago desde tu banco.</p>{error&&<p role="alert" className={styles.error}>{error}</p>}</form>
}
