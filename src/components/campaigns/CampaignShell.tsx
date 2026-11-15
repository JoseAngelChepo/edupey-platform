"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useServices } from "@/data/providers/ServicesProvider"
import styles from "./campaigns.module.css"

export default function CampaignShell({
  children,
}: {
  children: React.ReactNode
}) {
  const path = usePathname()
  const router = useRouter()
  const { isLoggedIn, services } = useServices()
  const onHome = path === "/" || path.startsWith("/campanas")

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          edu<span>pey</span>
        </Link>
        <nav aria-label="Navegación principal">
          <Link href="/campanas" aria-current={onHome ? "page" : undefined}>
            Campañas
          </Link>
          <Link
            href="/dashboard"
            aria-current={path === "/dashboard" ? "page" : undefined}
          >
            Mi seguimiento
          </Link>
        </nav>
        {isLoggedIn ? (
          <button
            className={styles.quiet}
            onClick={async () => {
              await services.logout()
              router.push("/")
            }}
          >
            Cerrar sesión
          </button>
        ) : (
          <Link className={styles.primary} href="/sign-in">
            Entrar
          </Link>
        )}
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <strong>Financiamos el aprendizaje.</strong>
        <span>EduPey · Donaciones para la educación</span>
        <Link href="/proyecto">Conoce el proyecto</Link>
      </footer>
    </div>
  )
}
