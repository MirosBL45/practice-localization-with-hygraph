import '@/styles/globals.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  return (
    <div>
      <ul>
        {router.locales.map((locale) => (
          <li key={locale}>
            <Link href={router.asPath} locale={locale}>
              {locale}
            </Link>
          </li>
        ))}
      </ul>
      <p>ovaj ostaje uvek</p>
      <Link href={'/'}>Back Home</Link>
      <Component {...pageProps} />
    </div>
  )
}
