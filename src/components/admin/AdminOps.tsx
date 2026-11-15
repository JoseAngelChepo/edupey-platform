"use client"
import { useCallback, useEffect, useState } from 'react'
import { adminApi, type AdminDonation, type AdminOverview } from '@/data/api/server/admin'
import { money } from '@/data/api/server/campaigns'
import { donationStatus } from '@/data/api/server/donations'
import styles from '../campaigns/campaigns.module.css'

export default function AdminOps() {
  const [overview, setOverview] = useState<AdminOverview | null>(null)
  const [items, setItems] = useState<AdminDonation[]>([])
  const [filter, setFilter] = useState<'review' | 'pending' | 'confirmed' | ''>('review')
  const [selected, setSelected] = useState<AdminDonation | null>(null)
  const [error, setError] = useState(false)
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    setError(false)
    try {
      const [o, list] = await Promise.all([
        adminApi.overview(),
        adminApi.donations({ status: filter || undefined, limit: 20 }),
      ])
      setOverview(o)
      setItems(list.items)
    } catch {
      setError(true)
    }
  }, [filter])

  useEffect(() => { void load() }, [load])

  async function openDetail(id: string) {
    setBusy(true)
    setError(false)
    try { setSelected(await adminApi.donation(id)) }
    catch { setError(true) }
    finally { setBusy(false) }
  }

  async function reconcile(id: string) {
    setBusy(true)
    setError(false)
    try {
      const detail = await adminApi.reconcile(id)
      setSelected(detail)
      await load()
    } catch { setError(true) }
    finally { setBusy(false) }
  }

  return (
    <section className={styles.admin} id="admin-ops">
      <span className={styles.eyebrow}>ADMINISTRACIÓN · OPERACIÓN</span>
      <h2>Aportaciones y recibos</h2>
      <p>Vista operativa para revisar pagos, casos en revisión y conciliar con Pey. No muestra CLABE ni datos bancarios del pagador.</p>

      {error && <p role="alert">No pudimos cargar el panel admin. <button className={styles.secondary} onClick={() => void load()}>Reintentar</button></p>}

      {overview && (
        <div className={styles.dashboardStats} style={{ margin: '20px 0' }}>
          <div><span>Recaudado confirmado</span><strong>{money(overview.campaigns.raisedMinor)}</strong><p>{overview.receipts.confirmed} recibos confirmados</p></div>
          <div><span>Requieren atención</span><strong>{overview.receipts.needingAttention}</strong><p>Recibos en revisión</p></div>
          <div><span>Pendientes / creando</span><strong>{overview.donations.pending + overview.donations.creating}</strong><p>Pey {overview.paymentAvailable ? 'habilitado' : 'sin configurar'}</p></div>
        </div>
      )}

      <div className={styles.filters} role="group" aria-label="Filtrar aportaciones">
        {([['review', 'En revisión'], ['pending', 'Pendientes'], ['confirmed', 'Confirmadas'], ['', 'Todas']] as const).map(([value, label]) => (
          <button key={label} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>
        ))}
      </div>

      {!items.length ? (
        <p>No hay aportaciones con este filtro.</p>
      ) : (
        <ul className={styles.budget}>
          {items.map((d) => (
            <li key={d.id}>
              <span>
                <button className={styles.quiet} type="button" onClick={() => void openDetail(d.id)}>{d.campaignTitle}</button>
                <br />
                <small>{donationStatus[d.status as keyof typeof donationStatus] ?? d.status} · {d.donor?.email ?? 'donante desconocido'}</small>
              </span>
              <strong>{money(d.status === 'confirmed' ? d.confirmedMinor : d.amountMinor)}</strong>
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div className={styles.notice} style={{ marginTop: 24 }}>
          <strong>Detalle operativo</strong>
          <p>ID {selected.id} · QR {selected.providerQrId ?? 'sin IDC'} · estado {donationStatus[selected.status as keyof typeof donationStatus] ?? selected.status}</p>
          <p>Donante: {selected.donor ? `${selected.donor.firstName} ${selected.donor.lastName} (${selected.donor.email})` : 'no encontrado'}</p>
          <p>Solicitado {money(selected.amountMinor)} · confirmado {money(selected.confirmedMinor)}</p>
          {selected.payments.length ? selected.payments.map((p) => (
            <p key={p.transactionId}>
              Recibo {p.transactionId}: {p.status} {money(p.amountMinor)}
              {p.reviewReason ? ` · ${p.reviewReason}` : ''}
              {p.webhookId ? ` · webhook ${p.webhookId}` : ''}
            </p>
          )) : <p>Sin recibos todavía.</p>}
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <button className={styles.secondary} type="button" disabled={busy} onClick={() => void reconcile(selected.id)}>Conciliar con Pey</button>
            <button className={styles.quiet} type="button" onClick={() => setSelected(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </section>
  )
}
