import type { Metadata } from "next"
import { Providers } from "@/app/providers"
import { appFont } from "@/config/fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "EduPey · Oportunidades que crecen",
    template: "%s · EduPey",
  },
  description: "Crowdfunding por la educación. Acompaña campañas que impulsan aprendizaje, talento y oportunidades para niños.",
  icons: { icon: "/icon.svg" },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={appFont.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
