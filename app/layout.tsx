import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ponza 2026 — Isole Pontine',
  description: 'Dashboard di viaggio per le Isole Pontine. Itinerario 19-21 giugno 2026 con Festa di San Silverio.',
  icons: [{ rel: 'icon', url: '/ponza/favicon.svg', type: 'image/svg+xml' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className="noise-bg" suppressHydrationWarning>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function removeAttribute() {
                  document.querySelectorAll('[bis_skin_checked]').forEach(el => el.removeAttribute('bis_skin_checked'));
                }
                removeAttribute();
                try {
                  const observer = new MutationObserver(removeAttribute);
                  observer.observe(document.documentElement, { 
                    attributes: true, 
                    subtree: true, 
                    attributeFilter: ['bis_skin_checked'] 
                  });
                } catch (e) {}
              })();
            `
          }}
        />
      </body>
    </html>
  )
}
