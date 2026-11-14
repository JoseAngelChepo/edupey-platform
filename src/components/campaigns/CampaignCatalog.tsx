"use client"
import { useCallback, useEffect, useState } from 'react'
import { campaignApi, categoryNames, type Campaign } from '@/data/api/server/campaigns'
import CampaignShell from './CampaignShell'
import CampaignCard from './CampaignCard'
import styles from './campaigns.module.css'
export default function CampaignCatalog() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const load = useCallback(async () => { setLoading(true); setError(false); try { setCampaigns(await campaignApi.list()) } catch { setError(true) } finally { setLoading(false) } }, [])
  useEffect(() => { void load() }, [load])
  const visible = campaigns.filter(c => (category === 'all' || c.category === category) && `${c.title} ${c.summary}`.toLocaleLowerCase('es').includes(query.toLocaleLowerCase('es')))
  return <CampaignShell>
    <section className={styles.hero}><div><span className={styles.eyebrow}>JUNTOS ABRIMOS CAMINO</span><h1>Su próxima oportunidad<br/>empieza <em>contigo.</em></h1><p>Impulsa el aprendizaje, descubre talento y acompaña cada paso. Una comunidad que cree en lo que los niños pueden llegar a ser.</p><a className={styles.primary} href="#campanas">Encuentra una causa ↗</a></div><div className={styles.heroNote}><span>01 / APRENDER PARA CRECER</span><div className={styles.stepsArt} aria-hidden="true"><i/><i/><i/><b>✦</b></div><h2>El talento está.<br/>La oportunidad la<br/>construimos juntos.</h2><p>Metas claras, avances visibles y beneficios con validación humana.</p></div></section>
    <div className={styles.trust}><span>↗ Metas educativas concretas</span><span>✓ Revisión humana de beneficios</span><span>◉ Seguimiento transparente</span></div>
    <section id="campanas" className={styles.section}><div className={styles.sectionTitle}><div><span className={styles.eyebrow}>ELIGE DÓNDE SUMAR</span><h2>Oportunidades que merecen crecer</h2></div><label className={styles.search}>Buscar campañas<input value={query} onChange={e => setQuery(e.target.value)} placeholder="Matemáticas, útiles, talento…"/></label></div>
      <div className={styles.filters} role="group" aria-label="Filtrar campañas">{Object.entries({ all: 'Todas las causas', ...categoryNames }).map(([value, label]) => <button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{label}</button>)}</div>
      {loading ? <p role="status">Cargando campañas…</p> : error ? <div className={styles.empty} role="alert"><h3>No pudimos cargar las campañas</h3><p>Comprueba tu conexión y vuelve a intentarlo.</p><button className={styles.primary} onClick={() => void load()}>Reintentar</button></div> : visible.length ? <div className={styles.grid}>{visible.map(c => <CampaignCard key={c.id} campaign={c}/>)}</div> : <div className={styles.empty}><h3>{campaigns.length ? 'No encontramos coincidencias' : 'Las primeras oportunidades están por llegar'}</h3><p>{campaigns.length ? 'Prueba otra categoría o búsqueda.' : 'Aquí aparecerán las campañas publicadas por el equipo educativo.'}</p></div>}
    </section>
    <aside className={styles.notice}><strong>Estamos construyendo el primer capítulo.</strong><span>Los cobros todavía no están habilitados. Las campañas marcadas como demo son ejemplos y no representan beneficiarios ni donaciones reales.</span></aside>
  </CampaignShell>
}
