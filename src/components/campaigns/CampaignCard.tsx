import Link from 'next/link'
import type { Campaign } from '@/data/api/server/campaigns'
import { money, categoryNames } from '@/data/api/server/campaigns'
import styles from './campaigns.module.css'
export function CampaignArt({ category }: { category: Campaign['category'] }) {
  return <div className={`${styles.art} ${styles[category]}`} aria-hidden="true"><span className={styles.orbit}/><span className={styles.artSymbol}>{category === 'scholarship' ? '✦' : category === 'technology' ? '⌘' : '✎'}</span><span className={styles.artCaption}>{category === 'scholarship' ? 'EL TALENTO MERECE CRECER' : category === 'technology' ? 'IMAGINAR. CREAR. APRENDER.' : 'TODO EMPIEZA CON UNA IDEA'}</span></div>
}
export default function CampaignCard({ campaign: c }: { campaign: Campaign }) {
  return <article className={styles.card}>
    <Link href={`/campanas/${c.id}`} aria-label={`Ver campaña: ${c.title}`}><CampaignArt category={c.category}/></Link>
    <div className={styles.cardBody}><div className={styles.tags}><span>{categoryNames[c.category]}</span>{c.isDemo && <span className={styles.demo}>Demo</span>}{c.status === 'closed' && <span>Finalizada</span>}</div>
      <h3><Link href={`/campanas/${c.id}`}>{c.title}</Link></h3><p>{c.summary}</p>
      <div className={styles.progress} role="progressbar" aria-label="Recaudación" aria-valuenow={c.raisedMinor} aria-valuemin={0} aria-valuemax={c.goalMinor}><span style={{ width: `${Math.min(100, 100 * c.raisedMinor / c.goalMinor)}%` }}/></div>
      <div className={styles.amount}><strong>{money(c.raisedMinor)}</strong><span>de {money(c.goalMinor)} MXN</span></div>
      <div className={styles.cardFoot}><span>↗ {c.beneficiaryCount} oportunidades educativas</span><Link href={`/campanas/${c.id}`}>Conocer →</Link></div>
    </div>
  </article>
}
