import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sabbia flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-7xl font-display font-bold gradient-text mb-4">404</div>
        <p className="text-mare-600 mb-8 text-lg">Questa pagina non esiste sull&apos;isola</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-ponza-500 text-white rounded-xl hover:bg-ponza-600 transition-colors font-medium"
        >
          Torna alla dashboard
        </Link>
      </div>
    </div>
  )
}
