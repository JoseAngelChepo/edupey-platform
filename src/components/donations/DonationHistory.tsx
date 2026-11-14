"use client"
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { donationApi, donationStatus } from '@/data/api/server/donations'
import { money } from '@/data/api/server/campaigns'
import styles from './donations.module.css'
export default function DonationHistory() {
  const [data,setData]=useState<Awaited<ReturnType<typeof donationApi.history>>|null>(null)
  const [error,setError]=useState(false)
  const load=useCallback(async()=>{setError(false);try{setData(await donationApi.history())}catch{setError(true)}},[])
  useEffect(()=>{void load()},[load])
  return <section id="aportaciones" className={styles.history}><div className={styles.historyTitle}><div><span className={styles.eyebrow}>TU HISTORIAL</span><h2>Mis aportaciones</h2></div>{data&&<p>Total confirmado <strong>{money(data.confirmedMinor)} MXN</strong></p>}</div>{error?<p role="alert">No pudimos consultar tus aportaciones. <button className={styles.secondary} onClick={()=>void load()}>Reintentar</button></p>:!data?<p role="status">Cargando aportaciones…</p>:!data.items.length?<p>Aún no tienes aportaciones. {data.paymentAvailable?'Elige una campaña para generar tu QR de CoDi.':'Los cobros con CoDi todavía no están habilitados.'}</p>:<ul>{data.items.map(d=><li key={d.id}><div><Link href={`/aportaciones/${d.id}`}>{d.campaignTitle} →</Link><span>{donationStatus[d.status]}</span></div><strong>{money(d.status==='confirmed'?d.confirmedMinor:d.amountMinor)} MXN</strong></li>)}</ul>}</section>
}
