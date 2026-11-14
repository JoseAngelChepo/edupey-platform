"use client"
import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { campaignApi } from '@/data/api/server/campaigns'
import styles from './campaigns.module.css'
export default function CampaignForm() {
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [createdId, setCreatedId] = useState('')
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; const data = new FormData(form)
    const get = (key: string) => String(data.get(key) ?? '').trim()
    const amountMinor = Math.round(Number(get('goal')) * 100)
    if (!Number.isSafeInteger(amountMinor) || amountMinor < 100) { setMessage('Revisa el monto de la meta.'); return }
    setBusy(true); setMessage(''); setCreatedId('')
    try {
      const campaign = await campaignApi.create({ title:get('title'), summary:get('summary'), description:get('description'), category:get('category') as 'materials'|'scholarship'|'technology', goalMinor:amountMinor, beneficiaryCount:Number(get('beneficiaryCount')), learningGoal:get('learningGoal'), selectionCriteria:get('selectionCriteria'), insufficientFundsPolicy:get('insufficientFundsPolicy'), surplusPolicy:get('surplusPolicy'), deadline:new Date(`${get('deadline')}T23:59:59-06:00`).toISOString(), budget:[{label:get('budgetLabel'), amountMinor}] })
      setCreatedId(campaign.id); setMessage('Campaña publicada.'); form.reset()
    } catch { setMessage('No se pudo publicar. Revisa los campos, la fecha y tus permisos.') } finally { setBusy(false) }
  }
  return <section className={styles.admin}><span className={styles.eyebrow}>ADMINISTRACIÓN</span><h2>Publicar una oportunidad</h2><p>La información será pública. Usa datos del programa y cantidades; evita nombres o datos personales de los niños.</p><form className={styles.form} onSubmit={event => void submit(event)}>
    <label>Título<input name="title" required minLength={5} maxLength={100}/></label><label>Categoría<select name="category"><option value="materials">Útiles y materiales</option><option value="scholarship">Becas y talento</option><option value="technology">Tecnología educativa</option></select></label>
    <label>Resumen<textarea name="summary" required minLength={15} maxLength={240}/></label><label>Descripción<textarea name="description" required minLength={30} maxLength={5000}/></label>
    <label>Meta en pesos mexicanos<input name="goal" type="number" min="1" max="1000000" step="0.01" required/></label><label>Participantes previstos<input name="beneficiaryCount" type="number" min="1" max="10000" required/></label><label>Fecha límite (hora de Ciudad de México)<input name="deadline" type="date" required/></label><label>Destino del presupuesto<input name="budgetLabel" minLength={2} maxLength={100} required placeholder="Ej. Inscripciones a taller de matemáticas"/></label>
    {[['learningGoal','Meta de aprendizaje'],['selectionCriteria','Criterios de selección'],['insufficientFundsPolicy','Qué ocurrirá si no se alcanza la meta'],['surplusPolicy','Qué ocurrirá si se supera la meta']].map(([name,label]) => <label key={name}>{label}<textarea name={name} required minLength={10} maxLength={name === 'learningGoal' ? 500 : 1000}/></label>)}
    <div><button className={styles.primary} disabled={busy}>{busy ? 'Publicando…' : 'Publicar campaña'}</button><p role="status">{message} {createdId && <Link href={`/campanas/${createdId}`}>Ver campaña →</Link>}</p></div>
  </form></section>
}
