"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { donationApi, donationStatus, type Donation } from '@/data/api/server/donations'
import { money } from '@/data/api/server/campaigns'
import CampaignShell from '@/components/campaigns/CampaignShell'
import styles from './donations.module.css'
export default function DonationPayment({id}:{id:string}) {
  const [donation,setDonation]=useState<Donation|null>(null)
  const [error,setError]=useState('')
  const [busy,setBusy]=useState(false)
  const load=useCallback(async()=>{try {const d=await donationApi.detail(id);setDonation(d);setError('')}catch{setError('No pudimos consultar esta aportación. Comprueba tu conexión e intenta de nuevo.')}},[id])
  useEffect(()=>{void load()},[load])
  const status=donation?.status
  useEffect(()=>{
    if(status!=='pending'&&status!=='creating')return
    let active=true;let fetching=false
    const timer=setInterval(async()=>{if(fetching)return;fetching=true;try{const d=await donationApi.detail(id);if(active){setDonation(d);setError('')}}catch{if(active)setError('No pudimos actualizar el estado. Conserva tu comprobante y verifica de nuevo.')}finally{fetching=false}},6000)
    return()=>{active=false;clearInterval(timer)}
  },[id,status])
  async function reconcile(){setBusy(true);setError('');try{setDonation(await donationApi.reconcile(id))}catch{setError('No pudimos verificar el pago con Pey en este momento. Tu aportación seguirá pendiente hasta recibir confirmación.')}finally{setBusy(false)}}
  const d=donation
  return <CampaignShell><div className={styles.payment}><Link href={d?`/campanas/${d.campaignId}`:'/dashboard'}>← Volver {d?'a la campaña':'al dashboard'}</Link><span className={styles.eyebrow}>TU APORTACIÓN · CODI</span><h1>{d?.status==='confirmed'?'Gracias por abrir una oportunidad.':'Un paso más para sumar.'}</h1>{!d?<><p role="status">{error||'Consultando tu aportación…'}</p>{error&&<button className={styles.secondary} onClick={()=>void load()}>Reintentar</button>}</>:<><h2>{d.campaignTitle}</h2><div className={styles.paymentCard}><div className={styles.summary}><span>Aportación solicitada</span><strong>{money(d.amountMinor)} <small>MXN</small></strong><p role="status" className={styles.status}>{donationStatus[d.status]}</p></div>
    {d.status==='pending'&&d.qrImage&&<><Image className={styles.qr} src={d.qrImage} alt={`QR CoDi para donar ${money(d.amountMinor)} MXN a ${d.campaignTitle}`} width={300} height={300} unoptimized priority/><p>Escanea el QR con la opción CoDi de tu banco. También puedes guardar la imagen e importarla si tu aplicación bancaria lo permite.</p><a className={styles.secondary} href={d.qrImage} download={`edupey-${d.id}.png`}>Guardar imagen del QR ↓</a><p className={styles.caption}>Revisa el monto y el receptor en tu banco antes de autorizar.</p><p className={styles.caption}>Vence el {new Date(d.expiresAt).toLocaleString('es-MX',{timeZone:'America/Mexico_City'})} (Ciudad de México).</p></>}
    {d.status==='creating'&&<p>Estamos preparando tu QR. Esta página comprobará su estado automáticamente.</p>}
    {d.status==='confirmed'&&<div className={styles.success}><strong>Confirmado por Pey</strong><p>Recibimos {money(d.confirmedMinor)} MXN para esta campaña. El pago ya forma parte de su recaudación.</p>{d.payments.map(p=><p className={styles.caption} key={p.transactionId}>Referencia: {p.transactionId}<br/>{new Date(p.paidAt).toLocaleString('es-MX',{timeZone:'America/Mexico_City'})}</p>)}<Link href="/dashboard">Ver mis aportaciones →</Link></div>}
    {d.status==='expired'&&<p>Este QR venció. Si ya pagaste, verifica el pago antes de crear una nueva aportación. Los pagos confirmados con retraso también se registran.</p>}
    {d.status==='review'&&<p>Esta aportación necesita revisión. No generes otro cobro todavía. Puedes comprobar si Pey ya confirmó tu pago y consultar esta referencia con el equipo: {d.id}.</p>}
    {d.status==='failed'&&<p>No se pudo completar esta solicitud. Revisa tu historial antes de volver a intentarlo.</p>}
    {d.status!=='confirmed'&&<button className={styles.primary} disabled={busy} onClick={()=>void reconcile()}>{busy?'Consultando a Pey…':'Ya pagué · verificar pago'}</button>}
    <p className={styles.caption}>La confirmación depende del pago recibido, no de pulsar el botón. Puedes volver a esta aportación desde tu dashboard.</p>{error&&<p className={styles.error} role="alert">{error}</p>}</div></>}
  </div></CampaignShell>
}
